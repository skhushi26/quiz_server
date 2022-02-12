const mongoose = require("mongoose");

mongoose.connect(
  process.env.DB_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) console.log("Error in mongo connection ", err);
    else console.log("Mongodb connected successfully!");
  }
);
