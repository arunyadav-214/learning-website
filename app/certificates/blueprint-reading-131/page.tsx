export default function BlueprintReadingCertificatePage() {
  return (
    <main className="certificate-page">
      <div className="certificate-page-wrap">
        <div className="certificate-topbar">
          <a href="/#certificates">← Back to Certificates</a>
          <span>Certificate of Completion</span>
        </div>

        <section className="certificate-view-card">
          <div className="certificate-sheet" aria-label="Blueprint Reading 131 certificate">
            <div className="certificate-double-border">
              <div className="certificate-heading">
                <span className="certificate-heading-dark">CERTIFICATE</span>
                <span className="certificate-heading-light">OF</span>
                <span className="certificate-heading-accent">COMPLETION</span>
              </div>

              <div className="certificate-body">
                <p className="certificate-small-label">THIS CERTIFIES THAT</p>
                <h1>ARUN KUMAR YADAV</h1>
                <div className="certificate-rule" />

                <p className="certificate-small-label">COMPLETED</p>
                <h2>Blueprint Reading 131</h2>
                <div className="certificate-rule" />

                <p className="certificate-small-label">AT TOOLINGU.COM ON</p>
                <p className="certificate-date">09/17/2026</p>
                <div className="certificate-short-rule" />

                <div className="certificate-provider">
                  <strong>TOOLINGU</strong>
                  <span>|</span>
                  <strong>SME</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="certificate-meta">
            <p className="section-kicker">CERTIFICATE</p>
            <h2>Blueprint Reading 131</h2>
            <p>
              Certificate of completion awarded to Arun Kumar Yadav on September 17, 2026.
            </p>
            <div className="certificate-meta-row">
              <span>Completed</span>
              <strong>09/17/2026</strong>
            </div>
            <div className="certificate-meta-row">
              <span>Provider</span>
              <strong>Tooling U-SME</strong>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
