from ..config import STRINGS

from .strings import Strings

strings = Strings(STRINGS)
reload_strings = strings.reload_strings
get_string = strings.get_string
get_languages = strings.get_languages
