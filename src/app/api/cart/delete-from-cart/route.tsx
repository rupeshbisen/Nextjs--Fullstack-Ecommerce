import connectToDB from "@/database"
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart.model";
import { NextResponse } from "next/server"


export const dynamic = 'force-dynamic'

export async function DELETE(req: Request) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');

            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: 'Cart id is required'
                })
            }

            const deleteCartItem = await Cart.findByIdAndDelete(id);
            if (deleteCartItem) {
                return NextResponse.json({
                    success: true,
                    message: 'Cart item deleted successfully'
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'Failed to delete Cart item ! Please try again '
                })
            }

        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authenticated",
            })
        }

    } catch (e) {
        console.log(e)
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later"

        })
    }
}