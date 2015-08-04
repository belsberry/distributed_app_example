class Handler(object):
    def handle_message(self, message):
        raise "Must Implement handle_message()"

    def is_event_handler(self):
        return False

    def is_command_handler(self):
        return False

    def get_handler_name(self):
        raise "Must Implement get_handler_name"

    def get_message_type_name(self):
        raise "Must Implement get_message_type_name"
