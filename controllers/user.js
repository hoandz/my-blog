import { validationResult } from "express-validator";
import _ from "lodash";
import response from "../common/response.js";
import { decryption } from "../common/utils.js";
import { userRepositories } from "../repositories/index.js";

const login = async (req, res) => {
  try {
    const { body } = req;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return response.badRequest(res, errors.array());
    }
    const data = await userRepositories.login(body);

    if (data ?? false) {
      response.success(res, data, "Login successfully!");
    } else {
      response.forbidden(res, "Incorrect password or email!");
    }
  } catch (error) {
    if (error.code === "USER_NOT_FOUND") {
      return response.forbidden(res, "User not found!");
    }
    if (error.code === "INCORRECT_PASSWORD") {
      return response.forbidden(res, "Incorrect password!");
    }
    return response.serverError(res, error.message);
  }
};

const register = async (req, res) => {
  try {
    const user = await userRepositories.register(req.body);
    if (user?.exister) {
      response.forbidden(res, user?.error);
    } else {
      const { email, name } = user;
      response.success(res, { email, name });
    }
  } catch (error) {
    return response.badRequest(res);
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!decryption(req)) {
    response.forbidden(res, "Invalid value");
    return;
  }
  if (currentPassword === newPassword) {
    response.forbidden(
      res,
      "The new password cannot be the same as the old password!"
    );
    return;
  }
  const user = await userRepositories.changePassword(req.body);
  if (user) {
    response.success(res, user, "Update successfully!");
    return;
  } else {
    response.forbidden(res, "Incorrect password or email!");
    return;
  }
};

const decryptions = async (req, res) => {
  if (!decryption(req)) {
    response.forbidden(res, "Invalid value");
  } else {
    response.success(res, _.omit(decryption(req), ["iat", "exp"]));
  }
};

export default {
  login,
  register,
  decryptions,
  changePassword,
};
