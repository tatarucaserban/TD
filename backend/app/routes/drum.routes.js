module.exports = app => {
  const drums = require("../controllers/drums.controller.js");

  let router = require("express").Router();

  // Create a new Drum
  router.post("/", drums.create);

  // Retrieve all Tutorials
  router.get("/", drums.findAll);

  // Retrieve all published Tutorials
  router.get("/type", drums.findAllDrumType);

  // Retrieve a single Drum with id
  router.get("/:id", drums.findOne);

  // Update a Drum with id
  router.put("/:id", drums.update);

  // Delete a Drum with id
  router.delete("/:id", drums.delete);

  // Delete all Tutorials
  router.delete("/", drums.deleteAll);

  app.use("/api/drums", router);
};
