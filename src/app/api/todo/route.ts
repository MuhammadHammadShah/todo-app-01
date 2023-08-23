import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres";

export const GET = async (request: NextRequest) => {
  const client = await db.connect();

  try {
    await client.sql`CREATE TABLE IF NOT EXISTS todos(id serial , Task varchar(255))`;
    return NextResponse.json({
      message: "This api is GET and and called from browser",
    });
  } catch (err) {
    return NextResponse.json({ message: "something Wen wrong" });
  }
};

export const POST = async (request: NextRequest) => {
  const client = await db.connect();
  const req = await request.json();
  try {
    if (req.task) {
      const res =
        await client.sql`INSERT INTO todos(TASK) VALUES (${req.task})`;
      console.log(res);
      return NextResponse.json({ message: "Data  added successfully" });
    } else {
      throw new Error("Task Field is required");
    }
  } catch (error) {
    return NextResponse.json({
      message: (error as { message: string }).message,
    });
  }
};
