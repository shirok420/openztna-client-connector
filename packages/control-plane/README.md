# OpenZTNA Control Plane

The Control Plane is the central management and orchestration component of the Zero Trust architecture. It serves as the "brain" of the system, making access decisions based on identity, context, and policy.

## Features

- **Policy management**: Definition, storage, and distribution of access policies
- **Authentication service**: Integration with identity providers
- **Authorization engine**: Real-time decision-making for access requests
- **Device registration**: Registration and management of devices
- **Audit and logging**: Comprehensive logging of all access attempts
- **API gateway**: Secure interface for administration

## Components

### Rust Backend

The core of the Control Plane is implemented in Rust, providing a high-performance, secure backend for the ZTNA system.

### Admin Console

The Control Plane includes a web-based Admin Console built with Next.js, allowing administrators to easily manage the ZTNA environment through a user-friendly interface. The Admin Console provides:

- Dashboard with system overview and metrics
- Device management interface
- Policy configuration and management
- User management
- Monitoring and reporting tools

For more information about the Admin Console, see the [Admin Console README](./admin-console/README.md).

## Development

### Prerequisites

- Rust 1.70 or later
- Cargo
- Node.js 18.x or later (for Admin Console)
- Yarn package manager (for Admin Console)
- PostgreSQL (for production use)
- Redis (for production use)

### Building

#### Backend

```bash
cargo build --package openztna-control-plane
```

#### Admin Console

```bash
cd admin-console
yarn install
yarn build
```

### Running

#### Backend

```bash
cargo run --package openztna-control-plane
```

The control plane backend will start on http://127.0.0.1:3000

#### Admin Console

```bash
cd admin-console
yarn dev
```

The admin console will start on http://localhost:3000 and will connect to the backend API.

### Testing

```bash
cargo test --package openztna-control-plane
```

## API Endpoints

- `GET /` - Status page
- `GET /health` - Health check endpoint
- `POST /api/v1/policy/check` - Check if a user/device can access a resource
- `GET /api/v1/devices` - List registered devices
- `POST /api/v1/devices` - Register a new device
- `GET /api/v1/policies` - List security policies
- `POST /api/v1/policies` - Create a new security policy
- `GET /api/v1/users` - List users
- `GET /api/v1/stats` - Get system statistics

## Deployment

For production deployment, it's recommended to:

1. Build and deploy the Rust backend as a standalone service
2. Build and deploy the Admin Console as a static website or containerized application
3. Configure the Admin Console to connect to the backend API

See the [Admin Console Dockerfile](./admin-console/Dockerfile) for containerization details.