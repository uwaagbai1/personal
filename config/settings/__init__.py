from .base import *

if env("PERSONAl") == 'development':
   from .development import *
else:
   from .production import *