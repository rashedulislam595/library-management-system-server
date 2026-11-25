import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { booksService } from "./books.service";
import { Result } from "pg";

const createBook = async (req: Request, res: Response) => {
    try {
        const result = await booksService.createBookIntoDB(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Book created successfully!!",
            data: result.rows[0]
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
}

const getAllBooks = async (req: Request, res: Response) => {
    try {
        const result = await booksService.getAllBooksIntoDB()
        sendResponse(res,{
            statusCode:200,
            success:true,
            message:"Books retrieve successfully!!",
            data:result.rows
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

const getBook = async(req:Request, res:Response)=>{
    try {
        const {id} = req.params
        const result = await booksService.getBook(id as string)
        
        if(result.rowCount === 0){
            return sendResponse(res,{
                statusCode:404,
                success:false,
                message:"book not found!!"
            })
        }

        sendResponse(res,{
            statusCode:200,
            success:true,
            message:"Book retrieve successfully!!",
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
    getAllBooks,
    getBook
}