import { createToken, decryption, generateSecretKey } from "../common/utils.js";
import { body, validationResult } from "express-validator";
import response from "../common/response.js";
import _ from "lodash";
import { userRepositories } from "../repositories/index.js";
import { EventEmitter } from "node:events";
const login = async (req, res) => {
  // Tạo token
  const payload = req.body;
  const options = { expiresIn: "1h" };
  const token = createToken(payload, generateSecretKey(), options);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response.badRequest(res, errors.array());
  }
  // call repositories
  await userRepositories.login(req.body);
  response.success(res, { ...req.body, token });
};

const decryptions = async (req, res) => {
  if (!decryption(req)) {
    response.forbidden(res, "inValid value");
  } else {
    response.success(res, _.omit(decryption(req), ["iat", "exp"]));
  }
};

export default {
  login,
  decryptions,
};
