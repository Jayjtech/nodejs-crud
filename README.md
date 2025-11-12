# CRUD Operation API

Simple Express + MongoDB playground that demonstrates a full set of CRUD endpoints for managing products. It exposes `/api/products` routes, persists data with Mongoose models, and is configured to accept both JSON bodies and URL‑encoded form submissions (`multer().none()`).

## Features

- RESTful product endpoints (create, list, read, update, delete).
- Express 5 middleware stack with JSON + urlencoded body parsing.
- Multer-powered form support without file uploads (handy for HTML forms).
- Mongoose schema with timestamps and built-in validation.
- Environment-based configuration for database URL and port.
- Auto-generated Swagger documentation exposed at `/api-docs`.

## Tech Stack

| Layer      | Library / Tool | Notes                                   |
|-----------|----------------|-----------------------------------------|
| Runtime   | Node.js        | Tested with Node 18+                    |
| Server    | Express 5      | Lightweight HTTP routing                |
| Database  | MongoDB        | Any reachable MongoDB instance works    |
| ODM       | Mongoose 8     | Schema + helpers for Mongo collections  |
| Parsing   | Multer 2       | Accepts `multipart/form-data` sans file |
| Config    | dotenv         | Loads `.env` values into `process.env`  |

## Requirements

- Node.js 18+ and npm.
- An accessible MongoDB instance (local Docker, Atlas, etc.).
- `.env` file containing valid connection information.

## Quick Start

1. Install dependencies
   ```bash
   npm install
   ```
2. Create `.env`
   ```env
   PORT=5000
   MONGO_URL=mongodb://127.0.0.1:27017/products_db
   ```
3. Start the API
   ```bash
   # development (nodemon)
   npm run dev

   # plain node
   npm run serve
   ```

Once MongoDB is reachable you should see `Connected to MongoDB` and `Server is running on port 5000` in the console. Use `GET /` to confirm the health check: it returns `Server status is OK`.

## API Documentation

- View interactive docs at `http://localhost:<PORT>/api-docs`.
- The OpenAPI spec is generated via `swagger-jsdoc` from the annotations inside `routes/product.route.js`.

## Scripts

| Command        | Description                          |
|----------------|--------------------------------------|
| `npm run dev`  | Nodemon-based watcher for development |
| `npm run serve`| Starts the API with `node index.js`   |

## Environment Variables

| Name      | Required | Description                                | Example                                  |
|-----------|----------|--------------------------------------------|------------------------------------------|
| `PORT`    | ✖        | Port Express listens on (defaults to 5000) | `5000`                                   |
| `MONGO_URL` | ✔      | MongoDB connection string                  | `mongodb://127.0.0.1:27017/products_db`  |

## API Reference

Base URL: `http://localhost:<PORT>` (default `5000`)

| Method | Route                 | Description                      |
|--------|----------------------|----------------------------------|
| POST   | `/api/products`      | Create a product                 |
| GET    | `/api/products`      | List all products                |
| GET    | `/api/products/:id`  | Get a single product by ID       |
| PUT    | `/api/products/:id`  | Update an existing product       |
| DELETE | `/api/products/:id`  | Delete a product                 |

### Product Fields

| Field    | Type   | Required | Notes                          |
|----------|--------|----------|--------------------------------|
| `name`   | string | ✔        | Product name                   |
| `price`  | number | ✔        | Use plain numeric values       |
| `quantity` | number | ✔      | Inventory count                |
| `image`  | string | ✖        | URL or identifier for an image |

### Example Requests

Create a product:

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Keyboard","price":49.99,"quantity":10,"image":"https://…/kb.png"}'
```

Update a product:

```bash
curl -X PUT http://localhost:5000/api/products/<PRODUCT_ID> \
  -H "Content-Type: application/json" \
  -d '{"price":39.99,"quantity":8}'
```

Delete a product:

```bash
curl -X DELETE http://localhost:5000/api/products/<PRODUCT_ID>
```

All endpoints return a JSON object with a `status` string, a `message`, and (where applicable) the `product` or `products` payload. Errors are reported with `status: "error"` and a descriptive message.

### Response Format

```json
{
  "status": "success",
  "message": "Product created successfully",
  "product": {
    "_id": "65e9f6a60550a84e9dc87c92",
    "name": "Keyboard",
    "price": 49.99,
    "quantity": 10,
    "image": "https://example.com/kb.png",
    "createdAt": "2024-03-08T09:24:22.463Z",
    "updatedAt": "2024-03-08T09:24:22.463Z",
    "__v": 0
  }
}
```

Errors follow the same structure with `status: "error"` and an informative `message`.

## Testing the API

- **cURL** — Use the examples above to quickly smoke-test endpoints.
- **REST Client** — Import the routes into Postman, Bruno, or Insomnia for easier iteration.
- **HTML forms** — Because `multer().none()` is wired up, you can submit `multipart/form-data` forms without files and the payload will still reach the controller.

## Project Structure

```
crud-operation/
├── index.js                 # App bootstrap + swagger mounting
├── config/
│   └── swagger.js           # swagger-jsdoc + swagger-ui setup
├── controllers/
│   └── product.controller.js# CRUD handler implementations
├── routes/
│   └── product.route.js     # Express router + Swagger annotations
├── models/
│   └── products.model.js    # Mongoose schema/model definition
├── package.json             # Scripts and dependencies
└── node_modules/            # Installed packages
```

## Troubleshooting

- `Failed to connect to MongoDB`: double-check `MONGO_URL`, ensure Mongo is running, and confirm that your IP is allowed if using Atlas.
- Requests hang indefinitely: verify that the server actually started (look for the log messages) and that the port in your requests matches `PORT`.
- Validation errors: the Mongoose schema requires `name`, `price`, and `quantity`; ensure your payload contains valid primitives.

## Next Steps

- Add validation middleware (e.g., `zod`, `joi`) to guard write routes.
- Implement pagination and filtering for large product catalogs.
- Write automated tests for each controller branch before deploying.
