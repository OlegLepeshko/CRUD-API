# CRUD API

## Description
A simple CRUD API implemented using an in-memory database. The project is built with TypeScript and uses Node.js' built-in `http` module, `uuid` for unique identifiers, and `dotenv` for environment variables.

## Technical Requirements
- Only allowed packages: nodemon, dotenv, cross-env, typescript, ts-node, ts-node-dev, eslint, webpack-cli, webpack, prettier, uuid, @types/\*, and libraries used for testing.
- Node.js version 22.x.x or higher.
- Prefer asynchronous API whenever possible.

## API Endpoints
- **GET /api/users**: Get all users.
  - Status 200: Returns all user records.
  
- **GET /api/users/{userId}**: Get user by ID.
  - Status 200: Returns user record if it exists.
  - Status 400: Invalid UUID.
  - Status 404: User not found.
  
- **POST /api/users**: Create a new user.
  - Status 201: Returns newly created user.
  - Status 400: Missing required fields.
  
- **PUT /api/users/{userId}**: Update an existing user.
  - Status 200: Returns updated user.
  - Status 400: Invalid UUID.
  - Status 404: User not found.
  
- **DELETE /api/users/{userId}**: Delete a user.
  - Status 204: User deleted.
  - Status 400: Invalid UUID.
  - Status 404: User not found.

## Error Handling
- Requests to non-existing endpoints return status 404 with a message: "Resource not found".
- Server-side errors during request processing return status 500 with a message: "Internal Server Error".

## Environment Configuration
The application reads the port value from a `.env` file.

```plaintext
PORT=4000


# CRUD-API
