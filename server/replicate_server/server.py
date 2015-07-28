import pika
import json
from  pymongo import MongoClient

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
    db = MongoClient("mongodb://localhost:27017")
    discussions = db.discussions
    coll_discussions = discussions.discussions
    new_discussion = json.loads(body)
    coll_discussions.insert_one(new_discussion)




channel.basic_consume(callback,
                      queue="replicateDiscussionAdded",
                      no_ack=True)

channel.start_consuming()
