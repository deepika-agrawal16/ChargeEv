import pkg from 'jsonwebtoken';
const { sign } = pkg;

const generateToken = (userId) => {
  return sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

export default generateToken;