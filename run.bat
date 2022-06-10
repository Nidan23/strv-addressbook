docker network rm strv_default

docker stop strv_postgres_1 strv_rest-api_1

docker rm strv_postgres_1 strv_rest-api_1

docker image rm strv_rest-api postgres

docker-compose up -d