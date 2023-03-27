import express from "express";
import { body } from "express-validator";
import response from "../common/response.js";
import { userController } from "../controllers/index.js";
const router = express.Router();

// Gửi token cho client
router.get("/:id", (req, res) => {
  response.success(res, {});
});

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  userController.login
);

router.post("/register", userController.register);

router.post("/decryption", userController.decryptions);

export default router;
