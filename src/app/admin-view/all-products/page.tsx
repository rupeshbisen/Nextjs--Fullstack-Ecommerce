import CommonListing from "@/components/commonListing";
import { getAllAdminProducts } from "@/service/product";



export default async function AdminAllProducts() {

  const allAdminProducts = await getAllAdminProducts()

  return <CommonListing data={allAdminProducts && allAdminProducts.data}/>
}