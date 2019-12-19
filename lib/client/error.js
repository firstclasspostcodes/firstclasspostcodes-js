const DOC_URL = 'https://docs.firstclasspostcodes.com/js/errors';

class ClientError extends Error {
  constructor(obj, type) {
    if (typeof obj === 'object') {
      super(obj.message);
      this.docUrl = obj.docUrl;
      this.type = obj.type;
      return this;
    }
    super(obj);
    this.docUrl = `${DOC_URL}/${type}`;
    this.type = type;
  }

  toString() {
    return `
      The follow error was encountered:
        "${this.message}"
      => See: ${this.docUrl}
    `;
  }
}

module.exports = ClientError;
