"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, RotateCcw, Users } from "lucide-react";

type Color = "w" | "b";
type Kind = "p" | "r" | "n" | "b" | "q" | "k";
type Piece = { color: Color; kind: Kind } | null;
type Board = Piece[];
type Mode = "computer" | "friend" | "online";
type OnlineRole = "host" | "guest" | null;
type Difficulty = "easy" | "medium" | "hard";
type Rights = { wk:boolean; wq:boolean; bk:boolean; bq:boolean };
type Move = {
  from: number;
  to: number;
  promotion?: Kind;
  castle?: "k" | "q";
  enPassant?: boolean;
};

type HistoryEntry = {
  number: number;
  color: Color;
  notation: string;
};


type OnlineSnapshot = {
  board: Board;
  turn: Color;
  enPassant: number | null;
  rights: Rights;
  lastMove: Move | null;
  history: HistoryEntry[];
};

const ONLINE_PREFIX = "arun-chess-global-v1";

function makeRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function loadMqtt() {
  return new Promise<any>((resolve, reject) => {
    const existing = (window as any).mqtt;
    if (existing?.connect) {
      resolve(existing);
      return;
    }

    const previous = document.getElementById("arun-chess-mqtt");
    if (previous) {
      const timer = window.setInterval(() => {
        const mqtt = (window as any).mqtt;
        if (mqtt?.connect) {
          window.clearInterval(timer);
          resolve(mqtt);
        }
      }, 100);
      window.setTimeout(() => {
        window.clearInterval(timer);
        if (!(window as any).mqtt?.connect) reject(new Error("MQTT library did not load."));
      }, 10000);
      return;
    }

    const script = document.createElement("script");
    script.id = "arun-chess-mqtt";
    script.src = "https://cdn.jsdelivr.net/npm/mqtt@5.10.4/dist/mqtt.min.js";
    script.async = true;
    script.onload = () => resolve((window as any).mqtt);
    script.onerror = () => reject(new Error("Unable to load multiplayer network library."));
    document.head.appendChild(script);
  });
}

const glyphs: Record<Color, Record<Kind, string>> = {
  w: { k:"♔", q:"♕", r:"♖", b:"♗", n:"♘", p:"♙" },
  b: { k:"♚", q:"♛", r:"♜", b:"♝", n:"♞", p:"♟" },
};

const values: Record<Kind, number> = { p:100, n:320, b:330, r:500, q:900, k:20000 };

function startBoard(): Board {
  const back: Kind[] = ["r","n","b","q","k","b","n","r"];
  const board: Board = Array(64).fill(null);
  back.forEach((kind, file) => {
    board[file] = { color:"b", kind };
    board[8 + file] = { color:"b", kind:"p" };
    board[48 + file] = { color:"w", kind:"p" };
    board[56 + file] = { color:"w", kind };
  });
  return board;
}

function rc(i:number) { return { r:Math.floor(i/8), c:i%8 }; }
function idx(r:number,c:number) { return r*8+c; }
function inside(r:number,c:number) { return r>=0 && r<8 && c>=0 && c<8; }
function other(c:Color):Color { return c==="w" ? "b" : "w"; }

