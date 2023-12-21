import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    sizes: Array,
    deliveryInfo: String,
    onSale: String,
    imageUrl: String,
    priceDrop: Number,
}, { timestamps: true });

const Product = mongoose.models.Products || mongoose.model("Products", ProductSchema);
export default Product;