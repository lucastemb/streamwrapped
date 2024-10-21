FROM python:3.12

WORKDIR .

#COPY requirements.txt src/framework.py .
#See: https://docs.docker.com/build/building/best-practices/#add-or-copy
RUN --mount=type=bind,source=requirements.txt,target=requirements.txt \
	pip install -r requirements.txt

COPY src/infrastructure.py .

# do other stuff here... ?