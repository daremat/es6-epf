const config = require('./config');
const _ = require('lodash');
const chalk = require('chalk');

// express
const express = require('express');
const cors = require('cors');

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const specs = swaggerJsdoc(config.swagger);
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /board:
 *    get:
 *      summary: generates a new meme-ory game board
 *      description: Return pairs of shuffled card ids
 *      parameters:
 *        - in: query
 *          name: size
 *          schema:
 *            type: integer
 *          required: true
 *          description: "Size (ie: amount of card) of the generated board"
 *      responses:
 *        - '200':
 *          description: game board generated
 *          content:
 *            application/json:
 *        - '400':
 *          description: the parameter 'size' is missing
 */

/**
 *
 * @nb nbImages number of images in your project
 * @size boardSize the board size
 */
app.get('/board', (req, res) => {
    const size = req.query.size && parseInt(req.query.size);

    if (!size) {
        return res.status(400).send('Missing parameter "size"')
    }

    res.json({'ids': _.shuffle([...Array(size).keys(), ...Array(size).keys()])});
});

app.listen(config.port, () => {
    console.log(chalk.bold.green(
`*****************
Meme-ory app started up!
*****************
`));
    console.log(`Check out the OpenAPI server documentation at the following address:`);
    console.log(chalk.blue.bold(`       http://${config.host}:${config.port}/api-docs/`));
});
