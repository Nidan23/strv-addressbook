docker stop strv_postgres_1 strv_rest-api_1 strv_rest-api-tests_1

docker network rm strv_default

docker rm strv_postgres_1 strv_rest-api_1 strv_rest-api-tests_1

docker image rm strv_rest-api postgres strv_rest-api-tests

docker-compose up -d