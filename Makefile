.DEFAULT_GOAL := help

TARGET_HEADER=@echo -e '===== \e[34m' $@ '\e[0m'
TARGET_OK=@echo -e '\e[32mOK\e[0m'
YARN=docker-compose run --rm node yarn

.PHONY: .yarnrc.yml
.yarnrc.yml:  ## [Setup][local] Generates yarn configuration
	$(TARGET_HEADER)
	cp .yarnrc.dist.yml .yarnrc.yml
	$(TARGET_OK)

.PHONY: node_modules
node_modules: package.json yarn.lock ## [Setup][docker][heavy] Installs dependencies
	$(TARGET_HEADER)
	@docker-compose run --rm node yarn install --silent
	$(TARGET_OK)

.PHONY: build
build: ## [Build][docker][heavy] Builds all workspaces
	$(TARGET_HEADER)
	$(YARN) workspaces foreach -A --topological-dev run build
	$(TARGET_OK)

.PHONY: prepare
prepare: ## [Build][docker][heavy] Runs prepare in all workspaces
	$(TARGET_HEADER)
	$(YARN) workspaces foreach -A --topological-dev run prepare
	$(TARGET_OK)

.PHONY: release
release: ## [Release][docker][heavy][network] Bumps version and creates tag
	$(TARGET_HEADER)
ifdef as
	$(YARN) release:$(as)
else
	$(YARN) release
endif
	$(TARGET_OK)

.PHONY: tests
tests: ## [Tests][docker] Runs autotests
	$(TARGET_HEADER)
ifdef cli
	$(YARN) test $(cli) --passWithNoTests
else
	$(YARN) test
endif
	$(TARGET_OK)

.PHONY: tests-coverage
tests-coverage: ## [Tests][docker][heavy] Runs autotests with coverage report
	$(TARGET_HEADER)
ifdef cli
	$(YARN) vitest --run --coverage $(cli) --passWithNoTests
else
	$(YARN) test:coverage
endif
	$(TARGET_OK)

.PHONY: tests-typecheck-contexts
tests-typecheck-contexts: ## [Tests][docker] Runs typecheck tests (test-d.ts) for v1-contexts
	$(TARGET_HEADER)
ifdef cli
	$(YARN) vitest run -c packages/v1-contexts/vitest.config.ts --typecheck.only --typecheck.checker tsc --typecheck.tsconfig packages/v1-contexts/tsconfig.json $(cli)
else
	$(YARN) vitest run -c packages/v1-contexts/vitest.config.ts --typecheck.only --typecheck.checker tsc --typecheck.tsconfig packages/v1-contexts/tsconfig.json
endif
	$(TARGET_OK)

.PHONY: tests-typecheck-v1-contexts
tests-typecheck-v1-contexts: tests-typecheck-contexts ## [Tests][alias] Alias for tests-typecheck-contexts

.PHONY: tests-typecheck
tests-typecheck: tests-typecheck-contexts ## [Tests][alias] Runs typecheck tests (currently v1-contexts)

.PHONY: ci-actionlint
ci-actionlint: ## [CI][docker] Lints GitHub Actions workflows locally (actionlint binary or docker image)
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
	$(TARGET_OK)

.PHONY: ci-act-plan
ci-act-plan: ## [CI][docker] Shows act execution plan for tests workflow without running jobs
	$(TARGET_HEADER)
	@if command -v act >/dev/null 2>&1; then \
		act -n pull_request -W .github/workflows/tests.yml; \
	elif command -v docker-compose >/dev/null 2>&1; then \
		docker-compose run --rm --build act -n pull_request -W .github/workflows/tests.yml; \
	else \
		echo "act is not installed and docker-compose is unavailable"; \
		exit 1; \
	fi
	$(TARGET_OK)

.PHONY: ci-act-tests
ci-act-tests: ## [CI][docker][heavy][network] Runs tests workflow locally via act
	$(TARGET_HEADER)
	@if command -v act >/dev/null 2>&1; then \
		act pull_request -W .github/workflows/tests.yml -j workflow-lint -j eslint -j tests; \
	elif command -v docker-compose >/dev/null 2>&1; then \
		docker-compose run --rm --build act pull_request -W .github/workflows/tests.yml -j workflow-lint -j eslint -j tests; \
	else \
		echo "act is not installed and docker-compose is unavailable"; \
		exit 1; \
	fi
	$(TARGET_OK)

