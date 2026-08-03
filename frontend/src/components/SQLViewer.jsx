import { useState } from "react";
import { Database, Copy} from "lucide-react";
import Toast from "./Toast";

function SQLViewer({ sql }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!sql) return;

    try {
      await navigator.clipboard.writeText(sql);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="card">
        {/* ===========================
            Header
        =========================== */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2
            className="section-title"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: 0,
            }}
          >
            <Database size={22} />
            Generated SQL
          </h2>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!sql}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",

              padding: "8px 14px",

              border: "1px solid var(--border)",
              borderRadius: "10px",

              background: "white",

              fontSize: "0.9rem",
              fontWeight: 500,

              cursor: sql ? "pointer" : "not-allowed",

              opacity: sql ? 1 : 0.5,

              transition: "all .2s ease",
            }}
          >
            <>
              <Copy size={18} />
              Copy SQL
            </>
          </button>
        </div>

        {/* ===========================
            SQL Block
        =========================== */}

        <pre className="sql-block">
          {sql || "Run a query above to generate SQL."}
        </pre>
      </div>

      {/* ===========================
          Toast
      =========================== */}

      <Toast show={copied} type="success" message="SQL copied successfully!" />
    </>
  );
}

export default SQLViewer;
