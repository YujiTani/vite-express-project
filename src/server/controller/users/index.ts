import express from "express";

const app = express();

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
}

// TODO: DBに接続してデータを取得するようにする
let users: User[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", age: 20, gender: "male" },
  { id: 2, name: "Jane Doe", email: "jane.doe@example.com", age: 21, gender: "female" },
];

const getUsers = async (req: express.Request, res: express.Response) => {
  res.json(users);
}

const getUserById = async (req: express.Request, res: express.Response) => {
  const user = users.find((user) => user.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
}

const registerUser = async (req: express.Request, res: express.Response) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender
  };

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

const updateUser = async (req: express.Request, res: express.Response) => {
  const user = users.find((user) => user.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const newUser = {
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

  res.json(newUser);
}

const deleteUser = async (req: express.Request, res: express.Response) => {
  const user = users.find((user) => user.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  users = users.filter((user) => user.id !== Number(req.params.id));
  res.json(user);
}

export { getUsers, getUserById, registerUser, updateUser, updateUserName, deleteUser };
