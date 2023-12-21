import mongoose from "mongoose";


const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const connectToDB = async () => {
    const connectionUrl = "mongodb+srv://rupeshDev:Tech8092@cluster0.fnwsxbc.mongodb.net/";

    mongoose
        .connect(connectionUrl, configOptions)
        .then(() => console.log('Ecommerce database connected successfully'))
        .catch((err) => console.log(`Getting Error from DB connection ${err.message}`))
}
export default connectToDB