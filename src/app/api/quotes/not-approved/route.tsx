import { NextResponse } from "next/server";
import { Quote } from "@/lib/types";
import prisma from "@/services/prisma";

export async function GET(): Promise<NextResponse> {
  try {
    const quotesNotApproved: Quote[] = await prisma.quote.findMany({
      include: {
        author: true,
      },
      where: {
        approved: false,
      },
    });
    return NextResponse.json(quotesNotApproved, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
