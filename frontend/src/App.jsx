import { useState } from "react";

import Header from "./components/Header";
import QueryInput from "./components/QueryInput";
import SQLViewer from "./components/SQLViewer";
import ResultsTable from "./components/ResultsTable";

import api from "./services/api";

import "./styles/layout.css";

function App() {
  // ============================
  // State
  // ============================

  const [question, setQuestion] = useState("");

  const [sql, setSql] = useState("");

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // Recent Query History
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("queryHistory");

    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // ============================
  // Load History
  // ============================

  // ============================
  // Save History
  // ============================

  const saveHistory = (query) => {
    if (!query.trim()) return;

    const updatedHistory = [
      query,
      ...history.filter((item) => item !== query),
    ].slice(0, 5);

    setHistory(updatedHistory);

    localStorage.setItem("queryHistory", JSON.stringify(updatedHistory));
  };

  // ============================
  // Clear History
  // ============================

  const clearHistory = () => {
    setHistory([]);

    localStorage.removeItem("queryHistory");
  };

  // ============================
  // Ask AI
  // ============================

  const handleAskAI = async () => {
    if (!question.trim()) return;

    setLoading(true);

    setError("");

    try {
      const response = await api.post("/query", {
        question,
      });

      setSql(response.data.sql);

      setResults(response.data.results);

      // Save successful query
      saveHistory(question);
    } catch (err) {
      console.error(err);

      setError("Unable to generate SQL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // UI
  // ============================

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
    </div>
  );
}

export default App;
