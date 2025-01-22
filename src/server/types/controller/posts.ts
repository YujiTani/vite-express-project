import { Post } from "@prisma/client";

export type CreatePostRequest = Omit<Post, "id" | "createdAt" | "updatedAt" | "deletedAt">;
export type UpdatePostRequest = Partial<CreatePostRequest>;
