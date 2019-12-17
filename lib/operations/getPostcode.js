const base = require('./base');

module.exports = {
  __proto__: base,

  async getPostcode() {
    console.log(`Key is: ${this.key}`);
    this.debug('debugged value....');
    super.request();
    return true;
  },
};
