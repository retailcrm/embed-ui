TARGET_HEADER=@echo -e '===== \e[34m' $@ '\e[0m'
YARN=docker-compose run --rm node yarn

.PHONY: .yarnrc.yml
.yarnrc.yml:  ## Generates yarn configuration
	$(TARGET_HEADER)
	cp .yarnrc.dist.yml .yarnrc.yml

.PHONY: node_modules
node_modules: package.json yarn.lock ## Installs dependencies
	$(TARGET_HEADER)
	@docker-compose run --rm node yarn install --silent

.PHONY: build
build: ## Builds the package
	$(TARGET_HEADER)
	$(YARN) workspaces foreach -A --topological-dev run build

.PHONY: release
release: ## Bumps version and creates tag
	$(TARGET_HEADER)
ifdef as
	$(YARN) release:$(as)
else
	$(YARN) release
endif

.PHONY: tests
tests: ## Runs autotests
	$(TARGET_HEADER)
ifdef cli
	$(YARN) test $(cli) --passWithNoTests
else
	$(YARN) test
endif

.PHONY: help
help: ## Calls recipes list
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk '\
	    BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Colors
$(call computable,CC_BLACK,$(shell tput -Txterm setaf 0 2>/dev/null))
$(call computable,CC_RED,$(shell tput -Txterm setaf 1 2>/dev/null))
$(call computable,CC_GREEN,$(shell tput -Txterm setaf 2 2>/dev/null))
$(call computable,CC_YELLOW,$(shell tput -Txterm setaf 3 2>/dev/null))
$(call computable,CC_BLUE,$(shell tput -Txterm setaf 4 2>/dev/null))
$(call computable,CC_MAGENTA,$(shell tput -Txterm setaf 5 2>/dev/null))
$(call computable,CC_CYAN,$(shell tput -Txterm setaf 6 2>/dev/null))
$(call computable,CC_WHITE,$(shell tput -Txterm setaf 7 2>/dev/null))
$(call computable,CC_END,$(shell tput -Txterm sgr0 2>/dev/null))