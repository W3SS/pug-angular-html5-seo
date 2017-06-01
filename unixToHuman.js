var moment = require('moment');
module.exports = function (unix) {
  return moment.unix(unix).format('dddd, MMMM Do YYYY, h:mm:ss A');
};