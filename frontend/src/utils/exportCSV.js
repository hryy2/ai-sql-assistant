export function exportCSV(data, fileName = "results.csv") {
  if (!data || data.length === 0) {
    return;
  }

  // Get column names
  const headers = Object.keys(data[0]);

  // Convert rows to CSV format
  const rows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header] ?? "";

        // Escape quotes
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(","),
  );

  // Combine header and rows
  const csvContent = [headers.join(","), ...rows].join("\n");

  // Create Blob
  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}