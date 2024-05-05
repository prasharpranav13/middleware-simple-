const express = require("express");
const PORT = 8000;
const app = express();
const users = require("./MOCK_DATA.json");

//middleware
// app.use((req, res, next) => {
//   console.log(`hello from m1`);
// });

app.use((req, res, next) => {
  console.log(`hello from m1`);
  req.userName = `pranav kr singh`;
  next();
});

//middleware2

app.use((req, res, next) => {
  console.log(`hello from m2 ${req.userName}`);
  next();
});

//middleware3-> create log for each req-res cycle
app.use((req, res, next) => {
  console.log(`hello from m3`);
  fs.appendFile(
    "log.txt",
    `\n ${req.url} - ${Date.now()} - ${req.method} - ${req.path} \n`,
    (err, data) => {
      next();
    }
  );
});

app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users
    .map((user) => {
      return ` <li> ${user.first_name}</li>`;
    })
    .join("")}
  </ul>}`;
  return res.send(html);
});

//REST API
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/api/users/:userId", (req, res) => {
  const id = Number(req.params.userId);
  const user = users.find((item) => item.id === id);
  return res.json(user);
});
const fs = require("fs");
app.use(express.urlencoded({ extended: false })); //middleware
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: `sucess`, id: users.length });
  });
});

app.listen(PORT, () => console.log(`server started`));
