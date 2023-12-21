import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order.model";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';


export async function GET(req: Request) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');

            const extractAllOrder = await Order.find({ user: id }).populate('orderItems.product')

            if (extractAllOrder) {
                return NextResponse.json({
                    success: true,
                    data: extractAllOrder
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to get all orders ! Please try again"
                })
            }

        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authenticated"
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again"
        })
    }
}