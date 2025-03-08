const isValidDate = (date) => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/;
  if (!regex.test(date)) return false;
  const [day, month, year] = date.split(".").map(Number);
  const parsedDate = new Date(year, month - 1, day);
  return (
    parsedDate.getDate() === day &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getFullYear() === year
  );
};

export default isValidDate;
