#!/usr/bin/env bash
AGAVE=../agave

mkdir -p logs

RUSTFLAGS="--emit=llvm-ir" $AGAVE/target/debug/cargo-build-sbf --sbf-sdk $AGAVE/platform-tools-sdk/sbf --debug --manifest-path programs/manager/Cargo.toml
RUSTFLAGS="--emit=llvm-ir" $AGAVE/target/debug/cargo-build-sbf --sbf-sdk $AGAVE/platform-tools-sdk/sbf --debug --manifest-path programs/nftminter/Cargo.toml
RUSTFLAGS="--emit=llvm-ir" $AGAVE/target/debug/cargo-build-sbf --sbf-sdk $AGAVE/platform-tools-sdk/sbf --debug --manifest-path programs/treasury/Cargo.toml
