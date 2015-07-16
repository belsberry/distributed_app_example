import pika

print("starting domain server")

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))

channel = connection.channel()

channel.queue_declare(queue="hello")
channel.queue_declare(queue="replicate")

def callback(ch, method, properties, body):

    print("[x] Received {0}".format(body))
    channel.basic_publish(exchange="",
                          routing_key="replicate",
                          body="Replicated: {0}".format(body))


channel.basic_consume(callback,
                      queue="hello",
                      no_ack=True)

channel.start_consuming()
