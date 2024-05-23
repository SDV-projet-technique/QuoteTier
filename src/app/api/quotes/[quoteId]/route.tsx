import { NextRequest, NextResponse } from "next/server";
import { Quote } from "@/lib/types";
import prisma from "@/services/prisma";

type Params = {
  quoteId: number;
};

export async function GET(context: { params: Params }): Promise<NextResponse> {
  try {
    const { quoteId } = context.params;

    const quote: Quote | null = await prisma.quote.findUnique({
      include: {
        author: true,
      },
      where: {
        id: Number(quoteId),
      },
    });

    if (!quote) {
      return NextResponse.json({ message: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json(quote, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Params },
): Promise<NextResponse> {
  try {
    const { quoteId } = context.params;
    const { text, authorId } = await request.json();

    const quoteToUpdate: Quote | null = await prisma.quote.findUnique({
      where: {
        id: Number(quoteId),
      },
    });

    if (!quoteToUpdate) {
      return NextResponse.json({ message: "Quote not found" }, { status: 404 });
    }

    await prisma.quote.update({
      where: {
        id: Number(quoteId),
      },
      data: {
        text,
        authorId,
      },
    });

    return NextResponse.json(
      { message: "Quote updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function DELETE(context: {
  params: Params;
}): Promise<NextResponse> {
  try {
    const { quoteId } = context.params;

    const quoteToDelete: Quote | null = await prisma.quote.findUnique({
      where: {
        id: Number(quoteId),
      },
    });

    if (!quoteToDelete) {
      return NextResponse.json({ message: "Quote not found" }, { status: 404 });
    }

    await prisma.quote.delete({
      where: {
        id: Number(quoteId),
      },
    });

    return NextResponse.json({ message: "Quote deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
