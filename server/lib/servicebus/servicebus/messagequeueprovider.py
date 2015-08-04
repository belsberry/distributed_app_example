import pika

class MessageQueueProvider(object):
    def register_handler(self, handler):
        raise


class AMQPMessageQueueProvider(object):
    def __init__(self, connection_string=""):
        if connection_string =="":
            connection_string = "localhost"
        self.channel = pika.BlockingConnection(pika.ConnectionParameters(connection_string))

    def register_handler(self, handler):
        if handler.is_event_handler:
            self.channel.exchange_declare(exchange=handler.get_message_type_name(),
                                          type="fanout")
            self.channel.queue_declare(queue=handler.get_handler_name())
            self.channel.queue_bind(exchange=handler.get_message_type_name(),
                                    queue=handler.get_handler_name(),
                                    routing_key="")
            self.channel.basic_consume(handler.
                                        queue=)
