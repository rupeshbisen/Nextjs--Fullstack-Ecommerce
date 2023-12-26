import mongoose from "mongoose";

const DB_NAME = "EcommerceDatabase"
const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n Ecommerce database connected successfully !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Getting Error from DB connection", error);
        process.exit(1)
    }
}
export default connectToDB