export const uniqueArray = (a) => {
  const result = [...new Set(a.map((o) => JSON.stringify(o)))].map((s) =>
    JSON.parse(s)
  );
  return result;
};

export const uniqueArrayWithFilter = (array, value) => {
  const convertArray = array.map((el) => JSON.stringify(el));
  console.log(
    !convertArray.filter((el) => el == JSON.stringify(value)).length == 0
  );
  if (convertArray.filter((el) => el == JSON.stringify(value)).length == 0)
    array.push(value);
};
