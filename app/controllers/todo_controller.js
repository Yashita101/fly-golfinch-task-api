const db = require("../models");
const ToDo = db.toDos;

//Create a toDo
exports.create = (req, res) => {
	if (!req.body.title && !req.body.id) {
    res.status(400).send({ message: "All fields must be filled!" });
    return;
  }

  const toDo = new ToDo({
	id: req.body.id,
    title: req.body.title,
    is_complete: req.body.is_complete ? req.body.is_complete : false
  });
  
  toDo
    .save(toDo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      });
    });
};
  


//Retrieve all ToDos from the database.
exports.searchAll = (req, res) => {
  const id = req.params.id;

  ToDo.find(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      });
    });
};

//Search for a single ToDo with an id
exports.searchOne = (req, res) => {
	const id = req.params.id;

  ToDo.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found ToDo with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving ToDo with id=" + id });
    });
};
  


//Update a ToDo when id is given
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update must be filled!"
    });
  }

  const id = req.params.id;

  ToDo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update ToDo with id=${id}!`
        });
      } else res.send({ message: "ToDo updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating ToDo with id=" + id
      });
    });
};



//Delete a ToDo with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  ToDo.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete ToDo with id=${id}!`
        });
      } else {
        res.send({
          message: "ToDo deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ToDo with id=" + id
      });
    });
};


