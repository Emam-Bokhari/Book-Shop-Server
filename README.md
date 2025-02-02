# 📚 Book Shop Backend

This **Book Shop Backend** is application designed to manage `books`, `customers`, and `transactions` efficiently. Developed with `TypeScript`, `Node.js`, `Express.js`, and `MongoDB` with `Mongoose`, it provides **role-based** functionalities for `admins` and `users`. The system supports secure authentication, dynamic `filtering`, `sorting`, and `searching`.

### 🌐 Live Deployment & 🎥 Explanation Video Link

- **Live Site**: [Visit the Deployment](https://book-shop-server-3trk.vercel.app)

## 🔑 Key Features

**🛒 Book Management**

- Admins can **add**, **update**, **delete**, or **manage** books.
- Users can view **books** and purchase them.

**🧑‍💻 Role-Based Access Control**

- **Admin:** Manage books, view all transactions, and banned users.
- **User:** Explore, purchase books, and view their order history.

**🔐 Authentication & Authorization**

- **JWT-based secure authentication** for all users.
- Role-specific authorization for admin and user functionalities.

**🔎 Advanced Filtering, Sorting & Searching**

- Filter books by `category`, `price range`, `author`, or `publication date`.
- Sort books based on `price`, and `author`.
- Search books by `title`, `author`, or `category`.

**💳 Transactions & Orders**:

- Users can place orders for books and view their order history.
- Admins can view all user transactions and monitor order details.

## 🛠️ Installation and Setup

To get started with the project locally, follow these steps:

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Emam-Bokhari/Book-Shop-Server

```

### 2. Navigate to the Project Folder

Go to the project directory:

```bash
cd Book-Shop-Server

```

### 3. Install Dependencies

Install the required dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```

### 4. Setup Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```bash
PORT=3000
NODE_ENV=development
DATABASE_USER_NAME=book-shop
DATABASE_PASS=l8Fvv42z7tcTRt8M
DATABASE_URL=mongodb+srv://book-shop:l8Fvv42z7tcTRt8M@cluster0.kndeci6.mongodb.net/book-shop?retryWrites=true&w=majority&appName=Cluster0
BCRYPT_SALT_ROUNDS=12
STORE_ID=dream67950c298b8c2
STORE_PASS=dream67950c298b8c2@ssl
JWT_ACCESS_SECRET=9e32781d05012e2a584089f77efad27f71788034266983baeda45d366ad13a49d1b2c4431b4cf1434d792ae0b79a54ad189d9d9904e645570ccc325987a74531
```

### 5. Run the Application

Start the development server:

```bash
npm run start:dev
```

Your application should now be running at `http://localhost:3000`.

### 6. Access the Application

- Visit the site in your browser at `http://localhost:3000`.
- You can now use the application to create, update, delete, and manage blogs based on the user roles.

### 7. Additional Notes

- To access protected routes, use Bearer Tokens for authentication.

## ⚙️ Technologies Used

This project is built using technologies that ensure smooth performance and easy development:

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Framework for building RESTful APIs
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM library for MongoDB.
- **TypeScript**: Typed superset of JavaScript.

### Authentication & Authorization

- **JWT (JSON Web Tokens)**: Token-based secure authentication..
- **bcrypt.js**: Secure password hashing.

### Deployment

- **Vercel**: Deployment platform.
- **dotenv**: Manage environment variables.

### Other Tools

- **bcryptjs**: For hashing passwords securely.
- **CORS**: Middleware to enable cross-origin resource sharing.

These technologies work together to create a secure, scalable, and user-friendly blogging platform.

## 📁 Folder Structure

Below is the folder structure for the project:

```bash
├── dist/                                             # Compiled Code
│   ├── app/
│   ├── app.js
│   └── server.js
├── node_modules/                                     # Project dependencies
├── src/                                              # Source code
│   ├── app/                                          # Main application logic
│   │   ├── builder/
│   │   ├── config/                                   # Configuration files (e.g., database, JWT, etc.)
│   │   ├── errors/                                   # Custom error handling classes and utilities
│   │   ├── interface/                                # TypeScript interfaces and types
│   │   ├── middleware/                               # Express middleware functions
│   │   ├── modules/                                  # Feature-specific modules
│   │   │   ├── Auth/
│   │   │   └── Product/
│   │   │   └── Order/
│   │   │   └── ShippingAddress/
│   │   │   └── User/
│   │   ├── routes/                                   # Express routes (API endpoints)
│   │   ├── utils/
│   ├── app.ts                                        # Application entry point
│   └── server.ts                                     # Main server file
├── .env                                              # Environment variables
├── .gitignore                                        # Specifies which files should not be tracked by Git
├── .prettierignore                                   # Prettier configuration to ignore specific files
├── .prettierrc                                       # Prettier configuration file
├── .eslint.config.mjs                                # ESLint configuration file
└── etc                                               # Other files (e.g., documentation, package-lock.json etc.)
```

## 📞 Contact

For any inquiries, or suggestions, feel free to reach out:

- **Email**: [moshfiqurrahman37@gmail.com](mailto:moshfiqurrahman37@gmail.com)
- **GitHub**: [Emam-Bokhari](https://github.com/Emam-Bokhari)
- **LinkedIn**: [Moshfiqur Rahman](https://www.linkedin.com/in/moshfiqur-rahman-a302b32a3/)

I am always open to feedback ! 😊
