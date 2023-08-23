import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres";

export const GET = async (request: NextRequest) => {
  const client = db.connect();
  return NextResponse.json({
    message: "This api is GET and and called from browser",
  });
};
