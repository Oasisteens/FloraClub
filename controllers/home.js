const path = require("path");

const home = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/general.ejs`));
};

module.exports = {
  getHome: home
};