import mongoose from "mongoose";
mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("connect hihihi ");
    return connection;
  } catch (error) {
    console.log("error", error);
  }
};

export default connect;
