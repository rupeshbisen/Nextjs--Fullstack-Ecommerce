import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address.model";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export async function DELETE(req: Request) {
    try {

        await connectToDB();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Address id is required"
            })
        }

        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {

            const deletedAddress = await Address.findByIdAndDelete(id);
            if (deletedAddress) {
                return NextResponse.json({
                    success: true,
                    message: "Address deleted successfully"
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to delete address ! Please try again later"
                })
            }

        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Somthing went wrong ! Plaese try again later",
        })
    }
}