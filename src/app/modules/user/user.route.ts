import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";
//destructure controllers
const { addUser } = userController;
//destructure validations
const { addUserValidationSchema } = userValidation;

const router = express.Router();

router.post("/add-user", validateRequest(addUserValidationSchema), addUser);

export const userRoute = router;
