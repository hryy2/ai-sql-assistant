import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

import { BarChart3 } from "lucide-react";

import {
  formatLabel,
  formatTooltipValue,
  formatQuestionTitle,
  formatValue,
} from "../utils/chartUtils";

const COLORS = ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"];

function ChartPanel({ summary, results, question, onShowInsight }) {
  if (!summary) return null;

  if (!results || results.length === 0) return null;

  const chartType = summary.recommended_chart_type;
  const xKey = summary.x_axis;
  const yKey = summary.y_axis;

  if (!xKey || !yKey) {
    return (
      <div className="card">
        <h2>AI Visualization</h2>

        <p
          style={{
            color: "#64748B",
          }}
        >
          AI could not determine suitable chart axes for this query.
        </p>
      </div>
    );
  }

  // Render Chart
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={420}>
            <BarChart data={results}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey={xKey}
                tick={{
                  fontSize: 13,
                }}
              />

              <YAxis
                tickFormatter={(value) => formatValue(value)}
                tick={{
                  fontSize: 13,
                }}
              />

              <Tooltip
                formatter={(value) => [
                  formatTooltipValue(value, yKey),
                  formatLabel(yKey),
                ]}
              />

              <Legend formatter={(value) => formatLabel(value)} />

              <Bar
                dataKey={yKey}
                fill="#2563EB"
                radius={[8, 8, 0, 0]}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={420}>
            <LineChart data={results}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey={xKey}
                tick={{
                  fontSize: 13,
                }}
              />

              <YAxis
                tickFormatter={(value) => formatValue(value)}
                tick={{
                  fontSize: 13,
                }}
              />

              <Tooltip
                formatter={(value) => [
                  formatTooltipValue(value, yKey),
                  formatLabel(yKey),
                ]}
              />

              <Legend formatter={(value) => formatLabel(value)} />

              <Line
                type="monotone"
                dataKey={yKey}
                stroke="#2563EB"
                strokeWidth={3}
                dot={{
                  r: 4,
                }}
                activeDot={{
                  r: 7,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={420}>
            <PieChart>
              <Pie
                data={results}
                dataKey={yKey}
                nameKey={xKey}
                outerRadius={145}
                label
              >
                {results.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [
                  formatTooltipValue(value, yKey),
                  formatLabel(yKey),
                ]}
              />

              <Legend formatter={(value) => formatLabel(value)} />
            </PieChart>
          </ResponsiveContainer>
        );
      case "scatter":
        if (
          typeof results[0][xKey] !== "number" ||
          typeof results[0][yKey] !== "number"
        ) {
          return (
            <div
              style={{
                height: 420,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#64748B",
              }}
            >
              Scatter chart requires numeric X and Y axes.
            </div>
          );
        }

        return (
          <ResponsiveContainer width="100%" height={420}>
            <ScatterChart>
              <CartesianGrid />

              <XAxis type="number" dataKey={xKey} />

              <YAxis
                type="number"
                dataKey={yKey}
                tickFormatter={(value) => formatValue(value)}
              />

              <Tooltip
                formatter={(value) => [
                  formatTooltipValue(value, yKey),
                  formatLabel(yKey),
                ]}
              />

              <Legend formatter={(value) => formatLabel(value)} />
              <Scatter data={results} fill="#2563EB" />
            </ScatterChart>
          </ResponsiveContainer>
        );

      case "map":
        return (
          <div
            style={{
              height: 420,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#64748B",
              fontSize: "18px",
            }}
          >
            🌍 Interactive Map (Coming Soon)
          </div>
        );

      default:
        return (
          <div
            style={{
              height: 420,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#64748B",
            }}
          >
            No suitable visualization available.
          </div>
        );
    }
  };

  return (
    <div className="card">
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "18px",
        }}
      >
        <BarChart3 size={28} color="#2563EB" />

        <h2
          style={{
            margin: 0,
          }}
        >
          AI Visualization
        </h2>
      </div>

      {/* Chart Title */}
      {question && (
        <h3
          style={{
            marginTop: 0,
            marginBottom: "14px",
            color: "#0F172A",
            fontWeight: 600,
            fontSize: "1.15rem",
          }}
        >
          {formatQuestionTitle(question)}
        </h3>
      )}

      {/* Recommendation */}
      {summary.recommended_chart_reason && (
        <p
          style={{
            color: "#64748B",
            lineHeight: 1.7,
            marginBottom: "28px",
          }}
        >
          {summary.recommended_chart_reason}
        </p>
      )}

      {/* Chart */}
      {renderChart()}

      {/* AI Insight Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "28px",
          paddingTop: "24px",
          borderTop: "1px solid #E2E8F0",
        }}
      >
        <button
          onClick={onShowInsight}
          style={{
            background: "#2563EB",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "10px",
            padding: "12px 22px",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 12px rgba(37,99,235,0.15)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#1D4ED8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#2563EB";
          }}
        >
          ✨ Show AI Business Insights
        </button>
      </div>
    </div>
  );
}

export default ChartPanel;