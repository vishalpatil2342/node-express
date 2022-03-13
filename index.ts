import express from 'express';
import { v4 as uuid4 } from 'uuid';

interface Users{
  id: string
  name: string
  email:string
}


const users: Users[] = [
  {
    id: uuid4(),
    name: "vishal",
    email: "vishalpatil@gmail.com"
  },
  {
    id: uuid4(),
    name: "vivek",
    email: "vivekjha@gmail.com"
  }
]

const app = express()

app.use(express.json());


app.get("/users", (request, response) => {
  response.json({"data":users,error:[]})
})



app.post("/users", (request, response) => {
  const { email, name } = request.body;
  const newUser = {
    id: uuid4(),
    name,
    email
  }
  users.push(newUser);
  response.json({ "data": "insert user successfully" ,"errors":[]});
})




app.get("/users/:id", (request, response) => {
  const { id } = request.params;
  const user = users.find(user => user.id === id);
  if (user) {
    return response.json({ "data": user, "errors": [] });
  }
  else {
    return response.json({ "data": [], "error": "user not found" })
  }
})




app.put("/users/:id", (request, response) => {
  const { id } = request.params;
  const { name, email } = request.body;
  const user = users.find(user => user.id === id);

  if (user) {
    user.email = email;
    user.name = name;
    return response.json({ "data": user, "errors": [] });
  }
  else {
    return response.json({ "data": [], "errors": "user not found" });
  }
})



app.delete("/users/:id", (request, response) => {
  const { id } = request.params;
  const user = users.filter(user => user.id !== id);
  if (user) {
    return response.json({ "data": user, "errors": [] });
  }
  else {
    return response.json({ "data": [], "errors": "user not found" });
  }
})




app.listen(3000, () => {
  console.log("listening on port 3000");
})