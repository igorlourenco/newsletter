import {NowRequest, NowResponse} from '@vercel/node'
import {MongoClient, Db} from 'mongodb'
import url from 'url'

let cachedDb: Db = null

async function connectToDatabase(uri: string) {

    if (cachedDb) {
        return cachedDb;
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const dbName = url.parse(uri).pathname.substr(1);

    const db = client.db(dbName);

    cachedDb = db;

    return db;
}

export default async (request: NowRequest, response: NowResponse) => {

    let {email} = request.body;

    email = email.toString().replace(/ /g,"");

    const db = await connectToDatabase(process.env.MONGODB_URI);
    const collection = db.collection('subscribers');

    await collection.insertOne({
        email,
        subscribedAt: new Date()
    });

    return response.status(201).json({ok: true});
}
