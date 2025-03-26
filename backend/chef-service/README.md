# Chef Service

Microservice for the Chef module in a restaurant management system.

## Setup
1. Install dependencies: `npm install`
2. Configure `.env` with your database URL, Redis URL, RabbitMQ URL, and service URLs.
3. Run migrations: `npx prisma migrate dev --name init`
4. Start the service: `npm start`

## API Endpoints
`GET /api/chef/pending-order-items` thay vì `GET /api/chef/orders/pending`.
`PUT /api/chef/update-order-item` thay vì `PUT /api/chef/order-item/:order_item_id/status`.

## Dependencies
- Redis: For caching pending orders.
- RabbitMQ: For asynchronous communication with Waiter Service.
- Prisma: For database access.