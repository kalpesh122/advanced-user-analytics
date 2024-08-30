### Setup Instructions for the Project

#### Prerequisites

1. **Node.js and npm**: Ensure you have Node.js and npm installed. You can download them from [Node.js official website](https://nodejs.org/).

2. **MySQL 8.0.39**: Install MySQL 8.0.39 locally. Follow the instructions on the [MySQL official website](https://dev.mysql.com/downloads/mysql/).

#### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/kalpesh122/advanced-user-analytics.git
   cd advanced-user-analytics
   ```

2. **Install Dependencies**

   Ensure you are in the project directory and run:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory of the project with the following content, replacing the placeholders with your actual values:

   ```env
   DB_NAME=<your-database-name>
   DB_USER=<your-database-username>
   DB_PASSWORD=<your-database-password>
   DB_HOST=localhost
   ```

4. **Setup MySQL Database**

   - **Create Database**: Ensure you have created a MySQL database matching the `DB_NAME` specified in your `.env` file.

   - **Run Database Migrations**: Ensure your Sequelize models are synchronized with the database:

     ```bash
     npm run seed
     ```

5. **Run Tests**

   Ensure MySQL is running, and then execute the tests:

   ```bash
   npm test
   ```

6. **Run the Application**

   For development:

   ```bash
   npm run dev
   ```

   For production:

   ```bash
   npm run prod
   ```

#### Additional Commands

- **Linting**: Run the linter to check code quality:

  ```bash
  npm run lint
  ```

- **Formatting**: Format the code with Prettier:

  ```bash
  npm run format
  ```

