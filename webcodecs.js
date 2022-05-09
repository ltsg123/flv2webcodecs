let decoder;

function initDecoder(func) {
  const decorderInit = {
    output: func,
    error: (e) => {
      console.log(e.message);
    }
  };

  decoder = new VideoDecoder(decorderInit);

  const config = {
    codec: 'avc1.42002a',
    codedWidth: 1920,
    codedHeight: 1080,
    hardwareAcceleration: 'no-preference',
  };
  decoder.configure(config);
}

function inputChunk(data, pts, iskey) {
  console.log(data, pts, iskey)
  const chunk = new EncodedVideoChunk({
    timestamp: pts,
    type: iskey ? 'key' : 'delta',
    data: data
  });
  decoder.decode(chunk);
}

function concatUint8(...args) {
  const length = args.reduce((len, cur) => (len += cur.byteLength), 0);
  const result = new Uint8Array(length);

  let offset = 0;
  args.forEach(uint8 => {
    result.set(uint8, offset);
    offset += uint8.byteLength;
  });

  return result;
}