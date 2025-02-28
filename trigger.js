import { MongoClient } from "mongodb";

async function updatePriorities() {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("Todo_list");
        const collection = database.collection("task");

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);


        const result = await collection.updateMany(
            { deadline: { $lt: currentDate } },
            { $set: { priority: 3 } }
        );

        console.log(`Updated ${result.modifiedCount} documents where the deadline is less than the current date.`);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

updatePriorities().catch(console.error);

export default updatePriorities;
