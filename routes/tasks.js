const { Task, validate } = require("../models/task");
const { Type } = require("../models/type");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
//const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find().select("-__v").sort("name");
  res.send(tasks);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const typw = await Type.findById(req.body.typeId);
  if (!type) return res.status(400).send("Invalid type.");

  const task = new Task({
    title: req.body.title,
    type: {
      _id: type._id,
      name: type.name,
    },
    description: req.body.description,
    isComplete: req.body.isComplete,
  });

  await task.save();
  res.send(task);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = await Type.findById(req.body.typeId);
  if (!type) return res.status(400).send("Invalid type.");

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      type: {
        _id: type._id,
        name: type.name,
      },
      description: req.body.description,
      isComplete: req.body.isComplete,
    },
    { new: true }
  );

  if (!task)
    return res.status(404).send("The task with the given ID was not found.");

  res.send(task);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task)
    return res.status(404).send("The task with the given ID was not found.");

  res.send(task);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const task = await Task.findById(req.params.id).select("-__v");

  if (!task)
    return res.status(404).send("The task with the given ID was not found.");

  res.send(task);
});

module.exports = router;
