import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order.model";
import { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";



export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        if ((isAuthUser as JwtPayload)?.role === "admin") {
            const getAllOrder = await Order.find({}).populate('orderItems.product').populate('user')
            if (getAllOrder) {
                return NextResponse.json({
                    success: true,
                    data: getAllOrder
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to fetch the orders ! Please try after some time"
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authorized"
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Somthing went wrong ! Please try again"
        })
    }
}