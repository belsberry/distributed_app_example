import pika

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))

channel = connection.channel()

channel.exchange_declare(exchange="discussionEvents",
                         type="fanout")

channel.queue_declare(queue="webDiscussionComplete")

channel.queue_bind(exchange="discussionEvents",
                   routing_key="discussionAdded",
                   queue="webDiscussionComplete")


def callback(ch, method, properties, body):
    print("[x] Web Routing: {0}".format(body))


channel.basic_consume(callback,
                      queue="webDiscussionComplete",
                      no_ack=True)

channel.start_consuming()
