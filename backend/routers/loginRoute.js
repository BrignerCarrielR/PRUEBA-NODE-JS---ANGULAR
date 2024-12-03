import {Router} from 'express';
import { LoginController} from "../controllers/loginController.js";

const LoginRouter = Router();

LoginRouter.post("/login", LoginController.Login);
LoginRouter.get("/logout/:id", LoginController.Logout);

export default LoginRouter;