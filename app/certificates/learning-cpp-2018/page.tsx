export default function LearningCppCertificatePage() {
  return (
    <main className="certificate-page">
      <div className="certificate-page-wrap">
        <div className="certificate-topbar">
          <a href="/#certificates">← Back to Certificates</a>
          <span>LinkedIn Learning Certificate</span>
        </div>

        <section className="certificate-view-card">
          <div
            className="certificate-sheet"
            aria-label="Learning C++ 2018 certificate"
            style={{ background: "#eef5f7", padding: "2rem" }}
          >
            <div
              style={{
                minHeight: "540px",
                background: "white",
                borderRadius: "1.25rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "3rem 2rem",
                color: "#111827",
              }}
            >
              <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0a66c2" }}>
                LinkedIn Learning
              </div>
              <h1 style={{ marginTop: "2rem", fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 500 }}>
                Learning C++ (2018)
              </h1>
              <p style={{ marginTop: "2rem", fontSize: "1.25rem" }}>
                Course completed by Arun Kumar Yadav
              </p>
              <p style={{ marginTop: ".5rem", color: "#4b5563" }}>
                Nov 28, 2025 at 05:27PM UTC • 2 hours 26 minutes
              </p>
              <p style={{ marginTop: "2.5rem", fontWeight: 700 }}>Top skills covered</p>
              <span
                style={{
                  marginTop: ".75rem",
                  border: "1px solid #9ca3af",
                  borderRadius: "999px",
                  padding: ".45rem .8rem",
                  fontWeight: 700,
                }}
              >
                C++
              </span>
              <p style={{ marginTop: "3rem", fontSize: ".78rem", color: "#6b7280", wordBreak: "break-all" }}>
                Certificate ID: 4bc3b5f4a3b7e5a06bd030af3628d5749099172f95688911ac18db4e2dffa970
              </p>
              <p style={{ marginTop: ".5rem", color: "#6b7280" }}>
                Shea Hanson, Head of Learning Content Strategy
              </p>
            </div>
          </div>

          <div className="certificate-meta">
            <p className="section-kicker">CERTIFICATE</p>
            <h2>Learning C++ (2018)</h2>
            <p>
              LinkedIn Learning course completion certificate awarded to Arun Kumar Yadav on November 28, 2025.
            </p>
            <div className="certificate-meta-row">
              <span>Completed</span>
              <strong>11/28/2025</strong>
            </div>
            <div className="certificate-meta-row">
              <span>Provider</span>
              <strong>LinkedIn Learning</strong>
            </div>
            <div className="certificate-meta-row">
              <span>Duration</span>
              <strong>2h 26m</strong>
            </div>
            <div className="certificate-meta-row">
              <span>Skill</span>
              <strong>C++</strong>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
