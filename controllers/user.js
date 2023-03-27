import { validationResult } from "express-validator";
import _ from "lodash";
import response from "../common/response.js";
import { createToken, decryption, generateSecretKey } from "../common/utils.js";
import { userRepositories } from "../repositories/index.js";
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

const register = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return response.badRequest(res, errors.array());
  // }
  // call repositories
  const user = await userRepositories.register(req.body);
  console.log("user 12312321", user);
  // try {
  //   const user = await userRepositories.register(req.body);
  //   console.log("user 12312321", user);
  //   response.success(res, user);
  // } catch (error) {
  //   return response.badRequest(res);
  // }
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
  register,
  decryptions,
};
