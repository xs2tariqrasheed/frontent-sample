#
# Makefile
#
# Douglas Dimola 1/19/2021
#

.DEFAULT_GOAL := standard

DOCKER_NAME ?= blocklete-react

dev:
	$(info Building Dev Docker image --> $(DOCKER_NAME):dev)
	@docker build --memory=4g -f Dockerfile.nonprod -t $(DOCKER_NAME):dev .


.PHONY: clean

clean:
	$(info Cleaning the binary build and Docker images)
	@docker rmi -f $(DOCKER_NAME):latest
	@docker rmi -f $(DOCKER_NAME):prod
	@docker rmi -f $(DOCKER_NAME):dev
	@docker rmi -f $(DOCKER_NAME):test
