FROM alpine:3.11.6

RUN apk update && apk add \
	python3 \
	py3-pillow \
	py3-pip \
	nodejs \
	yarn \
	git	\
	sed \
	bash

RUN pip3 install --upgrade pip
COPY docker/start.sh /
RUN chmod +x start.sh

RUN mkdir fussel 
COPY fussel.py \
    generate_site.sh \
    LICENSE \
    README.md \
    requirements.txt \
    .env.sample \
    fussel/

COPY generator fussel/generator
COPY web fussel/web

RUN cd fussel && \
    pip3 install -r requirements.txt
RUN cd fussel/web && \
    yarn install

CMD ["./start.sh"]