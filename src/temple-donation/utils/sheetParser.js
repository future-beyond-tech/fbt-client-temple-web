export function parseAmount(value) {
  const cleaned = String(value).replace(/[^\d.]/g, "");
  if (!cleaned) return null;

  const numeric = Number(cleaned);
  return Number.isFinite(numeric) ? numeric : null;
}

export function parseSheetCSV(csvText) {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return [];

  const parseRow = (line) => {
    const result = [];
    let inQuotes = false;
    let current = "";

    for (let ci = 0; ci < line.length; ci += 1) {
      if (line[ci] === '"') {
        inQuotes = !inQuotes;
      } else if (line[ci] === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += line[ci];
      }
    }

    result.push(current.trim());
    return result;
  };

  const headers = parseRow(lines[0]).map((header) =>
    header.toLowerCase().replace(/"/g, "")
  );
  const statusIndex = headers.findIndex(
    (header) =>
      header.includes("status") ||
      header.includes("paid") ||
      header.includes("payment") ||
      header.includes("स्थिति") ||
      header.includes("deposited")
  );

  const rows = [];
  for (let rowIndex = 1; rowIndex < lines.length; rowIndex += 1) {
    const columns = parseRow(lines[rowIndex]);
    const name = columns[2]?.replace(/"/g, "").trim();
    if (!name) continue;

    const amount = columns[5]?.replace(/"/g, "").trim() || "";
    const rawStatus =
      statusIndex >= 0
        ? columns[statusIndex]?.replace(/"/g, "").trim().toLowerCase()
        : "";
    const isPaid =
      statusIndex < 0 ||
      ["paid", "yes", "confirmed", "deposited", "done", "हाँ", "जमा"].some(
        (keyword) => rawStatus.includes(keyword)
      );

    rows.push({ name, amount, isPaid });
  }

  return rows;
}
