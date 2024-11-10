#note: not sure this works as i uninstalled docker and my internet is too shit to download it again
FROM python:3.12

RUN apt-get install curl &&\
	curl -fsSL https://deb.nodesource.com/setup_23.x | bash - && \
	sudo apt-get install -y nodejs

WORKDIR .

#COPY requirements.txt src/framework.py .
#See: https://docs.docker.com/build/building/best-practices/#add-or-copy
RUN --mount=type=bind,source=requirements.txt,target=requirements.txt \
	pip install -r requirements.txt

COPY src/infrastructure.py src/.env server.js .
RUN npm install nodemon cors &&\ 
	python infrastructure.py & npm run dev