#!/usr/bin/env bash

server="10.90.0.218"
username="webrtc"
password="webrtc"

# yarn build

scp -r ./dist/* $username@$server:/data/junqiang/fls/fls-v0.0.4/

ssh $username@$server