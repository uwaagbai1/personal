import environ
env = environ.Env()
environ.Env.read_env()

DEBUG = False
ALLOWED_HOSTS = ["www.wacodev.com.ng", "wacodev.com.ng"]
DATABASES = {
    
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'table_name',
        'USER': env("DB_USER"),
        'PASSWORD': env("DB_PASS"),
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
SECURE_PROXY_SSL_HOSTS = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_PRELOAD = True
SECURE_HSTS_INCLUDE_SUBDOMAINS = True