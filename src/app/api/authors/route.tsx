import { NextResponse } from "next/server";
import { Author } from "@/lib/types";
import prisma from "@/services/prisma";

export async function GET(): Promise<NextResponse> {
  try {
    const authors: Author[] = await prisma.author.findMany();

    return NextResponse.json(authors, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Une erreur inattendue est survenue" },
      { status: 500 },
    );
  }
}
