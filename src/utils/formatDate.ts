export function formatDate(
  date: string,
  format: "full" | "date-only" | "time-only" = "full"
): string {
  if (!date) {
    return "Invalid Date";
  }

  const dateObject = new Date(date);

  // Periksa apakah objek Date valid
  if (isNaN(dateObject.getTime())) {
    return "Invalid Date";
  }

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Jakarta",
  };

  switch (format) {
    case "date-only":
      options.year = "numeric";
      options.month = "long";
      options.day = "numeric";
      break;
    case "time-only":
      options.hour = "2-digit";
      options.minute = "2-digit";
      options.second = "2-digit";
      break;
    case "full":
    default:
      options.year = "numeric";
      options.month = "long";
      options.day = "numeric";
      options.hour = "2-digit";
      options.minute = "2-digit";
      options.second = "2-digit";
      break;
  }

  const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(
    dateObject
  );
  return formattedDate;
}
