import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { usersService } from "./users.service";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await usersService.getAllUsersIntoDB()

        sendResponse(res,{
            statusCode:200,
            success:true,
            message:"Users Retrieve Successfully!!",
            data: result
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

const getSingleUser = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        const result = await usersService.getSingleUserIntoDB(id as string)
        sendResponse(res,{
            statusCode:200,
            success:true,
            message:"User retrieve successfully!!",
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

const updateUser = async(req:Request,res:Response)=>{
try {
    const {id} = req.params;
    const result = await usersService.updateUserIntoDB(req.body,id as string);

    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"User updated successfully!!",
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

export const usersController = {
    getAllUsers,
    getSingleUser,
    updateUser
}