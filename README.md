# distributed_app_example

Setup
* Install RabbitMQ

Run 
* Start virtualenv with "source activate.sh" in the shell
* Run "source install.sh" to install requirements
* Run "python server/domain_server/server.py & python server/replicate_server/server.py" to start the backend servers
* Run in another shell "cd web; node app.js"
* Navigate to localhost:8000
