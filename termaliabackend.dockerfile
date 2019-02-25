FROM java:8
VOLUME /tmp
EXPOSE 8080
ADD jar/springboot-termalia-0.0.1-SNAPSHOT.jar termalia.jar
RUN chmod +x termalia.jar
# CMD exec java -jar dockersms.jar -Dspring.profiles.active=container
CMD exec java -jar termalia.jar