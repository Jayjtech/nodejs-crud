import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD Operation API Documentation",
      version: "1.0.0",
      description:
        "API documentation for CRUD operations using Express and MongoDB",
      contact: {
        name: "Your Name",
        email: "your@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Development Server",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "65e9f6a60550a84e9dc87c92",
            },
            name: {
              type: "string",
              example: "Keyboard",
            },
            price: {
              type: "number",
              example: 49.99,
            },
            quantity: {
              type: "number",
              example: 10,
            },
            image: {
              type: "string",
              nullable: true,
              example: "https://example.com/kb.png",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        ProductInput: {
          type: "object",
          required: ["name", "price", "quantity"],
          properties: {
            name: {
              type: "string",
              example: "Keyboard",
            },
            price: {
              type: "number",
              example: 49.99,
            },
            quantity: {
              type: "number",
              example: 5,
            },
            image: {
              type: "string",
              example: "https://example.com/kb.png",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
export const swaggerUiHandler = swaggerUi;
