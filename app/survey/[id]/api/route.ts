import clientPromise from "@/app/mongodb";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const surveyId = params.id;

    const client = await clientPromise;
    const db = client.db("survey-db");
    const survey = await db.collection("survey-templates").findOne({ uuid: surveyId });

    return NextResponse.json(survey, { status: 200 });
}