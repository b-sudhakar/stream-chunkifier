const { Transform } = require('node:stream')

function chunkify (chunksize, options) {
  const chukifyOtions = options || { flushLastOddChunk: true }
  let lastChunk = Buffer.alloc(0)
  const transform = function (chunk, enc, callback) {
    const recivedData = Buffer.concat([lastChunk, chunk])
    const remainingLength = recivedData.length % chunksize

    let endIndex
    let ix = 0

    while ((endIndex = (ix + chunksize)) <= recivedData.length) {
      const chunkBuffer = recivedData.subarray(ix, endIndex)
      this.push(chunkBuffer)
      ix += chunksize
    }

    if (remainingLength > 0) {
      lastChunk = recivedData.subarray(recivedData.length - remainingLength, recivedData.length)
    } else {
      lastChunk = Buffer.alloc(0)
    }

    callback()
  }

  function flushLastChunk (callback) {
    if (lastChunk && lastChunk.length) {
      this.push(lastChunk)
    }
    callback()
  }

  return new Transform({
    transform,
    flush: chukifyOtions.flushLastOddChunk ? flushLastChunk : undefined
  })
}

module.exports = chunkify
