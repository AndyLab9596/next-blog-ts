import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { email, name, message } = req.body;

        if (!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
            res.status(422).json({ message: 'Invalid input' });
            return;
        }

        // Store it in database;

        const newMessage: { [x: string]: string } = {
            email,
            name,
            message,
        };
        let client;
        const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clubstername}.kzqaurn.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
        try {
            client = await MongoClient.connect(connectionString);
        } catch (error) {
            res.status(500).json({ message: 'Could not connect to database' });
            return;
        }

        const db = client.db('my-site');

        try {
            const result = await db.collection('messages').insertOne(newMessage);
            newMessage.id = result.insertedId.toString();
        } catch (error) {
            client.close();
            res.status(500).json({ message: 'Storing message failed' });
            return;
        }

        client.close();

        res.status(201).json({ message: 'Successfully stored message!', contact: newMessage })
    }
}