.PHONY: help
help: ## [General] Shows grouped command help
	@set -eu; \
	if [ -t 1 ] && [ -z "$${CI:-}" ] && [ -z "$${NO_COLOR:-}" ]; then \
		C_HEAD="$$(printf '\033[1;36m')"; \
		C_TGT="$$(printf '\033[36m')"; \
		C_TAG="$$(printf '\033[33m')"; \
		C_WARN="$$(printf '\033[33m')"; \
		C_RST="$$(printf '\033[0m')"; \
	else \
		C_HEAD=''; C_TGT=''; C_TAG=''; C_WARN=''; C_RST=''; \
	fi; \
	FILTER="$$(printf '%s' "$(value filter)" | tr '[:upper:]' '[:lower:]')"; \
	SHOW_INTERNAL="$(value show_internal)"; \
	awk -v filter="$$FILTER" -v show_internal="$$SHOW_INTERNAL" '\
		function trim(s){ sub(/^[ \t\r\n]+/, "", s); sub(/[ \t\r\n]+$$/, "", s); return s } \
		function group_order(g){ \
			if (g=="General") return 1; \
			if (g=="Setup") return 2; \
			if (g=="Build") return 3; \
			if (g=="Tests") return 4; \
			if (g=="CI") return 5; \
			if (g=="Release") return 6; \
			return 99; \
		} \
		/^[a-zA-Z0-9_.-]+:.*##[[:space:]]+/ { \
			target = $$1; sub(/:.*/, "", target); \
			if (show_internal != "1" && target ~ /^\./) next; \
			desc = $$0; sub(/^.*##[[:space:]]*/, "", desc); \
			group = "Other"; tags = ""; \
			if (match(desc, /^\[[^]]+\]/)) { \
				group = substr(desc, 2, RLENGTH - 2); \
				desc = substr(desc, RLENGTH + 1); \
			} \
			while (match(desc, /^[[:space:]]*\[[^]]+\]/)) { \
				sub(/^[[:space:]]*/, "", desc); \
				rb = index(desc, "]"); \
				if (rb == 0) break; \
				tags = tags "[" substr(desc, 2, rb - 2) "]"; \
				desc = substr(desc, rb + 1); \
			} \
			desc = trim(desc); \
			hay = tolower(target " " group " " tags " " desc); \
			if (filter != "" && index(hay, filter) == 0) next; \
			printf "%02d\t%s\t%s\t%s\t%s\n", group_order(group), group, target, tags, desc; \
		} \
	' $(MAKEFILE_LIST) \
	| sort -t "$$(printf '\t')" -k1,1n -k3,3 \
	| awk -F '\t' -v c_head="$$C_HEAD" -v c_tgt="$$C_TGT" -v c_tag="$$C_TAG" -v c_rst="$$C_RST" '\
		BEGIN { current = ""; count = 0 } \
		{ \
			if ($$2 != current) { \
				if (current != "") print ""; \
				printf "%s%s%s\n", c_head, $$2, c_rst; \
				current = $$2; \
			} \
			printf "  %s%-30s%s %s", c_tgt, $$3, c_rst, $$5; \
			if ($$4 != "") printf " %s%s%s", c_tag, $$4, c_rst; \
			printf "\n"; \
			count++; \
		} \
		END { if (count == 0) print "No targets matched the current filter." }'; \
	echo ""; \
	printf "%sQuick Start%s\n" "$$C_HEAD" "$$C_RST"; \
	printf "  make ci-actionlint\n"; \
	printf "  make tests\n"; \
	printf "  make tests-coverage\n"; \
	printf "  make ci-act-plan\n"; \
	echo ""; \
	printf "%sExamples%s\n" "$$C_HEAD" "$$C_RST"; \
	printf "  make help filter=ci\n"; \
	printf "  make help show_internal=1\n"; \
	printf "  make tests cli='tests/scenarios/customer/phone.test.ts'\n"; \
	printf "  make release as=beta\n"; \
	dup_targets="$$(awk -F: '/^[a-zA-Z0-9_.-]+:/ && $$1 != ".PHONY" {print $$1}' $(MAKEFILE_LIST) | sort | uniq -d | tr '\n' ' ')"; \
	dup_phony="$$(awk '/^\.PHONY:[[:space:]]*/ {for (i=2; i<=NF; i++) print $$i}' $(MAKEFILE_LIST) | sort | uniq -d | tr '\n' ' ')"; \
	if [ -n "$$dup_targets$$dup_phony" ]; then \
		echo ""; \
		printf "%sWarnings%s\n" "$$C_WARN" "$$C_RST"; \
		if [ -n "$$dup_targets" ]; then printf "  duplicate targets: %s\n" "$$dup_targets"; fi; \
		if [ -n "$$dup_phony" ]; then printf "  duplicate .PHONY entries: %s\n" "$$dup_phony"; fi; \
	fi

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
