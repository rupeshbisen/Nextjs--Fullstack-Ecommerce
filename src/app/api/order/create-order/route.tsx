import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart.model";
import Order from "@/models/order.model";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {
            const data = await req.json();
            const { user } = data

            const saveNewOrder = await Order.create(data);

            if (saveNewOrder) {
                await Cart.deleteMany({ userID: user })

                return NextResponse.json({
                    success: true,
                    message: 'Products are on the way !'
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to create a order ! Please try again"
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