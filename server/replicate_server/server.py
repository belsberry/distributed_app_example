import pika

print("starting replicate server")

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))

channel = connection.channel()

channel.exchange_declare(exchange="hello_complete",
                         type="fanout")

result = channel.queue_declare(queue="replicate")

channel.queue_bind(exchange="hello_complete",
                   queue="replicate")

def callback(ch, method, properties, body):
    print("[x] Received {0}".format(body))

channel.basic_consume(callback,
                      queue="replicate",
                      no_ack=True)

channel.start_consuming()
