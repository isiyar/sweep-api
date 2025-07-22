D = sudo docker

start: build_image run_container
clean: delete_container delete_image

build_image:
	$(D) build -t sweep-api .

run_container:
	$(D) run -p 3000:3000 --name sweep-api-container sweep-api

delete_container:
	$(D) stop sweep-api-container && $(D) rm sweep-api-container

delete_image:
	$(D) rmi sweep-api