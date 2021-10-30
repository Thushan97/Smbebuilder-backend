const utils = require("../utils/utils");

require("express-async-errors");

const openProject = async (req, res) => {
  res.send("https://app.smbebuilder.com/app/builder.html");
};

module.exports = {
  openProject,
};
