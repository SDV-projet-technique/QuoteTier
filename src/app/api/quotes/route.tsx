import { Quote } from "@/lib/types";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(): Promise<NextResponse> {
  try {
    const quotes: Quote[] = await prisma.quote.findMany({
      include: {
        author: true,
      },
    });
    return NextResponse.json(quotes, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { text, authorId } = await request.json();

    await prisma.quote.create({
      data: {
        text,
        authorId,
      },
    });

    return NextResponse.json(
      { message: "Quote created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
