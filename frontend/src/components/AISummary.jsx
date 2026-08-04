import {
  Brain,
  Lightbulb,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

function Section({
  icon,
  title,
  children,
}) {
  return (
    <section
      style={{
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        {icon}

        <h3
          style={{
            margin: 0,
            color: "#0F172A",
            fontSize: "1.1rem",
            fontWeight: 600,
          }}
        >
          {title}
        </h3>
      </div>

      {children}
    </section>
  );
}

function AISummary({ summary }) {
  if (!summary) return null;

  return (
    <div className="card">

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <Brain
          size={28}
          color="#2563EB"
        />

        <h2
          style={{
            margin: 0,
          }}
        >
          AI Analysis
        </h2>
      </div>

      {/* Summary */}
      <Section
        icon={
          <CheckCircle2
            size={20}
            color="#2563EB"
          />
        }
        title="Summary"
      >
        <p
          style={{
            margin: 0,
            color: "#475569",
            lineHeight: 1.8,
          }}
        >
          {summary.summary}
        </p>
      </Section>

      {/* Key Findings */}
      {summary.key_findings?.length > 0 && (
        <Section
          icon={
            <Lightbulb
              size={20}
              color="#2563EB"
            />
          }
          title="Key Findings"
        >
          <ul
            style={{
              margin: 0,
              paddingLeft: "22px",
              color: "#475569",
              lineHeight: 1.9,
            }}
          >
            {summary.key_findings.map(
              (item, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </Section>
      )}

      {/* Business Insight */}
      {summary.business_insight && (
        <Section
          icon={
            <Brain
              size={20}
              color="#2563EB"
            />
          }
          title="Business Insight"
        >
          <div
            style={{
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "18px",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#475569",
                lineHeight: 1.8,
              }}
            >
              {summary.business_insight}
            </p>
          </div>
        </Section>
      )}

      {/* Recommended Visualization */}
      {(summary.recommended_chart_type ||
        summary.recommended_chart_reason) && (
        <Section
          icon={
            <BarChart3
              size={20}
              color="#2563EB"
            />
          }
          title="Recommended Visualization"
        >
          {summary.recommended_chart_type && (
            <div
              style={{
                display: "inline-block",
                background: "#DBEAFE",
                color: "#1D4ED8",
                padding: "8px 16px",
                borderRadius: "999px",
                fontWeight: 600,
                marginBottom: "18px",
                textTransform: "capitalize",
              }}
            >
              {summary.recommended_chart_type} Chart
            </div>
          )}

          {summary.recommended_chart_reason && (
            <p
              style={{
                margin: 0,
                color: "#475569",
                lineHeight: 1.8,
              }}
            >
              {summary.recommended_chart_reason}
            </p>
          )}
        </Section>
      )}
    </div>
  );
}

export default AISummary;