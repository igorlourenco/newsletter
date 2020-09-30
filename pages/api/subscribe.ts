import {NowRequest, NowResponse} from '@vercel/node'
import {MongoClient, Db} from 'mongodb'
import url from 'url'

let cachedDb: Db = null

declare function require(name:string);

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

async function sendMail(email){
    const sendgrid = require("sendgrid")(process.env.SENDGRID_API_KEY);
    const message = new sendgrid.Email();
    message.addTo(email);
    message.setFrom("theigorlourenco@gmail.com");
    message.setSubject("Inscrição na minha sewsletter");
    message.setHtml("Você se inscreveu na newsletter do Igor Lourenço (isso é fictício).");

    await sendgrid.send(email);

    return true;
}

export default async (request: NowRequest, response: NowResponse) => {
    const {email} = request.body;


    const db = await connectToDatabase(process.env.MONGODB_URI);
    const collection = db.collection('subscribers');

    await collection.insertOne({
        email,
        subscribedAt: new Date()
    });

    await sendMail(email);

    return response.status(201).json({ok: true});
}
