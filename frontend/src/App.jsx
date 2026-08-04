import { useState } from "react";

import Header from "./components/Header";
import QueryInput from "./components/QueryInput";
import SQLViewer from "./components/SQLViewer";
import ResultsTable from "./components/ResultsTable";
import AISummary from "./components/AISummary";
import ChartPanel from "./components/ChartPanel";
import ChartInsight from "./components/ChartInsight";

import api from "./services/api";

import "./styles/layout.css";

function App() {

  // State
  const [question, setQuestion] = useState("");
  const [sql, setSql] = useState("");
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");
  const [showInsight, setShowInsight] = useState(false);

  // Query History
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("queryHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Save History
  const saveHistory = (query) => {
    if (!query.trim()) return;
    const updatedHistory = [
      query,
      ...history.filter((item) => item !== query),
    ].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem("queryHistory", JSON.stringify(updatedHistory));
  };

  // Clear History
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("queryHistory");
  };

  // Ask AI
  const handleAskAI = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError("");
    setSummary(null);
    setShowInsight(false);

    try {
      const response = await api.post("/query", {
        question,
      });
      setSql(response.data.sql);
      setResults(response.data.results || []);
      setSummary(response.data.summary || null);
      saveHistory(question);
    } catch (err) {
      console.error(err);
      setError("Unable to process your request.");
    } finally {
      setLoading(false);
    }
  };

  // Export AI Executive Report
  const handleExportReport = async () => {
    if (!summary) {
      return;
    }
    setExporting(true);

    try {
      const response = await api.post(
        "/report",
        {
          question,
          sql,
          results,
          summary,
        },
        {
          responseType: "blob",
        },
      );

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "AI_Executive_Report.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);

      alert("Failed to export report.");
    } finally {
      setExporting(false);
    }
  };

  // UI
  return (
    <div className="container">
      <Header />
      <QueryInput
        question={question}
        setQuestion={setQuestion}
        handleAskAI={handleAskAI}
        loading={loading}
        history={history}
        clearHistory={clearHistory}
      />

      {error && (
        <div
          className="card"
          style={{
            background: "#FEF2F2",
            border: "1px solid #FCA5A5",
            color: "#B91C1C",
            marginBottom: "32px",
          }}
        >
          {error}
        </div>
      )}

      <SQLViewer sql={sql} />
      <ResultsTable results={results} />
      <AISummary summary={summary} />
      <ChartPanel
        summary={summary}
        results={results}
        question={question}
        onShowInsight={() => setShowInsight(true)}
      />
      {showInsight && <ChartInsight chartInsight={summary?.chart_insight} />}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
          marginBottom: "50px",
        }}
      >
        <button
          onClick={handleExportReport}
          disabled={!summary || exporting}
          style={{
            background: "#0F172A",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "12px",
            padding: "14px 30px",
            fontSize: "15px",
            fontWeight: 600,
            cursor: summary ? "pointer" : "not-allowed",
            opacity: summary ? 1 : 0.5,
            transition: "0.25s",
            boxShadow: "0 6px 18px rgba(15,23,42,0.15)",
          }}
          onMouseEnter={(e) => {
            if (summary) {
              e.currentTarget.style.background = "#1E293B";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#0F172A";
          }}
        >
          {exporting ? "Generating Report..." : "📄 Export AI Executive Report"}
        </button>
      </div>
    </div>
  );
}

export default App;