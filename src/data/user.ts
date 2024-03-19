'use server'
import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({ where: { email } });
};

export const getUsers= async () => {
  return await db.user.findMany();
};
