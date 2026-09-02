"use server";

import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";

export async function registerUser(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return user;
}