import CommonListing from '@/components/commonListing'
import { productByCategory } from '@/service/product'

export default async function MenAllProducts() {
    const getAllMenProducts = await productByCategory('men');
    return (
        <CommonListing data={getAllMenProducts && getAllMenProducts.data} />
    )
}
