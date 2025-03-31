#!/bin/bash

# Start OpenZTNA components for local development
echo "Starting OpenZTNA components for local development..."

# Build all components first
echo "Building all components..."
cargo build

# Start Control Plane in the background
echo "Starting Control Plane on http://127.0.0.1:3000"
RUST_LOG=info cargo run --package openztna-control-plane &
CONTROL_PLANE_PID=$!

# Wait for Control Plane to start
sleep 2

# Start Application Connector in the background
echo "Starting Application Connector on http://127.0.0.1:3002"
RUST_LOG=info cargo run --package openztna-application-connector &
APP_CONNECTOR_PID=$!

# Wait for Application Connector to start
sleep 2

# Start Client Connector in the background
echo "Starting Client Connector on http://127.0.0.1:3001"
RUST_LOG=info cargo run --package openztna-client-connector &
CLIENT_CONNECTOR_PID=$!

# Check if yarn is installed
if command -v yarn &> /dev/null; then
    # Start Admin Console in the background
    echo "Starting Admin Console on http://localhost:3001"
    cd packages/control-plane/admin-console
    
    # Check if node_modules exists, if not install dependencies
    if [ ! -d "node_modules" ]; then
        echo "Installing Admin Console dependencies..."
        yarn install
    fi
    
    # Start the development server
    yarn dev &
    ADMIN_CONSOLE_PID=$!
    
    # Go back to the root directory
    cd ../../..
else
    echo "Yarn is not installed. Skipping Admin Console startup."
    ADMIN_CONSOLE_PID=""
fi

# Function to handle script termination
cleanup() {
    echo "Stopping all components..."
    kill $CONTROL_PLANE_PID $APP_CONNECTOR_PID $CLIENT_CONNECTOR_PID
    if [ ! -z "$ADMIN_CONSOLE_PID" ]; then
        kill $ADMIN_CONSOLE_PID
    fi
    exit 0
}

# Register the cleanup function for when the script is terminated
trap cleanup SIGINT SIGTERM

echo ""
echo "All components are running!"
echo "- Control Plane: http://127.0.0.1:3000"
echo "- Client Connector: http://127.0.0.1:3001"
echo "- Application Connector: http://127.0.0.1:3002"
if [ ! -z "$ADMIN_CONSOLE_PID" ]; then
    echo "- Admin Console: http://localhost:3001"
fi
echo ""
echo "Press Ctrl+C to stop all components"

# Wait for user to press Ctrl+C
wait