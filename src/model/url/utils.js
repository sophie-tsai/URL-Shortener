const Url = require('./url');

const randomString = () => {
  const length = 6;
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

const generateToken = () => {
  let token = randomString();
  while (!isTokenUnique(token)) {
    token = randomString();
  }
  return token;
};

const isTokenUnique = async (token) => {
  const tokenQuery = await Url.find({ token: token }).lean().exec();
  if (tokenQuery.length === 0) {
    return true;
  }
  return false;
};

module.exports = generateToken;
