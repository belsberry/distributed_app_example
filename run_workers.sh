#!/bin/sh

python server/domain_server/server.py &
python server/replicate_server/server.py
