import pkg from "pg";      // For ES module syntax
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",        // PostgreSQL username
  password: "postgres123",// PostgreSQL password
  host: "localhost",
  port: 5432,
  database: "blogsdb"     
});

export default pool;       // 
