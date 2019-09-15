module.exports = () => {
  const b62 = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let url = "";

  for (let i = 0; i < 7; i++) {
    url = url + b62[Math.floor(Math.random() * b62.length)];
  }

  return url;
};
