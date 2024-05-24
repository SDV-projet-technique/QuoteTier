import { Author } from "@/lib/types";
import prisma from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  authorId: number;
};

export async function GET(
  request: NextRequest,
  context: { params: Params },
): Promise<NextResponse> {
  try {
    const { authorId } = context.params;

    const author: Author | null = await prisma.author.findUnique({
      where: {
        id: Number(authorId),
      },
    });

    if (!author) {
      return NextResponse.json(
        { message: "Author not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(author, { status: 200 });
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
    const { authorId } = context.params;
    const { name } = await request.json();

    const authorToUpdate: Author | null = await prisma.author.findUnique({
      where: {
        id: Number(authorId),
      },
    });

    if (!authorToUpdate) {
      return NextResponse.json(
        { message: "Author not found" },
        { status: 404 },
      );
    }

    await prisma.author.update({
      where: {
        id: Number(authorId),
      },
      data: {
        name,
      },
    });

    return NextResponse.json("", { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Params },
): Promise<NextResponse> {
  try {
    const { authorId } = context.params;

    const authorToDelete: Author | null = await prisma.author.findUnique({
      where: {
        id: Number(authorId),
      },
    });

    if (!authorToDelete) {
      return NextResponse.json(
        { message: "Author not found" },
        { status: 404 },
      );
    }

    await prisma.author.delete({
      where: {
        id: Number(authorId),
      },
    });

    return NextResponse.json({ message: "Author deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Une erreur inattendue est survenue" },
      { status: 500 },
    );
  }
}
