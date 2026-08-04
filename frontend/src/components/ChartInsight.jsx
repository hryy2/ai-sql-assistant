import {
  TrendingUp,
  Search,
  Briefcase,
} from "lucide-react";

function InsightCard({
  icon,
  title,
  content,
}) {
  return (
    <div
      style={{
        background: "#F8FAFC",
        border: "1px solid #E2E8F0",
        borderRadius: "14px",
        padding: "20px",
        marginBottom: "18px",
        transition: "all .2s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "14px",
        }}
      >
        {icon}

        <h3
          style={{
            margin: 0,
            color: "#0F172A",
            fontWeight: 600,
            fontSize: "1.05rem",
          }}
        >
          {title}
        </h3>
      </div>

      <p
        style={{
          margin: 0,
          color: "#475569",
          lineHeight: 1.8,
        }}
      >
        {content || "No insight available."}
      </p>
    </div>
  );
}

function ChartInsight({ chartInsight }) {
  if (!chartInsight) return null;

  return (
    <div className="card">
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "28px",
        }}
      >
        <Briefcase
          size={28}
          color="#2563EB"
        />

        <h2
          style={{
            margin: 0,
          }}
        >
          AI Business Insights
        </h2>
      </div>

      {/* Trend */}
      <InsightCard
        icon={
          <TrendingUp
            size={20}
            color="#2563EB"
          />
        }
        title="Trend"
        content={chartInsight.trend}
      />

      {/* Possible Reason */}
      <InsightCard
        icon={
          <Search
            size={20}
            color="#2563EB"
          />
        }
        title="Possible Reason"
        content={chartInsight.possible_reason}
      />

      {/* Recommendation */}
      <InsightCard
        icon={
          <Briefcase
            size={20}
            color="#2563EB"
          />
        }
        title="Business Recommendation"
        content={
          chartInsight.business_recommendation
        }
      />
    </div>
  );
}

export default ChartInsight;