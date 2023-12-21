import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address.model";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';

export async function PUT(req: Request) {
    try {

        await connectToDB();

        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {
            const data = await req.json();
            const { _id, fullName, address, city, country, postalCode, } = data

            const updateAddress = await Address.findOneAndUpdate({
                _id: _id
            }, { fullName, address, city, country, postalCode }, { new: true })

            if (updateAddress) {
                return NextResponse.json({
                    success: true,
                    message: "Address updated successfully",
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to update address ! Please try again later",
                })
            }

        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authenticated ! Please login first",
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