BLUE		= \033[0;34m
GREEN		= \033[0;32m
LIGHTBLUE	= \033[1;34m
RED			= \033[0;31m
YELLOW		= \033[1;33m
ORANGE		= \033[0;33m
MAGENTA		= \033[0;35m
RESET		= \033[0m

NAME		= red-tetris

$(NAME):
			@printf "$(BLUE)Launch $(NAME)...$(RESET)\n"
			@docker --tls compose up -d
			@printf " $(GREEN)[$(NAME) up][✔] $(RESET)\n"

all:		 $(NAME)

down:
			@printf "$(RED)Delete containers...$(RESET)\n"
			@docker compose down
			@printf "$(RED)[$(NAME) down]$(RESET)\n"

start:
			@printf "$(LIGHTBLUE)Start containers...$(RESET)\n"
			@docker compose start
			@printf " $(GREEN)[$(NAME) start][✔] $(RESET)\n"

stop:
			@printf "$(LIGHTBLUE)Stop containers...$(RESET)\n"
			@docker compose stop
			@printf " $(GREEN)[$(NAME) stop][✔] $(RESET)\n"

restart:	stop start

migrations:
			@printf "$(YELLOW)Run migrations...$(RESET)\n"
			@docker exec adonis npm run migrations
			@printf " $(GREEN)[$(NAME) migrations][✔] $(RESET)\n"

logFront:
			@printf "$(MAGENTA)Show frontend logs...$(RESET)\n"
			@docker compose logs -f --tail=100 react

logBack:
			@printf "$(MAGENTA)Show backend logs...$(RESET)\n"
			@docker compose logs -f --tail=100 adonis

logDb:
			@printf "$(MAGENTA)Show db logs...$(RESET)\n"
			@docker compose logs -f --tail=100 postgres

test:
			@printf "$(GREEN)Run tests...$(RESET)\n"
			@cd ./back && npm run test
			@cd ../front && npm run test

build:
			@printf "$(BLUE)Build images, containers and volumes...$(RESET)\n"
			@docker compose up --build -d
			@printf " $(GREEN)[$(NAME) build][✔] $(RESET)\n"

downVolume:
			@printf "$(RED)Delete containers and volumes...$(RESET)\n"
			@docker compose down -v
			@printf "$(RED)[$(NAME) down volumes]$(RESET)\n"

re:			down all

.PHONY:		all down start stop restart migrations logFront logBack logDb build downVolume re