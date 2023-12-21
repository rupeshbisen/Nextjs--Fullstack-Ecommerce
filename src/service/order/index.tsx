import Cookies from "js-cookie";

export const createNewOrder = async (FormData: any) => {
    try {
        const res = await fetch("/api/order/create-order", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`
            },
            body: JSON.stringify(FormData)

        })
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllOrdersForUser = async (id: string) => {
    try {
        const res = await fetch(`/api/order/get-all-order?id=${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getOrderDetails = async (id: string) => {
    try {
        const res = await fetch(`/api/order/order-details?id=${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getAllOrdersForAllUsers = async () => {
    try {
        const res = await fetch(`/api/admin/orders/get-all-orders`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        })
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}

export const updateStatusOfOrder = async (FormData: any) => {
    try {
        const res = await fetch(`/api/admin/orders/update-orders`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`
            },
            body: JSON.stringify(FormData)
        })
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}