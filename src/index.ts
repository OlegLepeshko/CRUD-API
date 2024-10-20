import { createServer } from 'http';
import dotenv from 'dotenv';
import { routes } from './routes';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  routes(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

