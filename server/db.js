const mongoose = require("mongoose");

var url =
  "mongodb+srv://xinyuanzheng001:Goumb061@cluster0.v6miz.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url, () => {
  console.log("MongoDB connected");
});

module.exports.mongoose = mongoose;
