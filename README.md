# CRUD Operation API

Small Express + MongoDB playground that demonstrates a full set of CRUD endpoints for managing products. It exposes `/api/products` routes, persists data with Mongoose models, and is configured to accept both JSON bodies and URL‑encoded form submissions (via `multer`'s `.none()` helper).

## Tech Stack

- Node.js + Express 5 for the HTTP server.
- MongoDB with Mongoose 8 for data modeling.
- Multer 2 for parsing form submissions without files.
- dotenv for loading environment variables.

## Getting Started

1. **Prerequisites**
   - Node.js 18+ and npm installed locally.
   - A running MongoDB instance that the API can reach.
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Environment variables**
   Create a `.env` file in the project root:
   ```env
   PORT=5000
   MONGO_URL=mongodb://127.0.0.1:27017/products_db
   ```
4. **Run the server**
   - Development (auto‑restart): `npm run dev`
   - Production-style run: `npm run serve`

The server logs when it connects to MongoDB and starts listening. The health check route `GET /` returns `Server status is OK`.

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

## Project Structure

```
crud-operation/
├── index.js                 # Express app & route handlers
├── models/
│   └── products.model.js    # Mongoose schema/model definition
├── package.json             # Scripts and dependencies
└── node_modules/            # Installed packages
```

## Next Steps

- Add validation middleware (e.g., `zod`, `joi`) to guard write routes.
- Implement pagination and filtering for large product catalogs.
- Write automated tests for each controller branch before deploying.
