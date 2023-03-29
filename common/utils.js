import crypto from "crypto";
import jwt from "jsonwebtoken";
const generateSecretKey = () => {
  //   return crypto.randomBytes(32).toString("hex");
  return "123123";
};

const createToken = (payload, expiresIn) => {
  return jwt.sign(payload, generateSecretKey(), { expiresIn });
};

const decryption = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!!token) {
    let info = {};
    jwt.verify(token, generateSecretKey(), (err, decoded) => {
      if (err) {
        info = false;
      }
      info = decoded;
    });
    return info;
  }
  return false;
};

export { generateSecretKey, createToken, decryption };
