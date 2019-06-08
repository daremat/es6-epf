const express = require('express');
const cors = require('cors');
const _ = require('lodash');
const server = express();
server.use(cors());

/**
 * Return pairs of shuffled ids
 * @nb nbImages number of images in your project
 * @size boardSize the board size
 */
server.get('/', (req, res) => {
  const nb = req.query.nb && parseInt(req.query.nb);
  const size = req.query.size && parseInt(req.query.size);
  if (!nb || !size) {
    return res.status(500).send('BAD REQUEST, format your url like : localhost:8081/?nb=10&size=4')
  }
  const imagesId = _.shuffle([...Array(nb).keys()]);
  const sliced = imagesId.slice(0, size);
  const boardImagesIds = _.shuffle(sliced.concat(sliced));
  res.json({'ids': boardImagesIds});
});

server.listen(8081, console.log(`Call localhost:8081/?nb=<number>&size=<number>`));