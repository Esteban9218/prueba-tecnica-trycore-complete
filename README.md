# Task Manager - Docker Setup

Este proyecto es una aplicación de gestión de tareas que utiliza Angular para el frontend, Spring Boot para el backend y PostgreSQL como base de datos. Se ejecuta utilizando Docker Compose.

## Servicios en Docker Hub

- **Frontend:** [`esteban713/task-manager-frontend`](https://hub.docker.com/r/esteban713/task-manager-frontend)
- **Backend:** [`esteban713/task-manager-backend`](https://hub.docker.com/r/esteban713/task-manager-backend)

## Requisitos

Antes de comenzar, asegúrate de tener instalado:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuración y Ejecución

### 1. Clonar el Repositorio

Si tienes el repositorio en GitHub, clónalo con:
```sh
git clone https://github.com/Esteban9218/prueba-tecnica-trycore-complete.git
cd task-manager
```

### 2. Crear el archivo `docker-compose.yml`

Crea un archivo `docker-compose.yml` con el siguiente contenido:

```yaml
version: '3.8'

services:
  frontend:
    image: esteban713/task-manager-frontend:latest
    container_name: task-manager-frontend
    ports:
      - "8080:80"
    depends_on:
      - backend
    networks:
      - task-network

  backend:
    image: esteban713/task-manager-backend:latest
    container_name: task-manager-backend
    ports:
      - "9090:9090"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/task_manager
      - SPRING_DATASOURCE_USERNAME=postgres
      - SPRING_DATASOURCE_PASSWORD=admin
    depends_on:
      - db
    networks:
      - task-network

  db:
    image: postgres:latest
    container_name: task-manager-db
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=admin
      - POSTGRES_DB=task_manager
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - task-network

volumes:
  postgres_data:

networks:
  task-network:
    driver: bridge
```

### 3. Iniciar los Contenedores

Ejecuta el siguiente comando para levantar la aplicación:
```sh
docker-compose up -d
```

### 4. Acceder a la Aplicación

- **Frontend:** [http://localhost:8080](http://localhost)
- **Backend API:** [http://localhost:9090](http://localhost:9090)
- **Base de Datos:** PostgreSQL en `localhost:5432`

### 5. Ver los Logs de los Contenedores

Si necesitas ver los logs de los servicios, usa:
```sh
docker-compose logs -f
```

### 6. Detener los Contenedores

Para detener y eliminar los contenedores, usa:
```sh
docker-compose down
```

## Notas

- Asegúrate de que los puertos `8080`, `9090` y `5432` estén disponibles en tu máquina.
- Puedes modificar `docker-compose.yml` según tus necesidades.
- Para actualizar los servicios, simplemente ejecuta `docker-compose pull` y luego `docker-compose up -d`.

🚀 ¡Disfruta tu aplicación de gestión de tareas!