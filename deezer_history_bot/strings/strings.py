from httpx import Client


class Strings:
    def __init__(self, source):
        self._httpx = Client()
        self._source = source
        self._strings = {}
        self.reload_strings()

    def reload_strings(self):
        self._strings = self._httpx.get(self._source).json()

    def get_string(self, key):
        try:
            return self._strings[key]
        except KeyError:
            return f"Missing string: {key}"
