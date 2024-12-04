import {Router} from 'express';
import { LoginController} from "../controllers/loginController.js";

const LoginRouter = Router();

LoginRouter.post("/login", LoginController.Login);
LoginRouter.get("/logout/:id", LoginController.Logout);
LoginRouter.post("/reset_password/", LoginController.RecuperarContrasena);

export default LoginRouter;