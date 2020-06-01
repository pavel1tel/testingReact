FROM java:8-jre
MAINTAINER Pavel Ivaschenko <pawloiwanov@gmail.com>

ADD ./target/account-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/account-service.jar"]

EXPOSE 8778