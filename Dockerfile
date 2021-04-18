FROM openjdk:8
ADD target/gymmastergateway-0.0.1-SNAPSHOT.jar
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=dev", "gateway.jar"]
