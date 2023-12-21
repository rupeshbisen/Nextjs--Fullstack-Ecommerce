import CommonListing from '@/components/commonListing'
import { productByCategory } from '@/service/product'

export default async function WomenAllProducts() {
    const getAllWomenProducts = await productByCategory('women');
    return (
        <CommonListing data={getAllWomenProducts && getAllWomenProducts.data} />
    )
}
