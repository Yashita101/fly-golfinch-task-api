module.exports = app => {
  const toDo = require("../controllers/todo_controller.js");

  var router = require("express").Router();

  //Create a new ToDo
  router.post("", toDo.create);

  //Retrieve all ToDos
  app.get("/todos", toDo.searchAll);


  //Retrieve a single ToDo by entering id
  router.get("/:id", toDo.searchOne);

  //Update toDo by entering id
  router.put("/:id", toDo.update);

  //Delete a toDo entering id
  router.delete("/:id", toDo.delete);

  app.use('/todo', router);
};