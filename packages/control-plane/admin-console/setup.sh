#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
yarn install

# Create necessary directories
echo "Creating necessary directories..."
mkdir -p public

# Create a favicon.ico file
echo "Creating favicon.ico..."
touch public/favicon.ico

# Start the development server
echo "Starting development server..."
yarn dev