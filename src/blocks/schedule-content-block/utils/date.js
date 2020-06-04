export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  };
  const language = navigator.language || "en-US";
  const dateFormated = new Intl.DateTimeFormat(language, options).format(date);
  return dateFormated.replace(",", "");
}

export function getTimestamp(date) {
  return new Date(date).getTime();
}
