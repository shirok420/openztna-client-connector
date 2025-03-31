# OpenZTNA Client Connector

![OpenZTNA Logo](website/static/img/openztna-logo.png)

OpenZTNA Client Connector is a free, open-source Zero Trust Network Access (ZTNA) client that protects endpoints and secures access to enterprise resources. It implements the "never trust, always verify" principle to protect your organization's applications and data.

## Endpoint Protection Features

The OpenZTNA Client Connector provides comprehensive endpoint protection:

- **Device Security Enforcement**: Continuously evaluates device security state and ensures compliance with security policies
- **Network Isolation**: Prevents lateral movement between network segments by providing application-level access
- **Secure Remote Access**: Provides the same protection regardless of user location, securing connections on untrusted networks
- **Multi-Factor Authentication**: Supports various MFA methods for strong user identity verification
- **Continuous Verification**: Constantly monitors user identity, device state, and behavior patterns
- **End-to-End Encryption**: Protects all communications between the endpoint and applications

## Monorepo Structure

This project is organized as a monorepo with the following components:

```
openztna-client-connector/
├── packages/
│   ├── client-connector/     # Client agent installed on user devices
│   ├── control-plane/        # Central management and policy server
│   │   └── admin-console/    # Web-based administrative interface
│   └── application-connector/ # Proxy for protected applications
├── website/                  # Documentation website
└── Cargo.toml                # Workspace configuration
```

## Getting Started

### Prerequisites

- Rust 1.70 or later
- Cargo
- Node.js 18.x or later (for Admin Console)
- Yarn package manager (for Admin Console and documentation website)
- Additional build dependencies (see below for OS-specific requirements)

### Building for Development

To build all components for development:

```bash
cargo build
```

To build a specific component:

```bash
cargo build --package openztna-client-connector
cargo build --package openztna-control-plane
cargo build --package openztna-application-connector
```

To build the Admin Console:

```bash
cd packages/control-plane/admin-console
yarn install
yarn build
```

### Building Installable Packages

#### Windows Installer (.msi)

To build a Windows installer package:

1. Install required dependencies:
   ```bash
   # Install WiX Toolset
   cargo install cargo-wix
   ```

2. Build the MSI package:
   ```bash
   cd packages/client-connector
   cargo wix --no-build --nocapture
   ```

   The MSI file will be generated in `target/wix/`.

#### macOS Package (.pkg)

To build a macOS installer package:

1. Install required dependencies:
   ```bash
   # Install cargo-bundle
   cargo install cargo-bundle
   ```

2. Build the macOS package:
   ```bash
   cd packages/client-connector
   cargo bundle --release
   ```

3. Create the installer package:
   ```bash
   pkgbuild --component "target/release/bundle/osx/OpenZTNA Client Connector.app" \
            --install-location "/Applications" \
            --version "1.0.0" \
            "OpenZTNAClientConnector.pkg"
   ```

#### Linux Packages (.deb, .rpm)

To build Linux packages:

1. Install required dependencies:
   ```bash
   # For Debian/Ubuntu
   sudo apt-get install build-essential
   cargo install cargo-deb

   # For RPM-based distributions
   sudo dnf install rpm-build
   cargo install cargo-rpm
   ```

2. Build the Debian package:
   ```bash
   cd packages/client-connector
   cargo deb
   ```

   The .deb file will be generated in `target/debian/`.

3. Build the RPM package:
   ```bash
   cd packages/client-connector
   cargo rpm build
   ```

   The .rpm file will be generated in `target/release/rpmbuild/RPMS/`.

### Running for Development

You can start all components for local development using the provided script:

```bash
./start-dev.sh
```

This will start:
- Control Plane on http://127.0.0.1:3000
- Client Connector on http://127.0.0.1:3001
- Application Connector on http://127.0.0.1:3002

Alternatively, you can run each component individually:

```bash
# Run the Control Plane
cargo run --package openztna-control-plane

# Run the Client Connector
cargo run --package openztna-client-connector

# Run the Application Connector
cargo run --package openztna-application-connector

# Run the Admin Console
cd packages/control-plane/admin-console
yarn dev
```

### Testing

To run tests for all components:

```bash
cargo test
```

To test a specific component:

```bash
cargo test --package openztna-client-connector
```

## Architecture

OpenZTNA consists of the following main components:

### 1. Client Connector

An agent installed on the user's device that provides the following functions:

- **Authentication Module**: Handles user authentication (OAuth2/OIDC compatible)
- **Device Assessment Engine**: Evaluates device security state and enforces security policies
- **Tunneling Module**: Establishes encrypted communication channels using modern protocols
- **Policy Enforcer**: Applies access policies locally based on user, device, and context
- **Local Proxy**: Mediates application traffic and enforces access controls

### 2. Control Plane

The Control Plane is the central management and orchestration component of the Zero Trust architecture:

- **Policy Management**: Defines and distributes access policies
- **Authentication Service**: Integrates with identity providers
- **Device Registry**: Maintains information about enrolled devices
- **Monitoring and Analytics**: Provides visibility into system activity
- **Admin Console**: Web-based interface for administrators to manage the ZTNA environment

### 3. Application Connector

Placed in front of protected applications, providing the following functions:

- **Access Verification**: Verifies user and device access rights
- **Traffic Forwarding**: Forwards authenticated traffic to applications
- **Session Management**: Manages active sessions

## Administrative Console

The Admin Console provides a user-friendly web interface for managing the OpenZTNA environment:

- **Dashboard**: Get an overview of your ZTNA environment with key metrics
- **Device Management**: View, add, and manage devices connecting to your network
- **Policy Configuration**: Create and manage security policies for endpoint protection
- **User Management**: Manage user access and permissions
- **Monitoring & Reporting**: View logs, alerts, and generate reports

For more information, see the [Admin Console README](./packages/control-plane/admin-console/README.md).

## Deployment Scenarios

OpenZTNA Client Connector can be deployed in various scenarios:

- **Corporate Devices**: Managed deployment to company assets
- **BYOD Support**: Secure access from personal devices
- **Remote Workforce**: Protection for distributed teams
- **Contractor Access**: Secure access for third parties
- **Branch Offices**: Consistent protection across locations

## Documentation

For detailed documentation, visit our [documentation website](https://openztna.org) or run the documentation locally:

```bash
cd website
yarn install
yarn start
```

## Contributing

OpenZTNA is an open-source project and welcomes contributions from the community. For information on how to contribute, please refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

This project is released under the [Apache License 2.0](./LICENSE).