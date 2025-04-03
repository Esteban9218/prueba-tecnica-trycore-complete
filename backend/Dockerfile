# Usar la imagen oficial de OpenJDK 21
FROM openjdk:21-jdk-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el JAR del backend al contenedor
COPY target/*.jar app.jar

# Exponer el puerto 9090
EXPOSE 9090

# Ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
