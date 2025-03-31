---
sidebar_position: 2
---

# Configuration Guide

This guide explains how to configure the OpenZTNA Client Connector for optimal security and performance in your environment.

## Configuration File Location

The Client Connector uses a TOML configuration file located at:

- Windows: `C:\ProgramData\OpenZTNA\config\client-connector.toml`
- macOS: `/Library/Application Support/OpenZTNA/config/client-connector.toml`
- Linux: `/etc/openztna/client-connector.toml`

## Core Configuration Sections

### Server Configuration

The `[server]` section configures the local client service:

```toml
[server]
# Interface to bind the local service
host = "127.0.0.1"
# Port for the local service
port = 3001
# Log level (debug, info, warn, error)
log_level = "info"
# Log file location
log_file = "/var/log/openztna-client.log"
```

### Control Plane Configuration

The `[control_plane]` section configures the connection to your ZTNA control plane:

```toml
[control_plane]
# URL of your control plane
url = "https://control-plane.example.com"
# Interval for policy checks (seconds)
check_interval = 60
# Request timeout (seconds)
timeout = 10
# Path to custom CA certificate (if using private PKI)
ca_cert_path = "/path/to/ca.crt"
```

### Authentication Configuration

The `[auth]` section configures user authentication:

```toml
[auth]
# Identity provider type (oauth2, oidc)
identity_provider = "oidc"
# OAuth2/OIDC client ID
client_id = "your-client-id"
# OAuth2/OIDC client secret
client_secret = "your-client-secret"
# OAuth2/OIDC provider URL
oauth_url = "https://auth.example.com"
# Redirect URI for authentication callback
redirect_uri = "http://localhost:8085/callback"
# Seconds before token expiry to refresh
token_refresh_margin = 300
# Token storage method (encrypted_file, keychain, memory)
token_storage = "encrypted_file"
```

### Device Assessment Configuration

The `[device_assessment]` section configures security checks for the device:

```toml
[device_assessment]
# Enable device assessment
enabled = true
# Assessment interval (seconds)
interval = 300
# Require OS to be up-to-date
required_os_updates = true
# Require firewall to be enabled
firewall_required = true
# Require antivirus to be installed and running
antivirus_required = true
# Require disk encryption
disk_encryption_required = true
# Custom assessment script path
custom_assessment_script = "/path/to/custom-assessment.sh"
```

### Tunneling Configuration

The `[tunneling]` section configures secure communication:

```toml
[tunneling]
# Tunneling protocol (wireguard, openvpn)
protocol = "wireguard"
# Maximum transmission unit
mtu = 1420
# Keep-alive interval (seconds)
keep_alive = 25
# DNS servers to use when tunneling
dns_servers = ["8.8.8.8", "1.1.1.1"]
```

### Proxy Configuration

The `[proxy]` section configures the local proxy:

```toml
[proxy]
# Enable HTTP proxy
http_proxy = true
# HTTP proxy port
http_port = 8080
# Enable SOCKS proxy
socks_proxy = true
# SOCKS proxy port
socks_port = 1080
# Allow direct connections for non-corporate traffic
allow_direct = false
# Domains to exclude from proxying
exclude_domains = ["localhost", "127.0.0.1"]
```

## Advanced Configuration

### Split Tunneling

Configure split tunneling to selectively route traffic:

```toml
[split_tunneling]
# Enable split tunneling
enabled = true
# Domains to route through the tunnel
include_domains = [
  "*.example.com",
  "internal.company.net"
]
# IP ranges to route through the tunnel
include_ips = [
  "192.168.1.0/24",
  "10.0.0.0/8"
]
# Domains to exclude from tunneling
exclude_domains = [
  "public-service.com"
]
```

### Outbound Proxy

Configure the client to use an external proxy for outbound connections:

```toml
[outbound_proxy]
# Proxy URL
url = "http://proxy.example.com:8080"
# Authentication username (if required)
username = "proxyuser"
# Authentication password (if required)
password = "proxypass"
# Domains to bypass proxy
bypass_domains = ["internal.example.com"]
```

### Monitoring Integration

Configure monitoring and metrics:

```toml
[monitoring]
# Enable Prometheus metrics
prometheus = true
# Prometheus metrics port
prometheus_port = 9090
# Enable healthcheck endpoint
healthcheck = true
# Healthcheck port
healthcheck_port = 8087
```

## Environment Variables

Configuration can also be provided via environment variables, which take precedence over the configuration file. Environment variables are prefixed with `OPENZTNA_CLIENT_` and use underscores instead of dots for nested properties:

```bash
# Server configuration
export OPENZTNA_CLIENT_SERVER_HOST=0.0.0.0
export OPENZTNA_CLIENT_SERVER_PORT=3001

# Control plane configuration
export OPENZTNA_CLIENT_CONTROL_PLANE_URL=https://control-plane.example.com

# Authentication configuration
export OPENZTNA_CLIENT_AUTH_CLIENT_ID=your-client-id
export OPENZTNA_CLIENT_AUTH_CLIENT_SECRET=your-client-secret
```

## Configuration Templates

### Basic Configuration Template

Minimal configuration for getting started:

```toml
[server]
host = "127.0.0.1"
port = 3001

[control_plane]
url = "https://control-plane.example.com"

[auth]
identity_provider = "oidc"
client_id = "your-client-id"
client_secret = "your-client-secret"
oauth_url = "https://auth.example.com"
```

### Enterprise Configuration Template

Comprehensive configuration for enterprise environments:

```toml
[server]
host = "127.0.0.1"
port = 3001
log_level = "info"
log_file = "/var/log/openztna-client.log"

[control_plane]
url = "https://control-plane.example.com"
check_interval = 60
timeout = 10
ca_cert_path = "/path/to/ca.crt"

[auth]
identity_provider = "oidc"
client_id = "your-client-id"
client_secret = "your-client-secret"
oauth_url = "https://auth.example.com"
redirect_uri = "http://localhost:8085/callback"
token_refresh_margin = 300
token_storage = "encrypted_file"

[device_assessment]
enabled = true
interval = 300
required_os_updates = true
firewall_required = true
antivirus_required = true
disk_encryption_required = true

[tunneling]
protocol = "wireguard"
mtu = 1420
keep_alive = 25
dns_servers = ["8.8.8.8", "1.1.1.1"]

[proxy]
http_proxy = true
http_port = 8080
socks_proxy = true
socks_port = 1080
allow_direct = false

[split_tunneling]
enabled = true
include_domains = ["*.example.com", "internal.company.net"]
include_ips = ["192.168.1.0/24", "10.0.0.0/8"]

[monitoring]
prometheus = true
prometheus_port = 9090
healthcheck = true
healthcheck_port = 8087
```

## Configuration Validation

To validate your configuration file without starting the client:

```bash
openztna-client-connector --validate-config
```

This command checks the syntax and semantics of your configuration file and reports any errors.

## Next Steps

After configuring the Client Connector:

- Learn how to [use](./usage) the Client Connector
- Explore [integration options](../guides/integration) with your existing infrastructure
- Set up [monitoring](../guides/monitoring) for deployed clients