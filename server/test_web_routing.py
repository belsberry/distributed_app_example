import pika

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))

channel = connection.channel()

channel.exchange_declare(exchange="hello_complete",
                         type="fanout")

channel.queue_declare(queue="web_routing")

channel.queue_bind(exchange="hello_complete",
                   queue="web_routing")


def callback(ch, method, properties, body):
    print("[x] Web Routing: {0}".format(body))


channel.basic_consume(callback,
                      queue="web_routing",
                      no_ack=True)

channel.start_consuming()
