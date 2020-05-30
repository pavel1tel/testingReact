FROM java:8-jre
MAINTAINER Pavel Ivaschenko <pawloiwanov@gmail.com>

ADD ./target/report-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/report-service.jar"]

EXPOSE 7000