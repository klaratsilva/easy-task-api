const { Type } = require("./models/type");
const { Task } = require("./models/task");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    name: "Work",
    tasks: [
      {
        title: "App Coding",
        description: "use react and next",
        isCompleted: false,
      },
      { title: "Excel", description: "use windows", isCompleted: false },
    ],
  },
  {
    name: "Hobby",
    tasks: [
      { title: "drawing", description: "at 5pm", isCompleted: false },
      { title: "exercise", description: "take matt", isCompleted: false },
    ],
  },
  {
    name: "Garden",
    tasks: [
      {
        title: "water plants",
        description: "clean balcony after",
        isCompleted: false,
      },
      {
        title: "collect tomato",
        description: "collect tomato",
        isCompleted: false,
      },
    ],
  },
  {
    name: "Home",
    tasks: [
      {
        title: "clean living room",
        description: "clean until 5pm",
        isCompleted: false,
      },
      { title: "order food", description: "continente", isCompleted: false },
    ],
  },
];

async function seed() {
  await mongoose.connect("mongodb://localhost/easy-task");

  await Task.deleteMany({});
  await Type.deleteMany({});

  for (let type of data) {
    const { _id: typeId } = await new Type({ name: type.name }).save();
    const tasks = type.tasks.map((task) => ({
      ...task,
      type: { _id: typeId, name: type.name },
    }));
    await Task.insertMany(tasks);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
