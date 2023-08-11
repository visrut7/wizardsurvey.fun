import clientPromise from '@/app/mongodb';
import { NextResponse } from 'next/server';
import * as crypto from 'crypto';

function getClientIP(request: Request): string | undefined {
    const headers = request.headers;
    const xForwardedFor = headers.get('x-forwarded-for');

    if (xForwardedFor) {
        const ipList = xForwardedFor.split(',');
        return ipList[0].trim();
    } else {
        if ((request as any).connection === undefined) {
            return "undefined";
        }
        return (request as any).connection.remoteAddress;
    }
}

export async function POST(request: Request) {
    const ip = getClientIP(request);
    const sha256 = crypto.createHmac("sha256", process.env.SALT!);
    const ipHash = sha256.update(ip!);
    const ipHashDigest = ipHash.digest("hex");

    const client = await clientPromise;
    const db = client.db("survey-db");
    const creatorHistory = await db.collection("creator-ip-hash").findOne({ ipHash: ipHashDigest });
    if (creatorHistory === null) {
        await db.collection("creator-ip-hash").insertOne({ ipHash: ipHashDigest, count: 1 });
    } else {
        const prevCount = creatorHistory.count;

        if (prevCount >= 3) {
            return NextResponse.json({ "error": "API Limit is reached" }, { status: 429 });
        }

        await db.collection("creator-ip-hash").updateOne({ ipHash: ipHashDigest }, { $set: { count: prevCount + 1 } });
    }

    const survey = await request.json();
    survey.creatorIpHash = ipHashDigest;
    const surveyId = (await db.collection("survey-templates").insertOne(survey)).insertedId.toString();

    return NextResponse.json({ "id": surveyId }, { status: 201 });
}