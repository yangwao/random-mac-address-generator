#!/bin/bash
NEWETHER=$1
echo 'your actual mac address, note it for god'
ifconfig en0 | grep ether
sudo ifconfig en0 ether $NEWETHER
networksetup -setairportpower en0 off
networksetup -setairportpower en0 on
echo 'have fun with your new address' $NEWETHER
