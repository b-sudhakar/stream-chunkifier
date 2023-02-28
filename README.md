# stream-chunkify

Impressed by `stream-chunker` another stream chunker which chunks incoming stream into evenly sized chunks using [stream simplified construction](https://nodejs.org/api/stream.html#simplified-construction), no dependency on through2. 

TODO: 
Add support to chunk sterams by delimter


## Install

```
$ npm install
```

## Usage

```js

const {sizeChunkifier} = require('stream-chunkifier');
const chunkify = sizeChunkifier(8)
const readSream=someHowGetReadStream() // Eg fs.createReadStream('filepath')

readStream
.pipe(chunkify)
.pipe(consumerExpects8ByteChunks());

```

## API

#### `
const {sizeChunkifier} = require('stream-chunkifier');
const chunkify = sizeChunkifier(chunkSize)`
Returns a new chunker. Chunker is a duplex (transform) stream, regardless of incoming chunk sizes, it emits evenly sized chunks. The last chunk could be smaller.

- `chunkSize`: `integer` - Size in bytes of the desired chunks.



## License
MIT