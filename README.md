<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar:

```bash
npm install
```

3. Tener Nest CLI instalado

```bash
npm i -g  @nestjs/cli
```

4. Leventar base de datos:

```bash
docker-compose up -d
```

5. Clonar el archivo `.env.template` por el archivo con el nombre `.env`

6. Lenar las variables de entorno definidas en el `.env`

7. Levatar aplicacion con el comando:

```bash
npm run start:dev
```

8. Cargar datos datos en la base de datos:

```
 http://localhost:3000/api/v2/seed

```

# Production Build

1. Crear archivo `.env.prod`
2. Llenar las variables de entorno definidas en `.env.prod`
3. Construir la nueva imagen de docker definida en el `docker-compose.prod.yml` con el siguiente comando:

```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

- Nota: Si ya tiene la imagen creada no hace falta la bandera `--buid`:

```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```

# Stack usado

- MongoDB
- Nest
