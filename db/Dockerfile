FROM ubuntu:latest 

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y mysql-server

ENV MYSQL_DATABASE=blogMMA

ENV MYSQL_USER=davis

ENV MYSQL_PASSWORD=root

ENV MYSQL_ROOT_PASSWORD=root

COPY db.sql  /docker-entrypoint-initdb.d/db.sql

EXPOSE 3306

CMD ["mysqld"]
