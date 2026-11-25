import { Router } from "express";
import { booksController } from "./books.controller";

const router = Router();

router.post('/',booksController.createBook)

export const booksRoute = router;