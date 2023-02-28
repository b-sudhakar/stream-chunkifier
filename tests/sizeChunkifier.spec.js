
const { expect } = require('chai')
const { Readable } = require('stream')
const chunkify = require('../src/sizeChunkifier')

describe('Chunkify tests', () => {
  it('Chunks incoming stream into fixed size chunks', (done) => {
    const readable = new Readable()
    readable.push(Buffer.from('aaaab'))
    readable.push(Buffer.from('bbb'))
    readable.push(Buffer.from('ccccddd'))
    readable.push(Buffer.from('d'))
    readable.push(null)

    const receivedChunks = []

    readable.pipe(chunkify(4))
      .on('data', (chunk) => {
        receivedChunks.push(chunk.toString())
      })
      .on('end', () => {
        expect(receivedChunks).to.include.members(
          ['aaaa', 'bbbb', 'cccc', 'dddd']
        )

        done()
      })
  })

  it('Process last odd chunk has ramining data when no options are passed', (done) => {
    const readable = new Readable()
    readable.push(Buffer.from('aaaab'))
    readable.push(null)

    const receivedChunks = []

    readable.pipe(chunkify(4))
      .on('data', (chunk) => {
        receivedChunks.push(chunk.toString())
      })
      .on('end', () => {
        expect(receivedChunks).to.include.members(
          ['aaaa', 'b']
        )
        done()
      })
  })

  it('Doesnot process last odd chunk', (done) => {
    const readable = new Readable()
    readable.push(Buffer.from('aaaab'))
    readable.push(null)

    const receivedChunks = []

    readable.pipe(chunkify(4, { flushLastOddChunk: false }))
      .on('data', (chunk) => {
        receivedChunks.push(chunk.toString())
      })
      .on('end', () => {
        expect(receivedChunks).to.include.members(
          ['aaaa']
        )
        done()
      })
  })
})
