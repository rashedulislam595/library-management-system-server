import { Router } from "express";
import { booksController } from "./books.controller";

const router = Router();

router.post('/',booksController.createBook);
router.get('/',booksController.getAllBooks);
router.get('/:id',booksController.getBook);
router.put('/:id',booksController.updateBook)

export const booksRoute = router;