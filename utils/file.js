export const readDataFile = files => new Promise((res, rej) => {
  const reader = new FileReader();
  reader.onloadend = ({ target }) =>
    target.error
      ? rej(target.error)
      : res(target.result);
    reader.readAsText(files[0]);
});
