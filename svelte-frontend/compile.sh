#!/bin/bash
npm run build

cp public/build/voiceit2.js ../dist
cp public/build/voiceit2.js ../node-server-example/public/js/
cp public/build/voiceit2.js ../php-server-example/js/ 

cp public/build/voiceit2.js.map ../dist
cp public/build/voiceit2.js.map ../node-server-example/public/js/
cp public/build/voiceit2.js.map ../php-server-example/js/ 

cp public/build/voiceit2.css ../dist
cp public/build/voiceit2.css ../node-server-example/public/css/
cp public/build/voiceit2.css ../php-server-example/css/
