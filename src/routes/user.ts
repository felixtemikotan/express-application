import express from "express";
const router = express.Router();
import {
  RegisterUser,
  LoginUser,
  getUsers,
} from "../controller/userController";

router.post("/register", RegisterUser);
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
router.post("/login", LoginUser);
router.get("/allusers", getUsers);

export default router;
