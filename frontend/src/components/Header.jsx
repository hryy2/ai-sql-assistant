import { BrainCircuit } from "lucide-react";

function Header() {
  return (
    <header
      style={{
        textAlign: "center",
        marginBottom: "48px",
      }}
    >
      <BrainCircuit
        size={54}
        color="var(--primary)"
        strokeWidth={2}
      />

      <h1
        style={{
          fontSize: "3rem",
          fontWeight: 700,
          marginTop: "16px",
          marginBottom: "12px",
          letterSpacing: "-1px",
        }}
      >
        AI SQL Assistant
      </h1>

      <p
        style={{
          fontSize: "1.05rem",
          color: "var(--text-secondary)",
        }}
      >
        Convert natural language into SQL queries for electricity and weather
        data.
      </p>
    </header>
  );
}

export default Header;