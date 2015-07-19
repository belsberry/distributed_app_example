import pika

print("starting domain server")

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))

channel = connection.channel()

channel.exchange_declare(exchange="hello_complete",
                         type="fanout")
channel.queue_declare(queue="hello")

def callback(ch, method, properties, body):

    print("[x] Received {0}".format(body))
    channel.basic_publish(exchange="hello_complete",
                          routing_key="",
                          body="Complete: {0}".format(body))


channel.basic_consume(callback,
                      queue="hello",
                      no_ack=True)

channel.start_consuming()
