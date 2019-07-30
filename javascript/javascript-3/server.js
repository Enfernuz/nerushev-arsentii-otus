const http = require('http')

startHttpServer({
  millisecondsToImitateWork: 100,
  serverPort: 8123
})

// The implementation:

function* requestIdGenerator () {
  // a naive request id, will definitely overflow under heavy and/or prolonged load
  let initial = 1
  while (true) {
    yield initial++;
  }
};

function startHttpServer (config) {

  console.log(`Starting the server...`)

  const requestIdGen = requestIdGenerator() 
  http.createServer((req, res) => {
    const requestId = requestIdGen.next().value
    console.time(requestId)
    setTimeout(() => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end('Hello World\n')
      console.timeEnd(requestId)
    }, config.millisecondsToImitateWork)
  }).listen(config.serverPort)

  console.log(`The server is started and listening on port ${config.serverPort}.`)
};
