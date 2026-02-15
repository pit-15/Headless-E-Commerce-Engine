# Headless-E-Commerce-Engine

A robust, atomic, and secure backend API for managing products and transactions. Built for speed, consistency, and scalability using Node.js, Express, and MongoDB.

## Features

* **Secure Authentication:** JWT-based auth with Role-Based Access Control (Customer vs Staff vs Admin)
* **Atomic Transactions:** MongoDB Sessions ensure no partial transactions,helping maintain data consistency
* **Advanced Product Search:** Filtering, sorting, and regex search
* **Order Snapshotting:** Captures customer info and product price at purchase for accurate records


## Tech Stack

* **Backend:** Node.js + Express.js
* **Database:** MongoDB (utilizing Replica Sets for transactions)
* **ORM:** Mongoose
* **Security:** JSON Web Tokens (JWT), bcryptjs

---

## Setup 

### Prerequisites
* Node.js installed
* MongoDB Atlas account (or local MongoDB running as a Replica Set)

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/pit-15/Headless-E-Commerce-Engine.git
    ```
2.  **Configure environment variables:**
    Create a `.env` file in the root directory and add:
    ```env
    PORT=7071
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```
3.  **Run the server:**
    ```bash
    npm run dev
    ```

---

##  API Endpoints

### Authentication
* `POST /auth/register` - Register a new user
* `POST /auth/login` - Login to receive a JWT

### Products
* `GET /products` - Get all products (with search/filter)
* `POST /products` - Create a product (Admin only)

### Orders
* `POST /orders/quickbuy` - Atomic single-item purchase
* `POST /orders/checkout` - Atomic multi-item checkout
*Uses MongoDB transactions: if any item is out of stock, the entire transaction rolls back, keeping inventory accurate.*



---

##  Author

**[Pankit Shah]**


