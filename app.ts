/*
CRUD operations with Users
Prisma is an ORM for Node.js and TypeScript that gives you the benefits of type-safety at zero cost by auto-generating types from your database schema.
*/
import express from "express";
const { Users } = require("./routes/main");

const app = express();
const PORT = 4000 || process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/users", Users);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});






