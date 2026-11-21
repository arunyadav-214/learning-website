import { NextResponse } from "next/server";

const portfolioContext = `
You are Arun Assistant, the personal portfolio assistant for Arun K. Yadav.

Only answer questions about Arun, his portfolio, his academic/professional background, projects, skills, research, and navigation of this website. Be friendly, concise, and factual. If a visitor asks for private, sensitive, or unknown information, say you do not have that information.

Known public portfolio information:
- Arun K. Yadav is a Computer Science student with an Applied Engineering minor.
- His work spans software development, databases, computer architecture, operating systems, digital logic, PLC automation, research, games, and web projects.
- Featured projects include Midnight City Racing, Parking Garage PLC Project, Application of Machine Learning in Sports Analytics, and Arun Learning Hub.
- The Parking Garage PLC project uses Do-more Designer, DM-SIM, PLC concepts, and ladder logic.
- Research includes Application of Machine Learning in Sports Analytics.
- The site includes Projects, Skills, Research, Certificates, Games, Books, Apps, Videos, Academic Work, and Resume pages.
- Built-in games include Tic-Tac-Toe Arena, Lion & Goats, Chess, Curious Monkey, Neon Snake, and Rock-Paper-Scissors.
- Arun's website is arun7.com.np.
- The Resume section is private/password-protected. Never reveal, infer, confirm, or hint at the password. Tell visitors they need permission from Arun to access it.
- Do not claim Arun has a skill, job, award, degree, or experience unless it is listed above or supplied by the visitor.
- When useful, direct visitors to routes such as /projects, /skills, /research, /academic-work, /games, and /resume.
`;

function localReply(message: string) {
  const q = message.toLowerCase();

  if (q.includes("who is arun") || q.includes("about arun")) {
    return "Arun K. Yadav is a Computer Science student with an Applied Engineering minor. He focuses on software, computer systems, automation, databases, digital logic, PLC work, research, and hands-on technical projects.";
  }

  if (q.includes("project")) {
    return "Some featured projects are Midnight City Racing, the Parking Garage PLC Project, Application of Machine Learning in Sports Analytics, and the Arun Learning Hub. You can explore them at /projects.";
  }

  if (q.includes("skill") || q.includes("technology") || q.includes("tech stack")) {
    return "Arun’s portfolio highlights software development, databases, computer architecture, operating systems, digital logic, PLC automation, research, and web development. See /skills for the organized skills section.";
  }

  if (q.includes("research")) {
    return "Arun’s featured research is “Application of Machine Learning in Sports Analytics.” Visit /research to learn more.";
  }

  if (q.includes("resume") || q.includes("password")) {
    return "The Resume area is private and password-protected. You’ll need permission from Arun to access it. I can’t reveal or hint at the password.";
  }

  if (q.includes("game")) {
    return "Arun’s Games section includes Midnight City Racing, Tic-Tac-Toe Arena, Lion & Goats, Chess, Curious Monkey, Neon Snake, and Rock-Paper-Scissors. Visit /games.";
  }

  if (q.includes("academic") || q.includes("school") || q.includes("course")) {
    return "You can find Arun’s academic work and coursework-related portfolio items at /academic-work.";
  }

  if (q.includes("contact") || q.includes("linkedin") || q.includes("instagram")) {
    return "You can find Arun’s public social links in the Social Media section on the homepage.";
  }

  return "I can help with Arun’s projects, skills, research, academic work, games, resume access, or finding a section of the portfolio. What would you like to know?";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({ reply: "Please enter a question." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ reply: localReply(message), mode: "local" });
    }

    const history = Array.isArray(body?.history)
      ? body.history
          .slice(-8)
          .filter(
            (item: unknown): item is { role: "user" | "assistant"; content: string } =>
              !!item &&
              typeof item === "object" &&
              "role" in item &&
              "content" in item &&
              ((item as { role?: string }).role === "user" ||
                (item as { role?: string }).role === "assistant") &&
              typeof (item as { content?: unknown }).content === "string"
          )
          .map((item: { role: "user" | "assistant"; content: string }) => ({
            role: item.role,
            content: item.content.slice(0, 2000),
          }))
      : [{ role: "user" as const, content: message }];

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5-mini",
        instructions: portfolioContext,
        input: history,
        max_output_tokens: 300,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ reply: localReply(message), mode: "local" });
    }

    const data = await response.json();
    const reply =
      typeof data?.output_text === "string" && data.output_text.trim()
        ? data.output_text.trim()
        : localReply(message);

    return NextResponse.json({ reply, mode: "ai" });
  } catch {
    return NextResponse.json({
      reply:
        "I can help with Arun’s projects, skills, research, academic work, games, and resume access.",
      mode: "local",
    });
  }
}
