#!/bin/sh
source activate.sh
source install.sh

source run_workers.sh &
(cd web; node app.js)
