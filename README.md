# random-mac-address-generator

I've just been bored in Flixbus going from Vienna, so I made another random mac generator.
They have limits 150M/day/mac address. Let's fix it.

```js
  write down your real-own mac address. Run
  ⫸ ifconfig en0 | grep ether
  Set new random mac *with real vendor*
  ⫸ sudo ifconfig en0 ether 00:20:2f:bd:84:e2
  turn off & on wifi
  ⫸ networksetup -setairportpower en0 off
  ⫸ networksetup -setairportpower en0 on
```
Source of IEEE mac address
  * [http://standards.ieee.org/develop/regauth/oui/oui.txt](http://standards.ieee.org/develop/regauth/oui/oui.txt)

```sh
awk '$0 ~ "(hex)"{$2="";gsub("-","");print}' \
       oui.txt > oui-mac.txt
```

### credits

* https://github.com/Boruch-Baum/mac_changer_choice
* search github for random mac generator
