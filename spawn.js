const { spawn } = require('child_process')
const ps = spawn('ifconfig', ['en0'])
const grep = spawn('grep', ['ether'])

let realMac

ps.stdout.on('data', (data) => {
  grep.stdin.write(data)
})

ps.stderr.on('data', (data) => {
  console.log(`ps stderr: ${data}`)
})

ps.on('close', (code) => {
  if (code !== 0) {
    console.log(`ps process exited with code ${code}`)
  }
  grep.stdin.end()
})

grep.stdout.on('data', (data) => {
      realMac = data.toString()
      console.log(realMac)
      })
      // realMac = data


grep.stderr.on('data', (data) => {
  console.log(`grep stderr: ${data}`)
})

grep.on('close', (code) => {
  if (code !== 0) {
    console.log(`grep process exited with code ${code}`)
  }
})
