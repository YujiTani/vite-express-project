import { Request, Response } from "express";

import { User } from "@/server/types/controller/users.ts";
import { ApiController } from "@/server/types/common/index.ts";

// TODO: DBに接続してデータを取得するようにする
let users: User[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", age: 20, gender: "male" },
  { id: 2, name: "Jane Doe", email: "jane.doe@example.com", age: 21, gender: "female" },
];

export const getUsers: ApiController = async (req: Request, res: Response) => {
  return res.json(users);
}

export const getUserById: ApiController = async (req: Request, res: Response) => {
  const user = users.find((user) => user.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json(user);
}

export const registerUser: ApiController = async (req: Request, res: Response) => {
  const newUser: User = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender
  };

  users.push(newUser);
  return res.status(201).json(newUser);
}

export const updateUserName: ApiController = async (req: Request, res: Response) => {
  const user = users.find((user) => user.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = req.body.name;
  return res.json(user);
}

export const updateUser: ApiController = async (req: Request, res: Response) => {
  const user = users.find((user) => user.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const newUser: User = {
    id: user.id,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender
  };

  users = users.map((user) =>  {
    if (user.id === Number(req.params.id)) {
      return newUser;
    }

    return user;
  });

  return res.json(newUser);
}

export const deleteUser: ApiController = async (req: Request, res: Response) => {
  const user = users.find((user) => user.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  users = users.filter((user) => user.id !== Number(req.params.id));
  return res.json(user);
}
