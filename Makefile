.PHONY: build test deploy subgraph index upload submit integrate

build:
	forge build

test:
	forge test -vvv

deploy:
	forge script script/DeployPoX.s.sol \
		--rpc-url $(RPC) --broadcast --private-key $(PK)

subgraph:
	cd subgraph && graph codegen && graph build

subgraph-deploy:
	cd subgraph && graph deploy --studio pox

index:
	node indexer/src/index.js

upload:
	node scripts/upload_and_submit.mjs $(FILE)

submit:
	forge script script/RegisterDataset.s.sol \
		--rpc-url $(RPC) --broadcast --private-key $(PK)

integrate: build subgraph index

