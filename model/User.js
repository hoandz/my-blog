import mongoose, { Schema } from "mongoose";
export default mongoose.model(
  "User",
  new Schema({
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      default: mongoose.Types.ObjectId,
    },
    name: {
      type: String, // kiểu dữ liệu của trường name là String
      required: true, // bắt buộc phải có trường name
      validate: {
        validator: (value) => value.length > 3,
        message: "Username must be at least 3 characters",
      },
    },
    password: {
      type: String, // kiểu dữ liệu của trường name là String
      required: true, // bắt buộc phải có trường name
      validate: {
        validator: (value) => value.length > 3,
        message: "Password must be at least 3 characters",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true, // bắt buộc phải có trường email
      validate: {
        validator: function (v) {
          // Kiểm tra định dạng email
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) =>
          `${props.value} không phải là một địa chỉ email hợp lệ!`,
      },
    },
  })
);
