#!/bin/bash

# Run Prettier check
echo "Running Prettier check..."
npx prettier --check "**/*.{js,jsx,ts,tsx,json,md}" || true

# Format files if needed
echo "Formatting files..."
npx prettier --write "**/*.{js,jsx,ts,tsx,json,md}"

echo "Formatting complete!"