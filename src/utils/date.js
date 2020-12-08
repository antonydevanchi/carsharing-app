const date = new Date();
export const displayDate = `${date.getDate()}.${
  date.getMonth() + 1
}.${date.getFullYear()} ${parseInt(date.getHours() + 1)}:00`;
