import {NowRequest, NowResponse} from '@vercel/node'
import {MongoClient, Db} from 'mongodb'
import url from 'url'
import MailService from "@sendgrid/mail"

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
    const {email} = request.body;

    MailService.setApiKey(process.env.SENDGRID_API_KEY);

    const message = {
        to: email,
        from: 'theigorlourenco@gmail.com',
        subject: 'Inscrição na minha sewsletter',
        text: 'Você se inscreveu na newsletter do Igor Lourenço',
        html: '<br><strong>essa mensagem é um teste</strong>'
    }

    const db = await connectToDatabase(process.env.MONGODB_URI);
    const collection = db.collection('subscribers');

    await collection.insertOne({
        email,
        subscribedAt: new Date()
    });

    MailService
        .send(message)
        .then(() => {
            console.log('Email enviado')
        })
        .catch((error) => {
            console.error(error)
        })

    return response.status(201).json({ok: true});
}