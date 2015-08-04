from .jsondataparser import JSONDataParser
class MessageBusServer(object):
    def __init__(self, data_parser=JSONDataParser, messagequeueprovider=None ):
        self.data_parser = data_parser
        self.__handlers__ = []
        if(messagequeueprovider is None):
            messagequeueprovider =

    def add_handler(self, new_handler):
        self.__handlers__.push(new_handler)

    def run(self):
        self.setup_queues()
        self.register_callbacks()
        self.start_consuming()
