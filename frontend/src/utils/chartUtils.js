// Format Database Column Name
export const formatLabel = (label = "") => {
  if (!label) return "";
  return label
    .replace(/_/g, " ")
    .replace(/\bgwh\b/gi, "GWh")
    .replace(/\bkw\b/gi, "kW")
    .replace(/\bkwh\b/gi, "kWh")
    .replace(/\bco2\b/gi, "CO₂")
    .replace(/\bavg\b/gi, "Average")
    .replace(/\bmin\b/gi, "Minimum")
    .replace(/\bmax\b/gi, "Maximum")
    .replace(/\btemp\b/gi, "Temperature")
    .replace(/\bhum\b/gi, "Humidity")
    .replace(/\bprecip\b/gi, "Precipitation")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// Detect Unit from Column Name
export const getUnit = (column = "") => {
  if (!column) return "";
  const key = column.toLowerCase();

  // Electricity
  if (
    key.includes("gwh") ||
    key.includes("mwh") ||
    key.includes("kwh")
  ) {
    return "GWh";
  }

  // Temperature
  if (
    key.includes("temp") ||
    key.includes("temperature")
  ) {
    return "°C";
  }

  // Humidity
  if (key.includes("humidity")) {
    return "%";
  }

  // Rainfall
  if (
    key.includes("rain") ||
    key.includes("precip")
  ) {
    return "mm";
  }

  // Wind
  if (
    key.includes("wind")
  ) {
    return "km/h";
  }

  // Price
  if (
    key.includes("price") ||
    key.includes("cost")
  ) {
    return "$";
  }

  return "";
};

// Format Question into Chart Title
export const formatQuestionTitle = (question = "") => {
  if (!question) return "";

  return question
    .replace(/^show\s+/i, "")
    .replace(/^display\s+/i, "")
    .replace(/^list\s+/i, "")
    .replace(/^find\s+/i, "")
    .replace(/^calculate\s+/i, "")
    .replace(/^compare\s+/i, "")
    .replace(/^get\s+/i, "")
    .replace(/^give me\s+/i, "")
    .replace(/^what is\s+/i, "")
    .replace(/^what are\s+/i, "")
    .replace(/\?$/, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// Format Numeric Value
export const formatValue = (value) => {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value !== "number") {
    return value;
  }

  return value.toFixed(2);
};

// Format Tooltip Value
export const formatTooltipValue = (
  value,
  columnName
) => {
  const formatted = formatValue(value);

  const unit = getUnit(columnName);

  return unit
    ? `${formatted} ${unit}`
    : formatted;
};