import pika

print("starting domain server")

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))

channel = connection.channel()

channel.exchange_declare(exchange="discussionAdded",
                         type="fanout")

channel.queue_declare(queue="addDiscussion")


def callback(ch, method, properties, body):
    print("[x] Received {0}".format(body))
    channel.basic_publish(exchange="discussionAdded",
                          routing_key="",
                          body="Complete: {0}".format(body))


channel.basic_consume(callback,
                      queue="addDiscussion",
                      no_ack=True)

channel.start_consuming()
