const http = require('http')

createTester(process.argv).test({
  hostname: 'localhost',
  port: 8123,
  method: 'POST' // to avoid caching
})

// The implementation:

function* asyncRequestGenerator (numberOfRequests, opts) {
	
   for (let i = 1; i <= numberOfRequests; i++) {
     yield sendRequestAsync(i, opts);
   }
};

function sendRequestAsync (reqId, opts) {
	
  return new Promise((resolve, reject) => {

	  console.log(`Sending the request ${reqId}...`)

	  const request = http.request(opts);
	  request.on('error', (err) => {
	    console.error(`Failed to send the request ${reqId}. Reason: ${err.message}`)
        reject()
      })

	  request.end(() => {
		  console.log(`The request ${reqId} has been sent.`)
		  resolve()
	  })
  })
};

async function sendRequestsSequentially (numberOfRequests, opts) {
  for await (const reqPromise of asyncRequestGenerator(numberOfRequests, opts)) {
  }
};

async function sendRequestsInParallel (numberOfRequests, opts) {

  const promises = []
  for (const reqPromise of asyncRequestGenerator(numberOfRequests, opts)) {
    promises.push(reqPromise);
  }

  Promise.all(promises)
};

function createTester (commandLineArgs) {

  const args = commandLineArgs.slice(2)

  const numberOfRequests = parseInt(args[0])
  if (isNaN(numberOfRequests)) {
    throw new Error("Couldn't parse the number of requests from `${args[0]}`")
  }

  const requestType = args[1]
  let send
  switch (requestType) {
    case 'sync':
      send = sendRequestsSequentially
      break
    case 'async':
      send = sendRequestsInParallel
      break
    default:
        throw new Error("The request type must be either 'sync' or 'async', not '`${args[1]}`'")
  }

  return {
    test: (opts) => send(numberOfRequests, opts)
  }
};
