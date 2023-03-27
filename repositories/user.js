import { User } from "../model/index.js";
import bcrypt from "bcrypt";
const login = async (data) => {
  console.log("Login");
};

const register = async (data) => {
  const { email, password, name } = data;
  let exister = await User.findOne({ email }).exec();
  if (!!exister) {
    console.log("user exists");
  }
  // const isMatched = await bcrypt.compare(password, existingUser.password);
  // if (!!isMatched) {

  // }
  const hashedPass = await bcrypt.hash(password);
  const newUser = await User.create({ name, email, password: hashedPass });
  return newUser;
};

export default {
  login,
  register,
};
