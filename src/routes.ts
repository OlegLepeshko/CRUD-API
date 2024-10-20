import { IncomingMessage, ServerResponse } from 'http';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './controllers';

export const routes = (req: IncomingMessage, res: ServerResponse): void => {
  if (req.method === 'GET' && req.url === '/api/users') {
    getUsers(req, res);
  } else if (req.method === 'GET' && req.url?.startsWith('/api/users/')) {
    getUserById(req, res);
  } else if (req.method === 'POST' && req.url === '/api/users') {
    createUser(req, res);
  } else if (req.method === 'PUT' && req.url?.startsWith('/api/users/')) {
    updateUser(req, res);
  } else if (req.method === 'DELETE' && req.url?.startsWith('/api/users/')) {
    deleteUser(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Resource not found' }));
  }
};
