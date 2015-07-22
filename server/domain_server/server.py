import pika

print("starting domain server")

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))

channel = connection.channel()

channel.exchange_declare(exchange="discussionEvents",
                         type="fanout")

channel.queue_declare(queue="addDiscussion")

def callback(ch, method, properties, body):
    print("[x] Domain Received {0}".format(body))
    channel.basic_publish(exchange="discussionEvents",
                          routing_key="discussionAdded",
                          body=body)


channel.basic_consume(callback,
                      queue="addDiscussion",
                      no_ack=True)

channel.start_consuming()
