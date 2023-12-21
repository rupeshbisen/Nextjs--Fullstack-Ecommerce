import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart.model";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get("id");

            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: "Please login in"
                });
            }

            const extractAllCartItems = await Cart.find({ userID: id }).populate("productID");

            if (extractAllCartItems) {
                return NextResponse.json({
                    success: true,
                    data: extractAllCartItems
                });
            } else {
                return NextResponse.json({
                    success: false,
                    status: 204,
                    message: 'No Cart items are Found !'
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authenticated",
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Somthing went wrong ! Plaese try again later",
        })
    }
}