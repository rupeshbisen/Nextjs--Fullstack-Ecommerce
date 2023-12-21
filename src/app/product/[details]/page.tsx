import CommonDetails from "@/components/commonDetails"
import { productById } from "@/service/product"

export default async function ProductDetails({ params }: any) {
    const productDetailsData = await productById(params.details)
    return (
        <CommonDetails item={productDetailsData && productDetailsData.data} />
    )
}
