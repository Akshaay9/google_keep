  import {userLogin,userRegistraion} from "../Controllers/UserLoginSignup.js"
 import express from "express";
const router = express.Router();

// post
// pubic
// user login
router.post("/login", userLogin);

// post
// pubic
// user signup
router.post("/signup", userRegistraion);

export default router;