var crypto = require('crypto');
module.exports = {
  md5(password) {
      var md5 = crypto.createHash('md5');
      return md5.update(password).digest('hex');
  }
}