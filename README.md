# random-mac-address-generator

I've just been bored in Flixbus going from Vienna, so I made another random mac generator.
They have limits 150M/day/mac address. Let's fix it.

Source of IEEE mac address
  * [http://standards.ieee.org/develop/regauth/oui/oui.txt](http://standards.ieee.org/develop/regauth/oui/oui.txt)

```sh
awk '$0 ~ "(hex)"{$2="";gsub("-","");print}' \
       oui.txt > oui-mac.txt
```

### credits

* https://github.com/Boruch-Baum/mac_changer_choice
* search github for random mac generator
