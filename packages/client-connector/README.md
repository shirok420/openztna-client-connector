# OpenZTNA Client Connector

The Client Connector is an agent installed on the user's device that protects endpoints and provides secure access to enterprise resources through the Zero Trust Network Access model.

## Endpoint Protection Features

- **Device Security Enforcement**
  - Security posture assessment
  - OS update verification
  - Security software verification
  - Disk encryption verification
  - Custom security checks

- **Threat Prevention**
  - Network isolation
  - Application-level access control
  - Data exfiltration prevention
  - Malicious site blocking
  - Suspicious connection detection

- **Authentication & Identity**
  - Multi-factor authentication support
  - Single sign-on integration
  - OAuth2/OIDC compatibility
  - Certificate-based authentication
  - Continuous identity verification

- **Secure Communications**
  - End-to-end encryption
  - Modern cryptography (TLS 1.3)
  - WireGuard tunneling protocol
  - Perfect forward secrecy
  - Certificate validation

- **Policy Enforcement**
  - Context-aware access controls
  - Least privilege access
  - Just-in-time access
  - Dynamic policy adjustment
  - Default-deny approach

## Installation

### Windows

#### Using the MSI Installer

1. Download the latest MSI installer from the [releases page](https://github.com/openztna/client-connector/releases)
2. Double-click the MSI file and follow the installation wizard
3. The client will start automatically and appear in the system tray

#### Silent Installation

For enterprise deployment:

```powershell
# Install silently
msiexec /i OpenZTNAClientConnector.msi /quiet

# Install with custom configuration
msiexec /i OpenZTNAClientConnector.msi /quiet CONFIG_URL="https://your-config-server.com"
```

### macOS

#### Using the PKG Installer

1. Download the latest PKG installer from the [releases page](https://github.com/openztna/client-connector/releases)
2. Double-click the PKG file and follow the installation wizard
3. The client will start automatically and appear in the menu bar

#### Silent Installation

For enterprise deployment:

```bash
# Install silently
sudo installer -pkg OpenZTNAClientConnector.pkg -target /

# Install with custom configuration
sudo installer -pkg OpenZTNAClientConnector.pkg -target / -config https://your-config-server.com
```

### Linux

#### Debian/Ubuntu

```bash
# Install the package
sudo dpkg -i openztna-client-connector_1.0.0_amd64.deb

# Start the service
sudo systemctl start openztna-client
```

#### RHEL/CentOS/Fedora

```bash
# Install the package
sudo rpm -i openztna-client-connector-1.0.0.x86_64.rpm

# Start the service
sudo systemctl start openztna-client
```

## Configuration

The client connector can be configured using a TOML configuration file:

```toml
[general]
# Client ID for this installation
client_id = "unique-client-id"
# Control plane URL
control_plane_url = "https://control-plane.example.com"

[auth]
# Identity provider type (oauth2, oidc)
identity_provider = "oidc"
# OAuth2/OIDC configuration
client_id = "your-client-id"
client_secret = "your-client-secret"
oauth_url = "https://auth.example.com"
redirect_uri = "http://localhost:8085/callback"

[device_assessment]
# Enable device posture assessment
enabled = true
# Minimum OS version required
min_os_version = "10.0"
# Required security software
required_security_software = ["antivirus", "firewall"]
# Check disk encryption
check_disk_encryption = true

[tunneling]
# Tunneling protocol (wireguard, openvpn)
protocol = "wireguard"
# Split tunneling configuration
split_tunneling = true
# Domains to exclude from tunneling
exclude_domains = ["*.local", "*.internal"]
```

## Development

### Prerequisites

- Rust 1.70 or later
- Cargo
- Platform-specific build dependencies (see main README.md)

### Building

```bash
cargo build --package openztna-client-connector
```

### Running

```bash
cargo run --package openztna-client-connector
```

The client connector will start on http://127.0.0.1:3001

### Building Installable Packages

See the main [README.md](../../README.md) for detailed instructions on building installable packages for different operating systems.

### Testing

```bash
cargo test --package openztna-client-connector
```

## API Endpoints

- `GET /` - Status page
- `GET /health` - Health check endpoint
- `GET /api/v1/status` - Get client status
- `GET /api/v1/device` - Get device information
- `GET /api/v1/applications` - List accessible applications
- `POST /api/v1/connect` - Establish connection
- `POST /api/v1/disconnect` - Terminate connection

## Troubleshooting

### Common Issues

- **Authentication Failures**: Check your identity provider configuration
- **Connection Issues**: Verify network connectivity to the control plane
- **Device Assessment Failures**: Ensure your device meets the security requirements
- **Performance Problems**: Check for conflicting security software

### Logs

Logs are stored in the following locations:

- Windows: `C:\ProgramData\OpenZTNA\logs\`
- macOS: `/Library/Logs/OpenZTNA/`
- Linux: `/var/log/openztna/`

## License

This component is part of the OpenZTNA project and is released under the [Apache License 2.0](../../LICENSE).