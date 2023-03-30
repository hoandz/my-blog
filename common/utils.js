import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
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

const sendMail = async (password) => {
  let transporter = nodemailer.createTransport({
    // config mail server
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_NAME, //Tài khoản gmail vừa tạo
      pass: process.env.PASS_MAIL, //Mật khẩu tài khoản gmail vừa tạo
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  let content = "";
  content += `
    <div style="padding: 10px; background-color: #003375">
        <div style="padding: 10px; background-color: white;">
            <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
            <span style="color: black">Đây là mật khẩu vừa đổi: ${password}</span>
        </div>
    </div>
`;
  let mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: process.env.MAIL_NAME,
    to: "hoantran.us@gmail.com",
    subject: "Test Nodemailer",
    text: "Your text is here", //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
    html: content, //Nội dung html mình đã tạo trên kia :))
  };
  const result = await transporter.sendMail(mainOptions);
  console.log("result", result);

  return result;
};

export { generateSecretKey, createToken, decryption, sendMail };
