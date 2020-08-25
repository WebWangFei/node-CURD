module.exports = app => {
  const category = require("./category.controller.js");

  // Create a new Product
  app.post("/category", category.create);

  // Retrieve all Products
  app.get("/category", category.findAll);

  // Retrieve a single Product with productId
  app.get("/category/:productId", category.findOne);

  app.get("/category/find/:_id", category.find);

  // Update a Note with productId
  app.put("/category/:productId", category.update);

  // Delete a Note with productId
  app.delete("/category/:productId", category.delete);
};