function attacked(board:Board, square:number, by:Color) {
  const {r,c}=rc(square);

  const pawnRow = r + (by==="w" ? 1 : -1);
  for (const dc of [-1,1]) {
    const cc=c+dc;
    if (inside(pawnRow,cc)) {
      const p=board[idx(pawnRow,cc)];
      if (p?.color===by && p.kind==="p") return true;
    }
  }

  for (const [dr,dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
    const rr=r+dr, cc=c+dc;
    if (inside(rr,cc)) {
      const p=board[idx(rr,cc)];
      if (p?.color===by && p.kind==="n") return true;
    }
  }

  for (const [dr,dc,kinds] of [
    [-1,0,["r","q"]],[1,0,["r","q"]],[0,-1,["r","q"]],[0,1,["r","q"]],
    [-1,-1,["b","q"]],[-1,1,["b","q"]],[1,-1,["b","q"]],[1,1,["b","q"]],
  ] as [number,number,Kind[]][]) {
    let rr=r+dr, cc=c+dc;
    while (inside(rr,cc)) {
      const p=board[idx(rr,cc)];
      if (p) {
        if (p.color===by && kinds.includes(p.kind)) return true;
        break;
      }
      rr+=dr; cc+=dc;
    }
  }

  for (let dr=-1;dr<=1;dr++) for (let dc=-1;dc<=1;dc++) {
    if (!dr && !dc) continue;
    const rr=r+dr,cc=c+dc;
    if (inside(rr,cc)) {
      const p=board[idx(rr,cc)];
      if (p?.color===by && p.kind==="k") return true;
    }
  }
  return false;
}

function kingInCheck(board:Board,color:Color) {
  const king=board.findIndex(p=>p?.color===color && p.kind==="k");
  return king>=0 && attacked(board,king,other(color));
}

function pseudoMoves(board:Board, from:number, enPassant:number|null, rights:Rights):Move[] {
  const piece=board[from];
  if (!piece) return [];
  const {r,c}=rc(from);
  const moves:Move[]=[];

  const push=(rr:number,cc:number)=>{
    if (!inside(rr,cc)) return false;
    const to=idx(rr,cc);
    const target=board[to];
    if (!target) { moves.push({from,to}); return true; }
    if (target.color!==piece.color) moves.push({from,to});
    return false;
  };

  if (piece.kind==="p") {
    const dir=piece.color==="w" ? -1 : 1;
    const start=piece.color==="w" ? 6 : 1;
    const promo=piece.color==="w" ? 0 : 7;
    const oneR=r+dir;
    if (inside(oneR,c) && !board[idx(oneR,c)]) {
      moves.push({from,to:idx(oneR,c),promotion:oneR===promo ? "q" : undefined});
      const twoR=r+2*dir;
      if (r===start && !board[idx(twoR,c)]) moves.push({from,to:idx(twoR,c)});
    }
    for (const dc of [-1,1]) {
      const rr=r+dir, cc=c+dc;
      if (!inside(rr,cc)) continue;
      const to=idx(rr,cc);
      if (board[to] && board[to]!.color!==piece.color) {
        moves.push({from,to,promotion:rr===promo ? "q" : undefined});
      } else if (to===enPassant) {
        moves.push({from,to,enPassant:true});
      }
    }
  }

  if (piece.kind==="n") {
    for (const [dr,dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
      push(r+dr,c+dc);
    }
  }

  if (["b","r","q"].includes(piece.kind)) {
    const dirs:number[][]=[];
    if (piece.kind==="b" || piece.kind==="q") dirs.push([-1,-1],[-1,1],[1,-1],[1,1]);
    if (piece.kind==="r" || piece.kind==="q") dirs.push([-1,0],[1,0],[0,-1],[0,1]);
    for (const [dr,dc] of dirs) {
      let rr=r+dr,cc=c+dc;
      while (inside(rr,cc)) {
        const to=idx(rr,cc), target=board[to];
        if (!target) moves.push({from,to});
        else {
          if (target.color!==piece.color) moves.push({from,to});
          break;
        }
        rr+=dr; cc+=dc;
      }
    }
  }

  if (piece.kind==="k") {
    for (let dr=-1;dr<=1;dr++) for (let dc=-1;dc<=1;dc++) {
      if (!dr && !dc) continue;
      push(r+dr,c+dc);
    }

    if (piece.color==="w" && from===60 && !kingInCheck(board,"w")) {
      if (rights.wk && !board[61] && !board[62] && board[63]?.kind==="r" &&
          !attacked(board,61,"b") && !attacked(board,62,"b")) {
        moves.push({from,to:62,castle:"k"});
      }
      if (rights.wq && !board[59] && !board[58] && !board[57] && board[56]?.kind==="r" &&
          !attacked(board,59,"b") && !attacked(board,58,"b")) {
        moves.push({from,to:58,castle:"q"});
      }
    }

    if (piece.color==="b" && from===4 && !kingInCheck(board,"b")) {
      if (rights.bk && !board[5] && !board[6] && board[7]?.kind==="r" &&
          !attacked(board,5,"w") && !attacked(board,6,"w")) {
        moves.push({from,to:6,castle:"k"});
      }
      if (rights.bq && !board[3] && !board[2] && !board[1] && board[0]?.kind==="r" &&
          !attacked(board,3,"w") && !attacked(board,2,"w")) {
        moves.push({from,to:2,castle:"q"});
      }
    }
  }

  return moves;
}

function applyMove(board:Board,move:Move):Board {
  const next=[...board];
  const piece=next[move.from]!;
  next[move.from]=null;

  if (move.enPassant) {
    const {r,c}=rc(move.to);
    const capturedR = piece.color==="w" ? r+1 : r-1;
    next[idx(capturedR,c)]=null;
  }

  next[move.to]={...piece,kind:move.promotion ?? piece.kind};

  if (move.castle==="k") {
    if (piece.color==="w") {
      next[63]=null; next[61]={color:"w",kind:"r"};
    } else {
      next[7]=null; next[5]={color:"b",kind:"r"};
    }
  }

  if (move.castle==="q") {
    if (piece.color==="w") {
      next[56]=null; next[59]={color:"w",kind:"r"};
    } else {
      next[0]=null; next[3]={color:"b",kind:"r"};
    }
  }

  return next;
}

function nextRights(board:Board,move:Move,rights:Rights):Rights {
  const moving=board[move.from]!;
  const captured=board[move.to];
  const result={...rights};

  if (moving.kind==="k") {
    if (moving.color==="w") { result.wk=false; result.wq=false; }
    else { result.bk=false; result.bq=false; }
  }

  if (moving.kind==="r") {
    if (move.from===63) result.wk=false;
    if (move.from===56) result.wq=false;
    if (move.from===7) result.bk=false;
    if (move.from===0) result.bq=false;
  }

  if (captured?.kind==="r") {
    if (move.to===63) result.wk=false;
    if (move.to===56) result.wq=false;
    if (move.to===7) result.bk=false;
    if (move.to===0) result.bq=false;
  }

  return result;
}

function nextEnPassant(board:Board,move:Move) {
  const moving=board[move.from]!;
  if (moving.kind==="p" && Math.abs(move.to-move.from)===16) {
    return (move.to+move.from)/2;
  }
  return null;
}

function squareName(square:number) {
  const {r,c}=rc(square);
  return String.fromCharCode(97+c) + (8-r);
}

function moveNotation(board:Board, move:Move) {
  const piece=board[move.from]!;
  if (move.castle==="k") return "O-O";
  if (move.castle==="q") return "O-O-O";

  const captured = move.enPassant ? true : Boolean(board[move.to]);
  const pieceLetter = piece.kind==="p" ? "" : piece.kind.toUpperCase();
  const captureMark = captured ? "x" : "";
  const pawnFile = piece.kind==="p" && captured ? squareName(move.from)[0] : "";
  const promotion = move.promotion ? "=Q" : "";

  return pieceLetter + pawnFile + captureMark + squareName(move.to) + promotion;
}

function legalMoves(board:Board,color:Color,enPassant:number|null,rights:Rights) {
  const all:Move[]=[];
  board.forEach((p,from)=>{
    if (p?.color!==color) return;
    for (const move of pseudoMoves(board,from,enPassant,rights)) {
      const next=applyMove(board,move);
      if (!kingInCheck(next,color)) all.push(move);
    }
  });
  return all;
}

function evaluate(board:Board,computer:Color) {
  let score=0;
  for (const piece of board) {
    if (!piece) continue;
    const value=values[piece.kind];
    score += piece.color===computer ? value : -value;
  }
  return score;
}

function minimax(
  board:Board,
  turn:Color,
  computer:Color,
  depth:number,
  enPassant:number|null,
  rights:Rights,
  alpha:number,
  beta:number
):number {
  const moves=legalMoves(board,turn,enPassant,rights);

  if (!moves.length) {
    if (kingInCheck(board,turn)) return turn===computer ? -100000 : 100000;
    return 0;
  }

  if (depth===0) return evaluate(board,computer);

  const maximizing=turn===computer;
  let best=maximizing ? -Infinity : Infinity;

  for (const move of moves) {
    const board2=applyMove(board,move);
    const rights2=nextRights(board,move,rights);
    const ep2=nextEnPassant(board,move);
    const score=minimax(board2,other(turn),computer,depth-1,ep2,rights2,alpha,beta);

    if (maximizing) {
      best=Math.max(best,score);
      alpha=Math.max(alpha,best);
    } else {
      best=Math.min(best,score);
      beta=Math.min(beta,best);
    }

    if (beta<=alpha) break;
  }

  return best;
}

function chooseComputerMove(
  board:Board,
  computer:Color,
  difficulty:Difficulty,
  enPassant:number|null,
  rights:Rights
) {
  const moves=legalMoves(board,computer,enPassant,rights);
  if (!moves.length) return null;

  if (difficulty==="easy") {
    return moves[Math.floor(Math.random()*moves.length)];
  }

  const depth=difficulty==="medium" ? 1 : 2;
  let bestScore=-Infinity;
  let bestMoves:Move[]=[];

  for (const move of moves) {
    const board2=applyMove(board,move);
    const rights2=nextRights(board,move,rights);
    const ep2=nextEnPassant(board,move);
    const score=minimax(board2,other(computer),computer,depth,ep2,rights2,-Infinity,Infinity);

    if (score>bestScore) {
      bestScore=score;
      bestMoves=[move];
    } else if (score===bestScore) {
      bestMoves.push(move);
    }
  }

  return bestMoves[Math.floor(Math.random()*bestMoves.length)];
}

export default function ChessPage() {
  const [board,setBoard]=useState<Board>(startBoard());
  const [turn,setTurn]=useState<Color>("w");
  const [selected,setSelected]=useState<number|null>(null);
  const [enPassant,setEnPassant]=useState<number|null>(null);
  const [rights,setRights]=useState<Rights>({wk:true,wq:true,bk:true,bq:true});
  const [lastMove,setLastMove]=useState<Move|null>(null);
  const [mode,setMode]=useState<Mode>("computer");
  const [humanColor,setHumanColor]=useState<Color>("w");
  const [difficulty,setDifficulty]=useState<Difficulty>("medium");
  const [thinking,setThinking]=useState(false);
  const [history,setHistory]=useState<HistoryEntry[]>([]);
  const [onlineRole,setOnlineRole]=useState<OnlineRole>(null);
  const [roomCode,setRoomCode]=useState("");
  const [joinCode,setJoinCode]=useState("");
  const [onlineStatus,setOnlineStatus]=useState("Offline");
  const [copied,setCopied]=useState(false);
  const onlineClientsRef=useRef<any[]>([]);
  const seenMessagesRef=useRef(new Set<string>());
  const onlineRoomRef=useRef("");
  const onlineRoleRef=useRef<OnlineRole>(null);
  const onlineConnectedRef=useRef(false);
  const stateRef=useRef<OnlineSnapshot>({
    board:startBoard(),
    turn:"w",
    enPassant:null,
    rights:{wk:true,wq:true,bk:true,bq:true},
    lastMove:null,
    history:[],
  });

  const computerColor:Color=humanColor==="w" ? "b" : "w";
  const moves=useMemo(()=>legalMoves(board,turn,enPassant,rights),[board,turn,enPassant,rights]);
  const selectedMoves=selected===null ? [] : moves.filter(m=>m.from===selected);
  const inCheck=kingInCheck(board,turn);
  const gameOver=moves.length===0;
  const computerTurn=mode==="computer" && turn===computerColor && !gameOver;
  const onlineColor:Color|null=onlineRole==="host" ? "w" : onlineRole==="guest" ? "b" : null;
  const onlineTurnBlocked=mode==="online" && (!onlineConnectedRef.current || onlineColor!==turn);

  const status=gameOver
    ? inCheck
      ? `${turn==="w" ? "Black" : "White"} wins by checkmate`
      : "Draw by stalemate"
    : thinking
      ? `Computer (${computerColor==="w" ? "White" : "Black"}) is thinking…`
      : inCheck
        ? `${turn==="w" ? "White" : "Black"} is in check`
        : `${turn==="w" ? "White" : "Black"} to move`;

  function applyOnlineSnapshot(snapshot:OnlineSnapshot) {
    setBoard(snapshot.board);
    setTurn(snapshot.turn);
    setEnPassant(snapshot.enPassant);
    setRights(snapshot.rights);
    setLastMove(snapshot.lastMove);
    setHistory(snapshot.history);
    setSelected(null);
    stateRef.current=snapshot;
  }

  function publishOnline(payload:any, important=true) {
    const room=onlineRoomRef.current;
    if (!room || !onlineClientsRef.current.length) return;
    const packet=JSON.stringify({
      mid:`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`,
      sender:onlineRoleRef.current,
      payload,
    });
    onlineClientsRef.current.forEach(client=>{
      try {
        if (client.connected) client.publish(`${ONLINE_PREFIX}/${room}`,packet,{qos:important?1:0,retain:false});
      } catch {}
    });
  }

  function disconnectOnline() {
    onlineClientsRef.current.forEach(client=>{ try { client.end(true); } catch {} });
    onlineClientsRef.current=[];
    onlineConnectedRef.current=false;
    onlineRoomRef.current="";
    onlineRoleRef.current=null;
    setOnlineRole(null);
    setRoomCode("");
    setOnlineStatus("Offline");
  }

  async function connectOnline(room:string,role:Exclude<OnlineRole,null>) {
    disconnectOnline();
    setMode("online");
    setOnlineRole(role);
    onlineRoleRef.current=role;
    onlineRoomRef.current=room;
    setRoomCode(room);
    setOnlineStatus("Connecting to global relay…");

    const mqtt=await loadMqtt();
    const brokers=[
      "wss://broker.emqx.io:8084/mqtt",
      "wss://broker.hivemq.com:8884/mqtt",
      "wss://test.mosquitto.org:8081/mqtt",
    ];
    const topic=`${ONLINE_PREFIX}/${room}`;
    let readyCount=0;

    brokers.forEach((url,index)=>{
      const client=mqtt.connect(url,{
        clientId:`arunchess_${room.toLowerCase()}_${Math.random().toString(36).slice(2,10)}_${index}`,
        clean:true,
        reconnectPeriod:1800,
        connectTimeout:9000,
        keepalive:30,
        protocolVersion:4,
        resubscribe:true,
      });
      onlineClientsRef.current.push(client);

      client.on("connect",()=>{
        client.subscribe(topic,{qos:1},()=>{
          readyCount++;
          onlineConnectedRef.current=true;
          setOnlineStatus(role==="host" ? "Room ready · waiting for opponent" : "Connected · joining room");
          if (role==="guest") publishOnline({type:"join"},true);
          if (role==="host" && readyCount===1) {
            publishOnline({type:"state",snapshot:stateRef.current},true);
          }
        });
      });

      client.on("message",(_topic:any,raw:any)=>{
        let packet:any;
        try { packet=JSON.parse(raw.toString()); } catch { return; }
        if (!packet?.mid || seenMessagesRef.current.has(packet.mid)) return;
        seenMessagesRef.current.add(packet.mid);
        if (seenMessagesRef.current.size>2000) seenMessagesRef.current.clear();

        const data=packet.payload;
        if (!data) return;

        if (data.type==="join" && role==="host") {
          setOnlineStatus("Opponent connected · you are White");
          publishOnline({type:"state",snapshot:stateRef.current},true);
          return;
        }

        if (data.type==="state" && data.snapshot) {
          applyOnlineSnapshot(data.snapshot);
          setOnlineStatus(role==="host" ? "Opponent connected · you are White" : "Connected · you are Black");
          return;
        }

        if (data.type==="move" && data.snapshot) {
          applyOnlineSnapshot(data.snapshot);
          setOnlineStatus(role==="host" ? "Online · you are White" : "Online · you are Black");
          return;
        }

        if (data.type==="reset") {
          const fresh:OnlineSnapshot={
            board:startBoard(),
            turn:"w",
            enPassant:null,
            rights:{wk:true,wq:true,bk:true,bq:true},
            lastMove:null,
            history:[],
          };
          applyOnlineSnapshot(fresh);
        }
      });
    });
  }

  function createOnlineRoom() {
    const room=makeRoomCode();
    const fresh:OnlineSnapshot={
      board:startBoard(),
      turn:"w",
      enPassant:null,
      rights:{wk:true,wq:true,bk:true,bq:true},
      lastMove:null,
      history:[],
    };
    applyOnlineSnapshot(fresh);
    connectOnline(room,"host").catch(()=>setOnlineStatus("Could not connect to a global relay."));
  }

  function joinOnlineRoom(code=joinCode) {
    const room=code.trim().toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6);
    if (room.length!==6) {
      setOnlineStatus("Enter a valid 6-character room code.");
      return;
    }
    setJoinCode(room);
    connectOnline(room,"guest").catch(()=>setOnlineStatus("Could not connect to that room."));
  }

  async function copyInvite() {
    if (!roomCode) return;
    const url=`${window.location.origin}/games/chess?room=${roomCode}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(()=>setCopied(false),1800);
    } catch {
      window.prompt("Copy this invite link:",url);
    }
  }

  function reset(nextHuman=humanColor,nextMode=mode) {
    const fresh:OnlineSnapshot={
      board:startBoard(),
      turn:"w",
      enPassant:null,
      rights:{wk:true,wq:true,bk:true,bq:true},
      lastMove:null,
      history:[],
    };
    applyOnlineSnapshot(fresh);
    setThinking(false);
    setHumanColor(nextHuman);
    setMode(nextMode);
    if (nextMode==="online" && onlineConnectedRef.current) publishOnline({type:"reset"},true);
  }

  function commitMove(move:Move) {
    const notation=moveNotation(board,move);
    const moveNumber=Math.floor(history.length/2)+1;
    const board2=applyMove(board,move);
    const rights2=nextRights(board,move,rights);
    const ep2=nextEnPassant(board,move);

    setBoard(board2);
    setRights(rights2);
    setEnPassant(ep2);
    setLastMove(move);
    const history2=[...history,{number:moveNumber,color:turn,notation}];
    const turn2=other(turn);
    setHistory(history2);
    setSelected(null);
    setTurn(turn2);

    const snapshot:OnlineSnapshot={
      board:board2,
      turn:turn2,
      enPassant:ep2,
      rights:rights2,
      lastMove:move,
      history:history2,
    };
    stateRef.current=snapshot;
    if (mode==="online") publishOnline({type:"move",snapshot},true);
  }

  function choose(square:number) {
    if (gameOver || thinking || computerTurn || onlineTurnBlocked) return;
    const piece=board[square];

    if (piece?.color===turn) {
      if (mode==="computer" && piece.color!==humanColor) return;
      if (mode==="online" && piece.color!==onlineColor) return;
      setSelected(square);
      return;
    }

    if (selected===null) return;
    const move=selectedMoves.find(m=>m.to===square);
    if (move) commitMove(move);
  }

  useEffect(()=>{
    stateRef.current={board,turn,enPassant,rights,lastMove,history};
  },[board,turn,enPassant,rights,lastMove,history]);

  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    const room=(params.get("room")||"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6);
    if (room.length===6) {
      setJoinCode(room);
      joinOnlineRoom(room);
    }
    return ()=>disconnectOnline();
    // Run once on page load so shared invite links join automatically.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    if (!computerTurn) return;

    setThinking(true);
    const timer=window.setTimeout(()=>{
      const move=chooseComputerMove(board,computerColor,difficulty,enPassant,rights);
      if (!move) {
        setThinking(false);
        return;
      }

      const notation=moveNotation(board,move);
      const moveNumber=Math.floor(history.length/2)+1;
      const board2=applyMove(board,move);
      const rights2=nextRights(board,move,rights);
      const ep2=nextEnPassant(board,move);

      setBoard(board2);
      setRights(rights2);
      setEnPassant(ep2);
      setLastMove(move);
      setHistory(prev=>[...prev,{number:moveNumber,color:computerColor,notation}]);
      setSelected(null);
      setTurn(other(computerColor));
      setThinking(false);
    },550);

    return ()=>window.clearTimeout(timer);
  },[computerTurn,board,computerColor,difficulty,enPassant,rights,history.length]);

  return (
    <main className="chess-page">
      <div className="chess-wrap">
        <div className="chess-topbar">
          <a href="/#games">← Back to Games</a>
          <span>Playable chess</span>
        </div>

        <header className="chess-hero">
          <p className="section-kicker">PLAYABLE BOARD GAME</p>
          <h1>Chess</h1>
          <p>Play against the computer, a friend on the same device, or challenge someone anywhere in the world with an online room link.</p>
        </header>

        <section className="chess-shell">
          <div className="chess-options">
            <div className="chess-option-row">
              <span>Mode</span>
              <button
                className={mode==="computer" ? "active" : ""}
                onClick={()=>reset(humanColor,"computer")}
              >
                <Bot className="h-4 w-4" /> Play vs Computer
              </button>
              <button
                className={mode==="friend" ? "active" : ""}
                onClick={()=>reset(humanColor,"friend")}
              >
                <Users className="h-4 w-4" /> 2 Players
              </button>
              <button
                className={mode==="online" ? "active" : ""}
                onClick={()=>{ setMode("online"); setSelected(null); }}
              >
                <Users className="h-4 w-4" /> Online 2 Players
              </button>
            </div>

            {mode==="online" && (
              <div className="chess-help" style={{marginTop:"14px"}}>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <strong>Play online worldwide</strong>
                    <p style={{marginTop:"6px"}}>{onlineStatus}</p>
                    {roomCode && (
                      <p style={{marginTop:"6px"}}>
                        Room: <strong>{roomCode}</strong>
                        {onlineRole && <> · You are {onlineRole==="host" ? "White" : "Black"}</>}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    {!roomCode && (
                      <>
                        <button className="active" onClick={createOnlineRoom}>Create Online Room</button>
                        <div className="flex gap-2">
                          <input
                            value={joinCode}
                            onChange={e=>setJoinCode(e.target.value.toUpperCase())}
                            onKeyDown={e=>{ if(e.key==="Enter") joinOnlineRoom(); }}
                            placeholder="Room code"
                            maxLength={6}
                            className="min-w-0 flex-1 rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm font-bold uppercase text-white outline-none"
                          />
                          <button onClick={()=>joinOnlineRoom()}>Join Room</button>
                        </div>
                      </>
                    )}
                    {roomCode && (
                      <>
                        <button className="active" onClick={copyInvite}>{copied ? "Invite Link Copied" : "Copy Invite Link"}</button>
                        <button onClick={()=>{ disconnectOnline(); setMode("online"); }}>Leave Online Room</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {mode==="computer" && (
              <>
                <div className="chess-option-row">
                  <span>Play as</span>
                  <button
                    className={humanColor==="w" ? "active" : ""}
                    onClick={()=>reset("w","computer")}
                  >
                    ♙ White
                  </button>
                  <button
                    className={humanColor==="b" ? "active" : ""}
                    onClick={()=>reset("b","computer")}
                  >
                    ♟ Black
                  </button>
                </div>

                <div className="chess-option-row chess-difficulty-row">
                  <span>Difficulty</span>
                  {(["easy","medium","hard"] as Difficulty[]).map(level=>(
                    <button
                      key={level}
                      className={difficulty===level ? "active" : ""}
                      onClick={()=>{ setDifficulty(level); reset(humanColor,"computer"); }}
                    >
                      {level.charAt(0).toUpperCase()+level.slice(1)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="chess-status">
            <div>
              <span>Status</span>
              <strong>{status}</strong>
            </div>
            <button onClick={()=>reset()}><RotateCcw className="h-4 w-4" /> New Game</button>
          </div>

          <div className="chess-game-layout">
            <div className="chess-board" role="grid" aria-label="Chess board">
            {board.map((piece,i)=>{
              const {r,c}=rc(i);
              const light=(r+c)%2===0;
              const isSelected=selected===i;
              const move=selectedMoves.find(m=>m.to===i);
              const isLast=lastMove && (lastMove.from===i || lastMove.to===i);
              const file=String.fromCharCode(97+c);
              const rank=8-r;

              return (
                <button
                  key={i}
                  className={[
                    "chess-square",
                    light ? "light" : "dark",
                    isSelected ? "selected" : "",
                    move ? "legal" : "",
                    move && board[i] ? "capture" : "",
                    isLast ? "last" : "",
                  ].join(" ")}
                  onClick={()=>choose(i)}
                  aria-label={piece ? `${piece.color==="w"?"White":"Black"} piece on ${file}${rank}` : `Empty ${file}${rank}`}
                >
                  {c===0 && <span className="chess-rank">{rank}</span>}
                  {r===7 && <span className="chess-file">{file}</span>}
                  {piece && (
                    <span className={`chess-piece ${piece.color==="w"?"white":"black"}`}>
                      {glyphs[piece.color][piece.kind]}
                    </span>
                  )}
                  {move && !board[i] && <span className="chess-move-dot" />}
                </button>
              );
            })}

            {gameOver && (
              <div className="chess-overlay">
                <h2>{inCheck ? "Checkmate" : "Stalemate"}</h2>
                <p>{status}</p>
                <button onClick={()=>reset()}>Play Again</button>
              </div>
            )}
            </div>

            <aside className="chess-history-panel">
              <div className="chess-history-header">
                <div>
                  <span>Game log</span>
                  <h2>Move History</h2>
                </div>
                <button onClick={()=>reset()}>
                  <RotateCcw className="h-4 w-4" />
                  New Game
                </button>
              </div>

              <div className="chess-history-list" aria-live="polite">
                {history.length===0 ? (
                  <p className="chess-history-empty">Moves will appear here as the game is played.</p>
                ) : (
                  Array.from({length:Math.ceil(history.length/2)},(_,i)=>{
                    const white=history[i*2];
                    const black=history[i*2+1];
                    return (
                      <div key={i} className="chess-history-row">
                        <span className="chess-history-number">{i+1}.</span>
                        <span>{white?.notation ?? ""}</span>
                        <span>{black?.notation ?? ""}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </aside>
          </div>

          <div className="chess-help">
            <strong>Game modes:</strong> Play against the computer, use local 2-player mode, or create an online room and share the invite link with a friend anywhere in the world. Castling, en passant, check, checkmate, stalemate, and automatic queen promotion are supported.
          </div>
        </section>
      </div>
    </main>
  );
}
