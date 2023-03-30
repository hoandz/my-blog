import { User } from "../model/index.js";
import bcrypt from "bcrypt";
import { createToken, sendMail } from "../common/utils.js";
const login = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email }).exec();
  if (user) {
    const result = await bcrypt.compare(password, user?.password);
    if (result) {
      const token = createToken(data, "1h");
      return {
        email: user?.email,
        name: user?.name,
        id: user?._id,
        token,
      };
    }
  }
};

const register = async (data) => {
  const { email, password, name } = data;
  let exister = await User.findOne({ email }).exec();

  if (!!exister) {
    return { exister: true, error: "User already exists" };
  }
  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hash,
  });
  return newUser;
};

const changePassword = async (data) => {
  const { email, currentPassword, newPassword } = data;
  const user = await User.findOne({ email }).exec();
  if (user) {
    const result = await bcrypt.compare(currentPassword, user?.password);
    if (result) {
      const hashPass = await bcrypt.hash(newPassword, 10);
      user.password = hashPass ?? user.password;
      await user.save();

      await sendMail(user._doc.password);
      delete user._doc.password;
      return user;
    }
  }
  return;
};

export default {
  login,
  register,
  changePassword,
};
