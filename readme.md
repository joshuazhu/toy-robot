# toy-robot

## Installation:

- Install `Node.js` via https://nodejs.org/ and `Yarn` via https://classic.yarnpkg.com/en/docs/install/#mac-stable

- Install `node_modules`:

   `$ yarn`

## Running the app:

- Run application:

   `$ node index.js `

## Running the tests

- Run tests:

   `$ yarn test`


## Implementation:
- Since Robot receives and executes command, I decided to use `Command Pattern` to implement it, which helps to decouple the logic of command invoker and executer. In addition, `Command Pattern` brings the flexibility to add new commands.
![Toy Robot Diagram](https://josh-zhu-assets.s3.amazonaws.com/Toy+Robot+Diagram.png)

