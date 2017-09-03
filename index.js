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

console.log(`
  note your real & own mac address. Run
  ⫸ ifconfig en0 | grep ether
  Set new random mac *with real vendor*
  ⫸ sudo ifconfig en0 ether ${finalMac.join('').slice(0, -1)}
  turn off & on wifi
  ⫸ networksetup -setairportpower en0 off
  ⫸ networksetup -setairportpower en0 on
`);
