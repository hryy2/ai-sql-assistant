import { BrainCircuit } from "lucide-react";

function Header() {
  return (
    <header
      style={{
        textAlign: "center",
        marginBottom: "56px",
      }}
    >
      <BrainCircuit
        size={56}
        color="var(--primary)"
        strokeWidth={2}
      />

      <h1
        style={{
          fontSize: "3.1rem",
          fontWeight: 700,
          marginTop: "18px",
          marginBottom: "14px",
          letterSpacing: "-1.2px",
          color: "var(--text-primary)",
        }}
      >
        AI Data Insights Platform
      </h1>

      <p
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          fontSize: "1.08rem",
          lineHeight: 1.8,
          color: "var(--text-secondary)",
        }}
      >
        Transform natural language into SQL queries, interactive
        visualizations, and AI-powered business insights using electricity and
        weather datasets.
      </p>

      <div
        style={{
          marginTop: "24px",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 20px",
          borderRadius: "999px",
          background: "#EFF6FF",
          border: "1px solid #DBEAFE",
          color: "#2563EB",
          fontSize: "0.95rem",
          fontWeight: 600,
        }}
      >
        Natural Language
        <span>→</span>
        SQL
        <span>→</span>
        AI Analysis
        <span>→</span>
        Visualization
      </div>
    </header>
  );
}

export default Header;