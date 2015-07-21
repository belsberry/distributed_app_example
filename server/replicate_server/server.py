import pika

print("starting replicate server")

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))

channel = connection.channel()

channel.exchange_declare(exchange="discussionEvents",
                         type="fanout")

result = channel.queue_declare(queue="replicateDiscussionAdded")

channel.queue_bind(exchange="discussionEvents",
                   routing_key="discussionAdded",
                   queue="replicateDiscussionAdded")

def callback(ch, method, properties, body):
    print("[x] Received {0}".format(body))

channel.basic_consume(callback,
                      queue="replicateDiscussionAdded",
                      no_ack=True)

channel.start_consuming()
