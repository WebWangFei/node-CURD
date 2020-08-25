const Category = require("./category.model.js");

//Create new Category
exports.create = (req, res) => {
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: "category content can not be empty"
    });
  }

  // Create a Category
  const category = new Category({
    name: req.body.name,
    nickName: req.body.nickName,
    icon: req.body.icon,
    pid: req.body.pid,
    hasChildren: false
  });

  // Save Category in the database
  category
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the category."
      });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
  Category.find()
    .then(products => {
      res.send(products);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving products."
      });
    });
};

// Find a single category with a productId
exports.findOne = (req, res) => {
  Category.findById(req.params.productId)
    .then(category => {
      if (!category) {
        return res.status(404).send({
          message: "Category not found with id " + req.params.productId
        });
      }
      res.send(category);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Category not found with id " + req.params.productId
        });
      }
      return res.status(500).send({
        message:
          "Something wrong retrieving category with id " + req.params.productId
      });
    });
};
exports.find = (req, res) => {
  console.log(11, req.params);
  Category.find({})
    .where("pid", req.params._id)
    .then(category => {
      if (!category) {
        return res.status(404).send({
          message: "Category not found with id " + req.params.productId
        });
      }
      res.send(category);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Category not found with id " + req.params.productId
        });
      }
      return res.status(500).send({
        message:
          "Something wrong retrieving category with id " + req.params.productId
      });
    });
};

// Update a category
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Category content can not be empty"
    });
  }

  // Find and update category with the request body
  Category.findByIdAndUpdate(
    req.params.productId,
    {
      name: req.body.name,
      nickName: req.body.nickName,
      icon: req.body.icon,
      pid: req.body.pid,
      hasChildren: false
    },
    { new: true }
  )
    .then(category => {
      if (!category) {
        return res.status(404).send({
          message: "Category not found with id " + req.params.productId
        });
      }
      res.send(category);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Category not found with id " + req.params.productId
        });
      }
      return res.status(500).send({
        message: "Something wrong updating note with id " + req.params.productId
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params.productId)
    .then(category => {
      if (!category) {
        return res.status(404).send({
          message: "Category not found with id " + req.params.productId
        });
      }
      res.send({ message: "Category deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Category not found with id " + req.params.productId
        });
      }
      return res.status(500).send({
        message: "Could not delete category with id " + req.params.productId
      });
    });
};
