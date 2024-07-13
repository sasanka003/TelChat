import { MongoClient } from "mongodb";

const {
    MONGO_URI = "mongodb+srv://admin:test123!@cluster0.ds6uwmi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
} = process.env;

export const client = new MongoClient(MONGO_URI)
export const db = client.db("telchat");
export const connect = async () => {
    await client.connect();
    console.log("Connected to MongoDB");
}