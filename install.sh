#!/bin/sh

(cd web; npm install)

(cd ./server/lib/servicebus; python setup.py install)
pip install -r requirements.txt
