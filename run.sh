#!/bin/sh

source run_workers.sh &
(cd web; node app.js)
