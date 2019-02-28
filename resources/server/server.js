const express = require('express');
const cors = require('cors');
const server = express();
server.use(cors());

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

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
  const imagesId = shuffle([...Array(nb).keys()]);
  const sliced = imagesId.slice(0, size);
  const boardImagesIds = shuffle(sliced.concat(sliced));
  res.json({'ids': boardImagesIds});
});

server.listen(8081, console.log(`Call localhost:8081/?nb=<number>&size=<number>`));