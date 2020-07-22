const Joi = require("joi");
const mongoose = require("mongoose");
const { typeSchema } = require("./type");

const Task = mongoose.model(
  "Tasks",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    type: {
      type: typeSchema,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      max: 455,
    },
    isCompleted: {
      type: Boolean,
    },
  })
);

function validateTask(task) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    typeId: Joi.objectId().required(),
    description: Joi.string().min(5).max(250).required(),
    isCompleted: Joi.boolean(),
  };

  return Joi.validate(task, schema);
}

exports.Task = Task;
exports.validate = validateTask;
