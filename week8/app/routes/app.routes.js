module.exports = app => {
    const tutorials = require("../controllers/app.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tutorials.create);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);

    app.use('/api/tutorials', router);
  };