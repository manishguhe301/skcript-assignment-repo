/*eslint-disable @typescript-eslint/no-unused-vars*/
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { prisma } from "@/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const { password: _, ...userData } = user;


    return NextResponse.json({ message: "Sign in successful", data: userData }, { status: 200 });
  } catch (error) {
    console.error("Sign in error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
