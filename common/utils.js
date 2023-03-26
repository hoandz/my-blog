import crypto from "crypto";
import jwt from "jsonwebtoken";
const generateSecretKey = () => {
  //   return crypto.randomBytes(32).toString("hex");
  return "123123";
};

const createToken = (payload, secretKey, expiresIn) => {
  return jwt.sign(payload, secretKey, expiresIn);
};

const decryption = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  let info = {};
  jwt.verify(token, generateSecretKey(), (err, decoded) => {
    if (err) {
      info = false;
    }
    info = decoded;
  });
  return info;
};

export { generateSecretKey, createToken, decryption };
