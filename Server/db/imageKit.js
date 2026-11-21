const ImageKit = require("@imagekit/nodejs").default;

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

module.exports = imageKit;