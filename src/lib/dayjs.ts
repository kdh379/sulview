import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export function formatDate(date: Date) {
  const now = dayjs();
  const inputDate = dayjs(date);
  const diffDays = now.diff(inputDate, "day");

  if (diffDays < 7) {
    return inputDate.fromNow();
  } else {
    return inputDate.format("YYYY-MM-DD");
  }
}