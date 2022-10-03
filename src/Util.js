
const isHexRegex = /^[0-9A-Fa-f]+$/g

class Util {
  /**
   * Indicates if parameter is a hex encoded string
   * @param {string} hex encoded string
   * @returns {boolean} Whether string is hex encoded
   */
  static isHex(hex) {
    return isHexRegex.test(hex)
  }

  /**
   * Decodes hex encoded string into a buffer
   * @param {string} hex encoded string
   * @returns {Buffer}
   */
  static fromHex(hex) {
    return Buffer.from(hex, 'hex')
  }

  /**
   * Decodes base64 encoded string into a buffer
   * @param {string} base64 encoded string
   * @returns {Buffer}
   */
  static fromBase64(base64) {
    return Buffer.from(base64, 'base64')
  }

  /**
   * Encodes buffer into hex encoded string
   * @param {Buffer} buff
   * @returns {string} hex encoded string
   */
  static toHex(buff) {
    return buff.toString('hex')
  }

  /**
   * Encodes buffer into base64 encoded string
   * @param {Buffer} buff
   * @returns {string} base64 encoded string
   */
  static toBase64(buff) {
    return buff.toString('base64')
  }

  /**
   * Encodes hex encoded string into a base64 encoded string
   * @param {string} hex
   * @returns {string} base64 encoded string
   */
  static hexToBase64(hex) {
    return this.toBase64(this.fromHex(hex))
  }

  /**
   * Encodes base64 encoded string into a hex encoded string
   * @param {string} base64
   * @returns {string} hex encoded string
   */
  static base64ToHex(base64) {
    return this.toHex(this.fromBase64(base64))
  }

  // https://stackoverflow.com/questions/40031688/javascript-arraybuffer-to-hex
  static byteArrayToHexString = (byteArray) => {
    return Array.from(byteArray, function (byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }
}

module.exports = Util
