export const dates = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  if (
    start.getDate() == end.getDate() &&
    start.getMonth() == end.getMonth() &&
    start.getFullYear() == end.getFullYear()
  )
    return `${start.toDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeStyle: "full",
    })}, ${start.toLocaleTimeString("id-ID", {
      timeStyle: "short",
    })} - ${end.toLocaleTimeString("id-ID", { timeStyle: "short" })}`;
  else
    return `${start.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}, ${start.toLocaleTimeString("id-ID", {
      timeStyle: "short",
    })} - ${end.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}, ${end.toLocaleTimeString("id-ID", { timeStyle: "short" })}`;
};
