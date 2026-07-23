import React from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";

const SWATCHES = [
  { name: "--bg", var: "var(--bg)" },
  { name: "--card", var: "var(--card)" },
  { name: "--imp-text-color", var: "var(--imp-text-color)" },
  { name: "--accent-secondary", var: "var(--accent-secondary)" },
  { name: "--accent-blue", var: "var(--accent-blue)" },
  { name: "--glass-bg", var: "var(--glass-bg)" },
];

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <h2 className="text-h3" style={{ marginBottom: 20 }}>{title}</h2>
      {children}
    </div>
  );
}

function StyleGuide() {
  return (
    <Container fluid className="about-section" style={{ minHeight: "100vh" }}>
      <Particle />
      <Container style={{ paddingTop: "80px", paddingBottom: 80 }}>
        <h1 className="text-display" style={{ marginBottom: 8 }}>Design System</h1>
        <p className="text-body" style={{ marginBottom: 48, maxWidth: 640 }}>
          Phase 1 reference: design tokens, the glass component library, the
          12-column grid, and the typography scale. Not linked from
          navigation — same pattern as /admin.
        </p>

        <Section title="Color tokens">
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {SWATCHES.map((s) => (
              <div key={s.name} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "var(--radius-md)",
                    background: s.var,
                    border: "1px solid var(--glass-border)",
                    marginBottom: 8,
                  }}
                />
                <div className="text-mono" style={{ fontSize: "0.65em" }}>{s.name}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typography scale">
          <div className="text-display">Display — text-display</div>
          <div className="text-h2" style={{ marginTop: 12 }}>Heading 2 — text-h2</div>
          <div className="text-h3" style={{ marginTop: 12 }}>Heading 3 — text-h3</div>
          <p className="text-body" style={{ marginTop: 12 }}>
            Body text — text-body. The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-small" style={{ marginTop: 8 }}>
            Small text — text-small, for captions and metadata.
          </p>
          <p className="text-mono" style={{ marginTop: 8 }}>
            Mono text — text-mono, for code and technical values.
          </p>
        </Section>

        <Section title="Glass component library">
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <div className="glass" style={{ padding: 24, width: 220 }}>
              <div className="text-h3">.glass</div>
              <p className="text-small" style={{ marginTop: 8 }}>
                Primary glass surface — hover to see the lift.
              </p>
            </div>
            <div className="glass-subtle" style={{ padding: 24, width: 220 }}>
              <div className="text-h3">.glass-subtle</div>
              <p className="text-small" style={{ marginTop: 8 }}>
                Lighter-weight glass for nested/secondary surfaces.
              </p>
            </div>
          </div>
        </Section>

        <Section title="12-column grid">
          <div className="ds-grid">
            {[4, 4, 4, 6, 6, 12].map((span, i) => (
              <div
                key={i}
                className={`ds-col-${span} glass-subtle`}
                style={{ padding: 16, textAlign: "center" }}
              >
                <span className="text-mono">span {span}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Spacing & radius scale">
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
            {["--space-2", "--space-4", "--space-6", "--space-8", "--space-12", "--space-16"].map((s) => (
              <div key={s} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: `var(${s})`,
                    height: `var(${s})`,
                    background: "var(--imp-text-color)",
                    borderRadius: "var(--radius-sm)",
                  }}
                />
                <div className="text-mono" style={{ fontSize: "0.6em", marginTop: 6 }}>{s}</div>
              </div>
            ))}
          </div>
        </Section>
      </Container>
    </Container>
  );
}

export default StyleGuide;
