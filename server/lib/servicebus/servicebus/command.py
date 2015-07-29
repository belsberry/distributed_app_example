from .jsondataparser import JSONDataParser

class Message(object):

    def __init__(self, data_parser = JSONDataParser):
        self.data_parser = data_parser

    def serialize(self):
        return self._serialize()

    def deserialize(self, str_data):
        data = self.data_parser.parse_data(str_data)
        return self._deserialize(data)

    def _serialize(self):
        """
            Must override and return a data dictionary
        """
        raise NotImplemented("Must override")

    def _deserialize(self, data_dict):
        """
            Must override and use to populate properties
        """
        raise NotImplemented("Must override")

class Command(Message):
    pass

class Event(Message):
    pass
