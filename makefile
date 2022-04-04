.PHONY: kill-port
kill-port:
	lsof -ti:3000 | xargs kill

.PHONY: kill-node
kill-node:
	sudo pkill node

.PHONY: yarn-test
yarn-test:
	yarn test > test_output.txt

.PHONY: yarn-init
yarn-init:
	yarn autoclean --init

.PHONY: yarn-clean
yarn-clean:
	yarn autoclean --force
	yarn install

.PHONY: code-coverage
code-coverage:
	npx jest --coverage > code_coverage.xml