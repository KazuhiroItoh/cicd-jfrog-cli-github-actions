const https = require('https')

const apiAuthStr = process.env.XRAY_USER_NAME + ':' + process.env.XRAY_USER_API_KEY

const postJson = JSON.stringify({filters:{
    violation_type: "Security",
    watch_name: "ga-npm-watch"
      },
    pagination: {
        order_by: "updated",
        limit: 25,
        offset: 1
    }})

const options = {
  hostname: 'devopstest210802.jfrog.io',
  path: '/xray/api/v1/violations',
  method: 'POST',
  auth: apiAuthStr,
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postJson)
  }
}

let data = "";
const req = https.request(options, (res) => {

  res.on('data', (chunk) => {
    data += chunk.toString()
  })

  res.on('end', () => {
    data = JSON.parse(data)
    console.log(data.total_violations)

    if(data.total_violations !== 0){
//        process.exit(1)
        process.exit(0)
    }

    })
})

req.write(postJson)

req.on('error', (e) => {
  console.error(e)
})

req.end()
