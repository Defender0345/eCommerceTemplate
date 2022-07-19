MERN eCommerce Platform

> eCommerce platform built with the MERN stack & Redux.

## Features

-  Full featured shopping cart
-  Product reviews and ratings
-  Top products carousel
-  Product pagination
-  Client list pagination
-  Orders list pagination
-  Product search feature by name, brand, category
-  User profile with orders
-  Admin product management
-  Admin user & orders management
-  Admin Order details page
-  Mark orders as delivered option
-  Checkout process (shipping, payment method, etc)
-  PayPal / credit card integration
-  Database seeder (products & users)

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

Nodemon is used to run both in conjunction

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```
