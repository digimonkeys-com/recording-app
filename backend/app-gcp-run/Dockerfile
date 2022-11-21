FROM python:3.10

ENV PORT 8000

RUN apt-get -y update
RUN apt-get install -y libsndfile1 ffmpeg

COPY . ./
RUN pip install -r requirements.txt

CMD echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
CMD echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
CMD echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
CMD python run.py