import pika

connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))

channel = connection.channel()

channel.queue_declare(queue="addDiscussion")

channel.basic_publish(exchange="",
                      routing_key="addDiscussion",
                      body="Hello World")

print "[x] Sent Hello to queue"

connection.close()
