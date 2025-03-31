# OpenZTNA Application Connector

The Application Connector is placed in front of protected applications, providing secure access control and traffic forwarding based on Zero Trust principles.

## Features

- **Access verification**: Verifies user and device access rights
- **Traffic forwarding**: Forwards authenticated traffic to applications
- **Session management**: Manages active sessions

## Development

### Prerequisites

- Rust 1.70 or later
- Cargo

### Building

```bash
cargo build --package openztna-application-connector
```

### Running

```bash
cargo run --package openztna-application-connector
```

The application connector will start on http://127.0.0.1:3002

### Testing

```bash
cargo test --package openztna-application-connector
```

## API Endpoints

- `GET /` - Status page
- `GET /health` - Health check endpoint
- All other paths are proxied to the protected application (after access verification)