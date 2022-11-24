from functools import lru_cache
from google.cloud import storage
from settings import get_settings

app_settings = get_settings()


CREDENTIALS_FILE = app_settings.credentials_file
BUCKET_NAME = app_settings.bucket_name


class StorageClient:
    def __init__(self, credentials_file, bucket_name):
        self._credentials_file = credentials_file
        self._bucket_name = bucket_name
        self._client = storage.Client.from_service_account_json(self._credentials_file)
        self._bucket = self._client.get_bucket(self._bucket_name)

    def upload(self, blob_name, path_to_file):
        blob = self._bucket.blob(blob_name)
        blob.upload_from_filename(path_to_file)


@lru_cache
def get_client():
    return StorageClient(CREDENTIALS_FILE, BUCKET_NAME)
