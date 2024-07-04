const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://minhduy1:minhduy1@course365.yv7zylv.mongodb.net/?appName=course365",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("connect successfully!!!!");
  } catch (error) {
    console.log("connect failed!!!!");
  }
}

module.exports = { connect };
