FROM java:8
VOLUME /tmp
EXPOSE 8080
#Configuración de zona horaria
ENV TZ 'America/Argentina/Buenos_Aires'
RUN echo $TZ > /etc/timezone && \
    apt-get update && apt-get install -y tzdata && \
    rm /etc/localtime && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata && \
    apt-get clean
ADD jar/springboot-termalia-0.0.1-SNAPSHOT.jar termalia.jar
RUN chmod +x termalia.jar
# CMD exec java -jar dockersms.jar -Dspring.profiles.active=container
CMD exec java -jar termalia.jar