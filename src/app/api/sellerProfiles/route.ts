// src/app/api/sellerProfiles/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';  // This should now work after creating the mongodb.ts file

export async function POST(req: Request) {
    try {
        const client = await clientPromise;
        const db = client.db('handcrafted_haven'); // Change to your database name
        const collection = db.collection('sellerProfiles');

        const body = await req.json();
        const newProfile = await collection.insertOne(body);

        return NextResponse.json(newProfile);
    } catch (error) {
        if (error instanceof Error) {
        return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
        }
        return NextResponse.json({ error: 'Unknown Error' }, { status: 500 });
    }
}
