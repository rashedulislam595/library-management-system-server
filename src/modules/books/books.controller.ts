import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { booksService } from "./books.service";

const createBook = async(req:Request, res:Response)=>{
try {
    const result = await booksService.createBookIntoDB(req.body);
    sendResponse(res,{
        statusCode:201,
        success:true,
        message:"Book created successfully!!",
        data:result.rows[0]
    })
} catch (error:any) {
    sendResponse(res,{
        statusCode:500,
        success:false,
        message:error.message,
        error:error
    })
}
}

export const booksController = {
    createBook,
}