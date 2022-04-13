.PHONY: kill-port
kill-port:
	lsof -ti:3000 | xargs kill

.PHONY: kill-node
kill-node:
	sudo pkill node

.PHONY: yarn-test
yarn-test:
	yarn test --maxWorkers 2 > test_output.txt

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

.PHONY: repair-node
repair-node:
	rm -rf node_modules
	npm install --force

.PHONY: repair-yarn
repair-yarn:
	rm -rf node_modules
	yarn install



# when broken pipe from client loop send disconnect when doing fetch, do this to check server
# client_loop: send disconnect: Broken pipe
# fatal: Could not read from remote repository.
# after run this command, try git fetch origin again
.PHONY: add-server-connection-alive
add-server-connection-alive:
	echo 'ServerAliveInterval 30' | tee -a ~/.ssh/config
	echo 'ServerAliveCountMax 1200' | tee -a ~/.ssh/config