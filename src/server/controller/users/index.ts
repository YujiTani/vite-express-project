import express from "express";

const app = express();

// TODO: DBに接続してデータを取得するようにする
let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
];

const getUsers = async (req: express.Request, res: express.Response) => {
  res.json(users);
}

const getUserById = async (req: express.Request, res: express.Response) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  res.json(user);
}

const registerUser = async (req: express.Request, res: express.Response) => {
  const newUser = { id: users.length + 1, name: req.body.name };
  users.push(newUser);
  res.status(201).json(newUser);
}

const updateUserName = async (req: express.Request, res: express.Response) => {
  const user = users.find((user) => user.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = req.body.name;
  res.json(user);
}

const deleteUser = async (req: express.Request, res: express.Response) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  users = users.filter((user) => user.id !== Number(req.params.id));
  res.json(user);
}

export { getUsers, getUserById, registerUser, updateUserName, deleteUser };
