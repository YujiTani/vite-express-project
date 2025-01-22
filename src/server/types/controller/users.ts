import { User } from "@prisma/client";

export type CreateUserRequest = Omit<User, "id" | "createdAt" | "updatedAt" | "deletedAt">;
export type UpdateUserRequest = Partial<CreateUserRequest>;
