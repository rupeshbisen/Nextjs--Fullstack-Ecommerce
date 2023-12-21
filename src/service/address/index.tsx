import { AddressTypes } from "@/types/addressTypes"
import Cookies from "js-cookie"

export const addNewAddress = async (formData: AddressTypes) => {
    try {
        const res = await fetch('/api/address/add-new-address', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(formData),
        })

        const data = await res.json()
        return data;

    } catch (error) {
        console.log(error)
    }
}

export const getAllAddress = async (id: string) => {
    try {
        const res = await fetch(`/api/address/get-all-address?id=${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        })
        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error)
    }
}

export const updateAddress = async (formData: AddressTypes) => {
    try {
        const res = await fetch('/api/address/update-address', {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`
            },
            body: JSON.stringify(formData),
        })

        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error)
    }
}

export const deleteAddress = async (id: string) => {
    try {
        const res = await fetch(`/api/address/delete-address?id=${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            },
        })
        const data = await res.json()
        return data;

    } catch (error) {
        console.log(error)
    }
}

