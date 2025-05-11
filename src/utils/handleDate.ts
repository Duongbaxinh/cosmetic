interface UserDateParts {
  day: string | number;
  month: string | number;
  year: string | number;
}

export function formatUserBirthday({
  day,
  month,
  year,
}: UserDateParts): string {
  const dayFormat = String(day).padStart(2, "0");
  const monthFormat = String(month).padStart(2, "0");
  const yearFormat = String(year);

  if (
    !/^\d{4}$/.test(yearFormat) ||
    !/^\d{2}$/.test(monthFormat) ||
    !/^\d{2}$/.test(dayFormat)
  ) {
    throw new Error("Invalid date input");
  }

  return `${year}-${month}-${day}`;
}
