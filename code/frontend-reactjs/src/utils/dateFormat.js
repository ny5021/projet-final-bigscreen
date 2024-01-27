import format from "date-fns/format";

export const dateFormatTostring = (date) => {
  const dt = new Date(date);
  return format(dt, "dd-MM-yyyy à HH:mm");
};
