import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default dayjs;

export const formatIncindentTime = (date: string) => {
  return dayjs(date).format("ddd, MMM D, YYYY h:mm A");
};
