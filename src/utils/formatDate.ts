import dayjs from "dayjs";

export function formatDate(date: string | undefined) {
  if (date) {
    return dayjs(date).format("DD/MM/YYYY");
  }
}
