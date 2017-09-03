const { execSync } = require('child_process');

const fs = require('fs')
const mac = fs.readFileSync('oui-mac.txt', 'utf8')
const macArray = mac.split("\n")
let validVendorMacs = []

for ( i in macArray) {
  validVendorMacs.push(macArray[i].split(' ')[0].toLowerCase().split(""))
}

const randomValidVendorMac = validVendorMacs[Math.floor((Math.random() * validVendorMacs.length) +1)]

let userMac = [...Array(6)]

for (let i = 0; i < userMac.length; i++) {
  userMac[i] = (Math.floor(Math.random()*16).toString(16));
}

let finalMac = [...randomValidVendorMac,...userMac]

let finalMacStr

for (let i = 0; i < finalMac.length; i++) {
  if (i % 2 === 1) finalMac[i] += ':'
}

const { spawn } = require('child_process')
const ifconfig = spawn('ifconfig', ['en0'])
const grep = spawn('grep', ['ether'])
let realMac

ifconfig.stdout.on('data', (data) => {
  grep.stdin.write(data)
})

ifconfig.stderr.on('data', (data) => {
  console.log(`ifconfig stderr: ${data}`)
})

ifconfig.on('close', (code) => {
  if (code !== 0) {
    console.log(`ifconfig process exited with code ${code}`)
  }
  grep.stdin.end()
})

grep.stdout.on('data', (data) => {
      realMac = data.toString().split(" ")
      console.log(realMac[1]);
      })

grep.stderr.on('data', (data) => {
  console.log(`grep stderr: ${data}`)
})

grep.on('close', (code) => {
  if (code !== 0) {
    console.log(`grep process exited with code ${code}`)
  }
})


console.log(`
  write down your real-own mac address. Run
  ⫸ ifconfig en0 | grep ether
  Set new random mac *with real vendor*
  ⫸ sudo ifconfig en0 ether ${finalMac.join('').slice(0, -1)}
  turn off & on wifi
  ⫸ networksetup -setairportpower en0 off
  ⫸ networksetup -setairportpower en0 on
`);

// let en0down = execSync('networksetup -setairportpower en0 off')
// let en0up = execSync('networksetup -setairportpower en0 on')
