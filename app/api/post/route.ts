/*eslint-disable @typescript-eslint/no-unused-vars*/
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { Board } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const board = searchParams.get('board');

    const posts = await prisma.post.findMany({
      where: board ? { board: board as Board } : {},
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, status, board, upvoters } = await req.json();

    const newPost = await prisma.post.create({
      data: {
        title,
        status,
        board,
        upvoters: upvoters ?? 0,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, title, status, board, upvoters } = await req.json();

    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, status, board, upvoters },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
