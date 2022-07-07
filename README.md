# nxcw

[![npm version](https://badge.fury.io/js/%40nxrs%2Fcargo.svg)](https://badge.fury.io/js/%40digitalnative%2Fcosmwasm)

This is a WIP plugin for `@nrwl/nx` adding support for Cosmwasm smart contracts

Nx helps building contracts faster with cloud computing with github integration.

## Prerequisuite

Install [Nx](https://nx.app/) first.

```
npm i -g nx
```

## Installation

```sh
> npx create-nx-workspace
> yarn add nxcw
```

## Generators

Generate each cosmwasm contract starter from each team
```sh
> nx generate nxcw:osmosis my_cosmwasm_contract
```

** WIP: cosmjs lib **
```sh
> nx generate nxcw:js my_cosmjs_lib
```

## Executors

```sh
# Build a contract or Typescript library
> nx build my_cosmwasm_contract

# Run unit tests in a library or contract
> nx test my_cosmjs_lib
> nx test my_cosmwasm_contract

# Render dependancy graph for your cosmwasm contract

> nx graph 

![graph](https://user-images.githubusercontent.com/12888144/177853973-0cd71e47-5d9c-442f-b1f5-576af3fb3768.png)


# Check a Rust project with `clippy`
> nx lint my_cosmwasm_contract
# Don't fail on warnings:
> nx lint my_cosmwasm_contract __fail_on_warnings false
```

### Options

The executors accept most of the same CLI args as the corresponding `cargo` commands. When in doubt, run with the `__help` flag to see all options with descriptions:

```sh
> nx build my_cosmwasm_contract __help
```
