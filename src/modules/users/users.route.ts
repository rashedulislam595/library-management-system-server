import { Router } from "express";
import { usersController } from "./users.controller";

const router = Router();

router.get('/',usersController.getAllUsers);
router.get('/:id',usersController.getSingleUser);
router.put('/:id',usersController.updateUser);
router.delete('/:id',usersController.deleteUser)


export const userRoute = router;