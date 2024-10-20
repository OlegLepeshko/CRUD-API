import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: User[] = [];

export const getUsers = async (_req: IncomingMessage, res: ServerResponse): Promise<void> => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(users));
};

export const getUserById = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  const userId = req.url?.split('/')[3];
  if (!uuidValidate(userId!)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid UUID' }));
    return;
  }
  const user = users.find(user => user.id === userId);
  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
};

export const createUser = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const { username, age, hobbies } = JSON.parse(body);
    if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Missing required fields' }));
      return;
    }
    const newUser: User = { id: uuidv4(), username, age, hobbies };
    users.push(newUser);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  });
};

export const updateUser = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  const userId = req.url?.split('/')[3];
  if (!uuidValidate(userId!)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid UUID' }));
    return;
  }
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const { username, age, hobbies } = JSON.parse(body);
    if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Missing required fields' }));
      return;
    }
    const updatedUser: User = { id: userId!, username, age, hobbies };
    users[userIndex] = updatedUser;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(updatedUser));
  });
};

export const deleteUser = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  const userId = req.url?.split('/')[3];
  if (!uuidValidate(userId!)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid UUID' }));
    return;
  }
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }
  users.splice(userIndex, 1);
  res.writeHead(204);
  res.end();
};
