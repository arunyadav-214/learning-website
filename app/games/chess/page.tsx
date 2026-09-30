"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

type Color = "w" | "b";
type Kind = "p" | "r" | "n" | "b" | "q" | "k";
type Piece = { color: Color; kind: Kind } | null;
type Board = Piece[];
type Move = {
  from: number;
  to: number;
  promotion?: Kind;
  castle?: "k" | "q";
  enPassant?: boolean;
};

const glyphs: Record<Color, Record<Kind, string>> = {
  w: { k:"♔", q:"♕", r:"♖", b:"♗", n:"♘", p:"♙" },
  b: { k:"♚", q:"♛", r:"♜", b:"♝", n:"♞", p:"♟" },
};

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

function pseudoMoves(
  board:Board,
  from:number,
  enPassant:number|null,
  castleRights:{wk:boolean,wq:boolean,bk:boolean,bq:boolean}
):Move[] {
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
      if (castleRights.wk && !board[61] && !board[62] && board[63]?.kind==="r" &&
          !attacked(board,61,"b") && !attacked(board,62,"b")) {
        moves.push({from,to:62,castle:"k"});
      }
      if (castleRights.wq && !board[59] && !board[58] && !board[57] && board[56]?.kind==="r" &&
          !attacked(board,59,"b") && !attacked(board,58,"b")) {
        moves.push({from,to:58,castle:"q"});
      }
    }
    if (piece.color==="b" && from===4 && !kingInCheck(board,"b")) {
      if (castleRights.bk && !board[5] && !board[6] && board[7]?.kind==="r" &&
          !attacked(board,5,"w") && !attacked(board,6,"w")) {
        moves.push({from,to:6,castle:"k"});
      }
      if (castleRights.bq && !board[3] && !board[2] && !board[1] && board[0]?.kind==="r" &&
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

  next[move.to]={...piece, kind:move.promotion ?? piece.kind};

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

function legalMoves(
  board:Board,
  color:Color,
  enPassant:number|null,
  rights:{wk:boolean,wq:boolean,bk:boolean,bq:boolean}
) {
  const all:Move[]=[];
  board.forEach((p,from)=>{
    if (p?.color!==color) return;
    for (const m of pseudoMoves(board,from,enPassant,rights)) {
      const next=applyMove(board,m);
      if (!kingInCheck(next,color)) all.push(m);
    }
  });
  return all;
}

export default function ChessPage() {
  const [board,setBoard]=useState<Board>(startBoard());
  const [turn,setTurn]=useState<Color>("w");
  const [selected,setSelected]=useState<number|null>(null);
  const [enPassant,setEnPassant]=useState<number|null>(null);
  const [rights,setRights]=useState({wk:true,wq:true,bk:true,bq:true});
  const [lastMove,setLastMove]=useState<Move|null>(null);

  const moves=useMemo(()=>legalMoves(board,turn,enPassant,rights),[board,turn,enPassant,rights]);
  const selectedMoves=selected===null ? [] : moves.filter(m=>m.from===selected);
  const inCheck=kingInCheck(board,turn);
  const gameOver=moves.length===0;
  const status=gameOver
    ? inCheck
      ? `${turn==="w" ? "Black" : "White"} wins by checkmate`
      : "Draw by stalemate"
    : inCheck
      ? `${turn==="w" ? "White" : "Black"} is in check`
      : `${turn==="w" ? "White" : "Black"} to move`;

  function reset() {
    setBoard(startBoard());
    setTurn("w");
    setSelected(null);
    setEnPassant(null);
    setRights({wk:true,wq:true,bk:true,bq:true});
    setLastMove(null);
  }

  function choose(square:number) {
    if (gameOver) return;
    const p=board[square];

    if (p?.color===turn) {
      setSelected(square);
      return;
    }

    if (selected===null) return;
    const move=selectedMoves.find(m=>m.to===square);
    if (!move) return;

    const moving=board[move.from]!;
    const captured=board[move.to];
    const next=applyMove(board,move);

    const nextRights={...rights};
    if (moving.kind==="k") {
      if (moving.color==="w") { nextRights.wk=false; nextRights.wq=false; }
      else { nextRights.bk=false; nextRights.bq=false; }
    }
    if (moving.kind==="r") {
      if (move.from===63) nextRights.wk=false;
      if (move.from===56) nextRights.wq=false;
      if (move.from===7) nextRights.bk=false;
      if (move.from===0) nextRights.bq=false;
    }
    if (captured?.kind==="r") {
      if (move.to===63) nextRights.wk=false;
      if (move.to===56) nextRights.wq=false;
      if (move.to===7) nextRights.bk=false;
      if (move.to===0) nextRights.bq=false;
    }

    let nextEP:number|null=null;
    if (moving.kind==="p" && Math.abs(move.to-move.from)===16) {
      nextEP=(move.to+move.from)/2;
    }

    setBoard(next);
    setRights(nextRights);
    setEnPassant(nextEP);
    setLastMove(move);
    setSelected(null);
    setTurn(other(turn));
  }

  return (
    <main className="chess-page">
      <div className="chess-wrap">
        <div className="chess-topbar">
          <a href="/#games">← Back to Games</a>
          <span>Classic two-player chess</span>
        </div>

        <header className="chess-hero">
          <p className="section-kicker">PLAYABLE BOARD GAME</p>
          <h1>Chess</h1>
          <p>Play a complete local game of chess with legal move highlighting and mobile tap controls.</p>
        </header>

        <section className="chess-shell">
          <div className="chess-status">
            <div>
              <span>Status</span>
              <strong>{status}</strong>
            </div>
            <button onClick={reset}><RotateCcw className="h-4 w-4" /> New Game</button>
          </div>

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
                  {piece && <span className={`chess-piece ${piece.color==="w"?"white":"black"}`}>{glyphs[piece.color][piece.kind]}</span>}
                  {move && !board[i] && <span className="chess-move-dot" />}
                </button>
              );
            })}

            {gameOver && (
              <div className="chess-overlay">
                <h2>{inCheck ? "Checkmate" : "Stalemate"}</h2>
                <p>{status}</p>
                <button onClick={reset}>Play Again</button>
              </div>
            )}
          </div>

          <div className="chess-help">
            <strong>How to play:</strong> tap a piece, then tap a highlighted square. Castling, en passant, check, checkmate, stalemate, and automatic queen promotion are supported.
          </div>
        </section>
      </div>
    </main>
  );
}
