import { NextRequest, NextResponse } from "next/server";
import { Author } from "@/lib/types";
import prisma from "@/services/prisma";

export async function GET(): Promise<NextResponse> {
  try {
    const authors: Author[] = await prisma.author.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(authors, { status: 200 });
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
    const { name } = await request.json();

    await prisma.author.create({
      data: {
        name,
      },
    });

    return NextResponse.json(
      { message: "Author created successfully" },
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
