from httpx import Client


class Strings:
    def __init__(self, source):
        self._httpx = Client()
        self._source = source
        self._strings = {}
        self.reload_strings()

    def reload_strings(self):
        self._strings = self._httpx.get(self._source).json()

    def get_languages(self):
        return {
            lang: self._strings[lang]['name']
            for lang in self._strings
        }

    def get_string(self, lang, key):
        try:
            return self._strings[lang][key]
        except KeyError:
            return f"Missing string: {lang} - {key}"
