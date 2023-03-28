import { User } from "../model/index.js";
const login = async (data) => {
  console.log("Login");
};

const register = async (data) => {
  const { email, password, name } = data;
  let exister = await User.findOne({ email }).exec();
  if (!!exister) {
    return { exister: true, error: "User already exists" };
  }
  const newUser = await User.create({ name, email, password });
  return newUser;
};

export default {
  login,
  register,
};
