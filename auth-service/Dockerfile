FROM java:8-jre
MAINTAINER Pavel Ivaschenko <pawloiwanov@gmail.com>

ADD ./target/auth-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/auth-service.jar"]

EXPOSE 5000