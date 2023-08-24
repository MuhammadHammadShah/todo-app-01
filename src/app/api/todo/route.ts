import { NextRequest, NextResponse } from "next/server";
import { db, todoTable } from "@/lib/drizzle";
import { sql } from "@vercel/postgres";

export async function GET(request: NextRequest) {
  try {
    await sql`CREATE TABLE IF NOT EXISTS Todos(id serial, Task varchar(255));`;

    const res = await db.select().from(todoTable);
    console.log(res);
    return NextResponse.json({ data: res });
  } catch (err) {
    console.log((err as { message: string }).message);
    return NextResponse.json({ message: "Somthing went wrong" });
  }
}

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  try {
    if (req.task) {
      const res = db
        .insert(todoTable)
        .values({
          task: req.task,
        })
        .returning();
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
