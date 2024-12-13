// usersの基本ルーティング
import express from "express";

const router = express.Router();

// TODO: DBに接続してデータを取得するようにする
let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
];

router.get('/users', (req, res) => {
  res.json(users);
});

router.get('/users/:id', (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  res.json(user);
});

router.post('/users', (req, res) => {
  const newUser = { id: users.length + 1, name: req.body.name };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.patch('/users/:id', (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = req.body.name;
  res.json(user);
});

router.delete('/users/:id', (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  users = users.filter((user) => user.id !== Number(req.params.id));
  res.json(user);
});

export { router as usersRouter };
