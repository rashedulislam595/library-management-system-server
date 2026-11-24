import { Router } from "express";
import { usersController } from "./users.controller";

const router = Router();

router.get('/',usersController.getAllUsers);
router.get('/:id',usersController.getSingleUser)


export const userRoute = router;