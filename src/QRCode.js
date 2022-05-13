const QR = require('qrcode-svg')

class QRCode {
  /**
 * padding - white space padding, 4 modules by default, 0 for no border
 * width - QR Code width in pixels
 * height - QR Code height in pixels
 * color - color of modules (squares), color name or hex string, e.g. #000000
 * background - color of background, color name or hex string, e.g. white
 * ecl - error correction level: L, M, H, Q
 * join - join modules (squares) into one shape, into the SVG path element, recommended for web and responsive use, default: false
 * predefined - to create a squares as pattern, then populate the canvas, default: false, see the output examples below
 * pretty - apply indents and new lines, default: true
 * swap - swap X and Y modules, only if you have issues with some QR readers, default: false
 * xmlDeclaration - prepend XML declaration to the SVG document, i.e. <?xml version="1.0" standalone="yes"?>, default: true
 * container - wrapping element, default: svg, see below
 */
  constructor (opts) {
    this.opts = opts
  }

  create (content) {
    const opts = {
      join: true,
      container: 'svg-viewbox',
      ...this.opts,
      content
    }
    return new QR(opts).svg()
  }
}

module.exports = QRCode
