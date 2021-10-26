module.exports = function (err, req, res, next) {
  console.log(err);
  res.send({ status: false, msg: "Internal Server Error" });
};
