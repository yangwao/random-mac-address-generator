const fs = require('fs')
const mac = fs.readFileSync('oui-mac.txt', 'utf8')
const macArray = mac.split("\n")
let validVendorMacs = []

for (let i in macArray) {
  validVendorMacs.push(macArray[i].split(' ')[0].toLowerCase().split(""))
}

const randomValidVendorMac =
  validVendorMacs[Math.floor((Math.random()
  * validVendorMacs.length) + 1)]

let userMac = [...Array(6)]
for (let i = 0; i < userMac.length; i++) {
  userMac[i] = (Math.floor(Math.random() * 16).toString(16));
}

const finalMacArray = [...randomValidVendorMac, ...userMac]
const finalMacAddress =
  finalMacArray.map((n, i) => i % 2 ? n + ':' : n).join('').slice(0, -1);

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
  console.log(`
    write down your real(own) mac address
    ⫸ ifconfig en0 | grep ether
    => your current mac address is ${realMac[1]}
    Set new random mac with real vendor
    ⫸ sudo ifconfig en0 ether ${finalMacAddress}
    Turn Off & On wifi
    ⫸ networksetup -setairportpower en0 off
    ⫸ networksetup -setairportpower en0 on
  `)
})

grep.stderr.on('data', (data) => {
  console.log(`grep stderr: ${data}`)
})

grep.on('close', (code) => {
  if (code !== 0) {
    console.log(`grep process exited with code ${code}`)
  }
})

// let en0down = execSync('networksetup -setairportpower en0 off')
// let en0up = execSync('networksetup -setairportpower en0 on')
