import { useState } from "react";
import { Table2, Database, Download } from "lucide-react";

import { exportCSV } from "../utils/exportCSV";
import Toast from "./Toast";

function ResultsTable({ results }) {
  const [showToast, setShowToast] = useState(false);

  const rowCount = results.length;

  const handleExport = () => {
    const today = new Date().toISOString().split("T")[0];

    exportCSV(results, `results-${today}.csv`);

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
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
            <Table2 size={22} />
            Query Results
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <button
              type="button"
              onClick={handleExport}
              disabled={rowCount === 0}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",

                padding: "8px 14px",

                border: "1px solid var(--border)",
                borderRadius: "10px",

                background: "#ffffff",

                cursor: rowCount === 0 ? "not-allowed" : "pointer",

                opacity: rowCount === 0 ? 0.5 : 1,

                transition: ".2s",
              }}
            >
              <Download size={18} />
              Export CSV
            </button>

            {rowCount > 0 && (
              <span
                style={{
                  fontSize: ".9rem",

                  color: "var(--text-secondary)",

                  background: "#F3F4F6",

                  padding: "6px 12px",

                  borderRadius: "999px",

                  fontWeight: 600,
                }}
              >
                {rowCount} {rowCount === 1 ? "row" : "rows"}
              </span>
            )}
          </div>
        </div>

        {/* ===========================
            Empty State
        =========================== */}

        {rowCount === 0 ? (
          <div
            style={{
              textAlign: "center",

              padding: "50px 20px",

              color: "var(--text-secondary)",
            }}
          >
            <Database
              size={48}
              style={{
                marginBottom: "16px",

                opacity: 0.6,
              }}
            />

            <h3
              style={{
                marginBottom: "8px",
              }}
            >
              No Results
            </h3>

            <p>Run a query to display data from the database.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  {Object.keys(results[0]).map((key) => (
                    <th key={key}>{key.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {results.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                      <td key={colIndex}>{String(value)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Toast
        show={showToast}
        type="success"
        message="CSV exported successfully!"
      />
    </>
  );
}

export default ResultsTable;
