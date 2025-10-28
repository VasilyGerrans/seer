# Seer

**Seer** is a proof of concept tracing tool for Solana programs. It helps developers debug and understand on-chain execution by visualizing the full transaction call stack (including CPIs) along with variable data.

This project was built for the **Colosseum Cypherpunk Hackathon**.

## How It Works

1. **Build:** Seer compiles Solana programs into non-stripped `.so` files to access DWARF debug information.
2. **Run:** During transaction execution, Seer captures relevant runtime data from the validator using the parsed debug metadata.
3. **Analyze:** Seer merges compile-time and runtime data, displaying the transaction execution flow and variables in a clear, interactive UI.

## Repository Structure

This repo contains several submodules:

1. **agave** – a fork of `anza-xyz/agave` extended with a DWARF parser and runtime interceptor.
2. **ui** – the visualization layer for transaction analysis.
3. **demo** – a simple Solana program demonstrating Seer’s debugging capabilities.

To **see the result**, start with the [demo](https://github.com/yparf/seer-demo).

To **explore the implementation**, check out [seer-agave](https://github.com/VasilyGerrans/seer-agave) and [ui](https://github.com/VasilyGerrans/seer-ui).
