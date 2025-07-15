up:
	docker-compose up -d

psql:
	docker exec -it tp2-db psql -U postgres -d consultoriodb