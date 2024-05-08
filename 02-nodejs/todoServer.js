"use strict";
/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());

app.get("/todos", async (req, res) => {
  try {
    const todos = await fs.readFile("todos.json", "utf-8");
    return res.status(200).send(JSON.parse(todos));
  } catch {
    return res.status(500).send("Sorry Website is Down");
  }
});

app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description)
    return res.status(400).send({ message: "All fields are required" });
  try {
    const notes = json.parse(await fs.readFile("todos.json", "utf-8"));
    const length = notes.length;
    const newNote = {
      title,
      completed: false,
      description,
      id: length + 1,
    };
    notes.push(newNote);
    await fs.writeFile("todos.json", JSON.stringify(notes));
    return res.status(201).send({ note: newNote });
  } catch {
    res.status(500).send({ message: "Error while creating note" });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const notes = json.parse(await fs.readFile("todos.json", "utf-8"));
    const note = notes.find((todo) => todo.id === id);
    if (!note) {
      return res.status(404).send({ message: "Not Found" });
    }
    return res.status(200).send(note);
  } catch {
    return res.status(500).send("Error");
  }
});

app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const { title, completed, description } = req.body;
  try {
    const notes = JSON.parse(await fs.readFile("todos.json", "utf-8"));
    const todoElement = notes.find((todo) => todo.id === id);
    if (!todoElement) {
      return res.status(404).send({ message: "provide valid id of todo" });
    }
    if (!title && !description && !completed) {
      return res.status(400).send({ message: "No change was provided!" });
    }
    if (title) {
      todoElement.title = title;
    }
    if (description) {
      todoElement.description = description;
    }
    if (completed) {
      todoElement.completed = completed;
    }
    await fs.writeFile("todos.json", JSON.stringify(data));
    return res.status(200).send(todoElement);
  } catch {
    return res.status(500).send("Error");
  }
});

app.delete("todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let data = JSON.parse(await fs.readFile("todos.json", "utf-8"));
    const filteredData = data.filter((todo) => todo._id !== id);
    if (filteredData.length === data.length) {
      return res.status(404).send({ message: "Todo not found!" });
    }
    data = filteredData;
    await fs.writeFile("todos.json", JSON.stringify(data), (err) => {
      if (err) return res.status(500).send("Error writing to file!");
    });
    return res.status(200).send({ message: "Todo deleted successfully" });
  } catch {
    return res.status(404).send("Not Found");
  }
});

module.exports = app;
