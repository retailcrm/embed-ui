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

.PHONY: build
prepare: ## Builds the package
	$(TARGET_HEADER)
	$(YARN) workspaces foreach -A --topological-dev run prepare

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

.PHONY: tests-coverage
tests-coverage: ## Runs autotests with coverage report
	$(TARGET_HEADER)
ifdef cli
	$(YARN) vitest --run --coverage $(cli) --passWithNoTests
else
	$(YARN) test:coverage
endif

.PHONY: tests-typecheck-contexts
tests-typecheck-contexts: ## Runs typecheck tests (test-d.ts) for v1-contexts
	$(TARGET_HEADER)
ifdef cli
	$(YARN) vitest run -c packages/v1-contexts/vitest.config.ts --typecheck.only --typecheck.checker tsc --typecheck.tsconfig packages/v1-contexts/tsconfig.json $(cli)
else
	$(YARN) vitest run -c packages/v1-contexts/vitest.config.ts --typecheck.only --typecheck.checker tsc --typecheck.tsconfig packages/v1-contexts/tsconfig.json
endif

.PHONY: tests-typecheck-v1-contexts
tests-typecheck-v1-contexts: tests-typecheck-contexts ## Alias for tests-typecheck-contexts

.PHONY: tests-typecheck
tests-typecheck: tests-typecheck-contexts ## Runs typecheck tests (currently v1-contexts)

.PHONY: ci-actionlint
ci-actionlint: ## Lints GitHub Actions workflows locally (actionlint binary or docker image)
	$(TARGET_HEADER)
	@if command -v actionlint >/dev/null 2>&1; then \
		actionlint; \
	elif command -v docker-compose >/dev/null 2>&1; then \
		docker-compose run --rm actionlint; \
	elif command -v docker >/dev/null 2>&1; then \
		docker run --rm -v "$$(pwd):/repo" -w /repo rhysd/actionlint:latest; \
	else \
		echo "actionlint is not installed and docker/docker-compose is unavailable"; \
		exit 1; \
	fi

.PHONY: ci-act-plan
ci-act-plan: ## Shows act execution plan for tests workflow without running jobs
	$(TARGET_HEADER)
	@if command -v act >/dev/null 2>&1; then \
		act -n pull_request -W .github/workflows/tests.yml; \
	elif command -v docker-compose >/dev/null 2>&1; then \
		docker-compose run --rm --build act -n pull_request -W .github/workflows/tests.yml; \
	else \
		echo "act is not installed and docker-compose is unavailable"; \
		exit 1; \
	fi

.PHONY: ci-act-tests
ci-act-tests: ## Runs tests workflow locally via act (heavy)
	$(TARGET_HEADER)
	@if command -v act >/dev/null 2>&1; then \
		act pull_request -W .github/workflows/tests.yml -j workflow-lint -j eslint -j tests; \
	elif command -v docker-compose >/dev/null 2>&1; then \
		docker-compose run --rm --build act pull_request -W .github/workflows/tests.yml -j workflow-lint -j eslint -j tests; \
	else \
		echo "act is not installed and docker-compose is unavailable"; \
		exit 1; \
	fi

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
