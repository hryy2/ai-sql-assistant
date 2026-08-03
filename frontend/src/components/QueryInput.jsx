import { MessageSquare, Sparkles, History } from "lucide-react";
import { Trash2 } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

const EXAMPLES = [
  "Show all locations",
  "Show the top 10 highest temperatures",
  "Find the average rainfall by location",
];

function QueryInput({
  question,
  setQuestion,
  handleAskAI,
  loading,
  history,
  clearHistory,
}) {
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault();

      if (!loading) {
        handleAskAI();
      }
    }
  };

  return (
    <div className="card">
      {/* ===========================
          Header
      =========================== */}

      <h2
        className="section-title"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <MessageSquare size={22} />
        Ask a Question
      </h2>

      {/* ===========================
          Textarea
      =========================== */}

      <textarea
        className="input-area"
        placeholder="Ask a question about your electricity and weather data..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* ===========================
          Helper
      =========================== */}

      <div
        style={{
          marginTop: "12px",
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
        }}
      >
        Tip: Press <strong>Ctrl + Enter</strong> to generate SQL.
      </div>

      {/* ===========================
          Example Queries
      =========================== */}

      <div
        style={{
          marginTop: "22px",
        }}
      >
        <div
          style={{
            fontSize: "0.9rem",
            fontWeight: 600,
            marginBottom: "10px",
            color: "var(--text-secondary)",
          }}
        >
          Try an example
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              disabled={loading}
              onClick={() => setQuestion(example)}
              style={{
                border: "1px solid var(--border)",
                background: "#ffffff",
                borderRadius: "999px",
                padding: "8px 14px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "0.9rem",
                transition: "all .2s ease",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* ===========================
          Recent Queries
      =========================== */}

      {history.length > 0 && (
        <div
          style={{
            marginTop: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",

              marginBottom: "12px",

              color: "var(--text-secondary)",

              fontWeight: 600,

              fontSize: ".9rem",
            }}
          >
            <History size={18} />
            Recent Queries
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {history.map((item, index) => (
              <button
                key={index}
                type="button"
                disabled={loading}
                onClick={() => setQuestion(item)}
                style={{
                  textAlign: "left",

                  padding: "10px 14px",

                  borderRadius: "10px",

                  border: "1px solid var(--border)",

                  background: "#FAFAFA",

                  cursor: loading ? "not-allowed" : "pointer",

                  transition: ".2s",

                  fontSize: ".92rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#EEF4FF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#FAFAFA";
                }}
              >
                {item}
              </button>
            ))}

            <button
              type="button"
              onClick={clearHistory}
              style={{
                marginTop: "12px",
                alignSelf: "flex-start",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: "none",
                background: "transparent",
                color: "#dc2626",
                cursor: "pointer",
                fontSize: ".9rem",
                fontWeight: 600,
                padding: 0,
              }}
            >
              <Trash2 size={16} />
              Clear History
            </button>
          </div>
        </div>
      )}

      {/* ===========================
          Submit Button
      =========================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "30px",
        }}
      >
        <button
          className="btn-primary"
          onClick={handleAskAI}
          disabled={loading || !question.trim()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {loading ? (
            <>
              <LoadingSpinner />
              Generating SQL...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate SQL
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default QueryInput;