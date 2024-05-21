import { NextRequest, NextResponse } from "next/server";
import prisma from "@/services/prisma";

type Params = {
  quoteId: number;
  action: string;
};

const actions = ["approve", "reject", "like", "dislike"];

export async function PUT(
  request: NextRequest,
  context: { params: Params },
): Promise<NextResponse> {
  try {
    const { quoteId, action } = context.params;

    if (!actions.includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    const quoteToAction = await prisma.quote.findUnique({
      where: {
        id: Number(quoteId),
      },
    });

    if (!quoteToAction) {
      return NextResponse.json({ message: "Quote not found" }, { status: 404 });
    }

    if (action === "approve") {
      await prisma.quote.update({
        where: {
          id: Number(quoteId),
        },
        data: {
          approved: true,
        },
      });
    }

    if (action === "like") {
      await prisma.quote.update({
        where: {
          id: Number(quoteId),
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    }

    if (action === "dislike") {
      await prisma.quote.update({
        where: {
          id: Number(quoteId),
        },
        data: {
          dislikes: {
            increment: 1,
          },
        },
      });
    }

    return NextResponse.json(
      { message: `Quote ${action}d successfully` },
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
