import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(utc);

export default dayjs;

export const formatIncindentTime = (date: string) => {
  return dayjs(date).format("ddd, MMM D, YYYY h:mm A");
};
