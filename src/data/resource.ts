"use server";
import { db } from "@/lib/db";

export async function getResources(parentId?: number) {
  let whereCoondition = parentId ? { id: parentId } : { parentId: null };

  return await db.resource.findMany({
    where: whereCoondition,
    select: {
      id: true,
      name: true,
      link: true,
      icon: true,
      key: true,
      children: {
        select: {
          id: true,
          name: true,
          link: true,
          icon: true,
          key: true,
        },
      },
    },
    orderBy: {
      sort: "desc",
    },
  });
}
