import Cookies from "js-cookie"


export const callStripeSession = async (formdata: any) => {
    try {
        const res = await fetch("/api/stripe", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`
            },
            body: JSON.stringify(formdata)
        })
        const data = await res.json()
        return data;

    } catch (error) {
        console.log(error)
    }
} 