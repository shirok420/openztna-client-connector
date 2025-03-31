#!/bin/bash

# Run Clippy on all Rust packages
echo "Running Clippy on all Rust packages..."
cargo clippy -- -D warnings

# Fix automatically fixable issues
echo "Fixing automatically fixable issues..."
cargo clippy --fix --allow-dirty --allow-staged

echo "Done!"