---
sidebar_position: 1
---

# Integration Guide

This guide explains how to integrate the OpenZTNA Client Connector with your existing security infrastructure, identity systems, and endpoint management tools.

## Integration Overview

The OpenZTNA Client Connector is designed to work seamlessly with your existing security ecosystem:

```
+----------------------------------+
|                                  |
|  +----------------------------+  |
|  |  OpenZTNA Client Connector |  |
|  +----------------------------+  |
|              ↑ ↓                 |
+--------------|------------------+
               |
+--------------|------------------+
|              ↓                  |
| +------------+-------------+    |
| |  Identity Management     |    |
| |  - Active Directory      |    |
| |  - Azure AD / Entra ID   |    |
| |  - Okta / Auth0          |    |
| |  - Google Workspace      |    |
| +--------------------------|    |
|                            |    |
| +------------------------+ |    |
| |  Endpoint Management   | |    |
| |  - Microsoft Intune    | |    |
| |  - Jamf                | |    |
| |  - VMware Workspace ONE| |    |
| |  - MobileIron          | |    |
| +------------------------+ |    |
|                            |    |
| +------------------------+ |    |
| |  Security Monitoring   | |    |
| |  - SIEM Systems        | |    |
| |  - EDR Solutions       | |    |
| |  - Security Analytics  | |    |
| +------------------------+ |    |
|                            |    |
+----------------------------+    |
     Existing Infrastructure      |
+--------------------------------+
```

## Identity Provider Integration

### OAuth2/OIDC Integration

The Client Connector supports standard OAuth2/OIDC providers:

1. **Register an OAuth2/OIDC Application**

   Register a new application with your identity provider:
   
   - **Application Type**: Native/Desktop
   - **Redirect URI**: `http://localhost:8085/callback` (or your configured port)
   - **Scopes**: `openid profile email` (minimum required)
   - **Grant Types**: Authorization Code with PKCE

2. **Configure the Client Connector**

   Update your client configuration:

   ```toml
   [auth]
   identity_provider = "oidc"
   client_id = "your-client-id"
   client_secret = "your-client-secret"
   oauth_url = "https://your-idp.example.com"
   redirect_uri = "http://localhost:8085/callback"
   ```

### Provider-Specific Configuration

#### Microsoft Entra ID (Azure AD)

```toml
[auth]
identity_provider = "oidc"
client_id = "your-azure-client-id"
client_secret = "your-azure-client-secret"
oauth_url = "https://login.microsoftonline.com/your-tenant-id/v2.0"
redirect_uri = "http://localhost:8085/callback"
scope = "openid profile email offline_access"
```

**Azure Portal Configuration:**
1. Register a new application in Azure AD
2. Set platform as "Mobile and desktop applications"
3. Add redirect URI: `http://localhost:8085/callback`
4. Grant API permissions for Microsoft Graph (User.Read minimum)
5. Enable public client flows

#### Okta

```toml
[auth]
identity_provider = "oidc"
client_id = "your-okta-client-id"
client_secret = "your-okta-client-secret"
oauth_url = "https://your-org.okta.com/oauth2/default"
redirect_uri = "http://localhost:8085/callback"
scope = "openid profile email offline_access"
```

**Okta Admin Configuration:**
1. Create a new OIDC application
2. Set application type as "Native Application"
3. Add redirect URI: `http://localhost:8085/callback`
4. Grant appropriate scopes
5. Assign the application to relevant users/groups

#### Google Workspace

```toml
[auth]
identity_provider = "oidc"
client_id = "your-google-client-id"
client_secret = "your-google-client-secret"
oauth_url = "https://accounts.google.com"
redirect_uri = "http://localhost:8085/callback"
scope = "openid profile email"
```

**Google Cloud Console Configuration:**
1. Create a new OAuth client ID
2. Set application type as "Desktop app"
3. Configure consent screen with appropriate scopes
4. Restrict access to your Google Workspace domain

## Endpoint Management Integration

### MDM/EMM Integration

#### Microsoft Intune

1. **Create Application Package**
   - Create a Win32 app package for Windows
   - Create a macOS app package for macOS
   - Include the installer and configuration file

2. **Configure Installation Settings**
   - Set installation command: `OpenZTNAClientConnector.exe /S` (Windows)
   - Set installation command: `installer -pkg OpenZTNAClientConnector.pkg -target /` (macOS)
   - Set uninstallation command as appropriate

3. **Configure Detection Rules**
   - File existence: `C:\Program Files\OpenZTNA\Client\openztna-client.exe` (Windows)
   - File existence: `/Applications/OpenZTNA Client.app/Contents/MacOS/openztna-client` (macOS)

4. **Configure Requirements**
   - Set minimum OS version
   - Set device type requirements

5. **Assign to Groups**
   - Assign to appropriate user or device groups
   - Set deployment type (required/available)

#### Jamf Pro

1. **Create Package**
   - Upload the macOS PKG installer to Jamf Pro
   - Configure installation settings

2. **Create Configuration Profile**
   - Create a custom settings profile
   - Use preference domain: `com.openztna.client`
   - Upload a properly formatted configuration plist

3. **Create Smart Group**
   - Define criteria for deployment targets
   - Include appropriate devices

4. **Create Policy**
   - Set trigger events (enrollment, recurring check-in)
   - Assign package and configuration profile
   - Set execution frequency

#### VMware Workspace ONE

1. **Add Application**
   - Upload installer package
   - Configure installation commands
   - Set detection criteria

2. **Create Device Profile**
   - Configure client settings
   - Set security requirements

3. **Assign to Smart Groups**
   - Define deployment targets
   - Set deployment schedule

### Automated Deployment Scripts

#### Windows PowerShell Deployment

```powershell
# PowerShell deployment script
# Save as Deploy-OpenZTNAClient.ps1

# Parameters
param (
    [string]$ConfigPath = ".\client-config.toml",
    [string]$InstallerPath = ".\OpenZTNAClientConnector.exe"
)

# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Error "This script must be run as Administrator"
    exit 1
}

# Install Client Connector
Write-Host "Installing OpenZTNA Client Connector..."
Start-Process -FilePath $InstallerPath -ArgumentList "/S" -Wait

# Create config directory if it doesn't exist
$ConfigDir = "C:\ProgramData\OpenZTNA\config"
if (-NOT (Test-Path $ConfigDir)) {
    New-Item -Path $ConfigDir -ItemType Directory -Force
}

# Copy configuration file
Write-Host "Deploying configuration..."
Copy-Item $ConfigPath -Destination "$ConfigDir\client-connector.toml" -Force

# Start service
Write-Host "Starting service..."
Start-Service -Name "OpenZTNAClient"

Write-Host "Deployment complete!"
```

#### macOS Deployment Script

```bash
#!/bin/bash
# macOS deployment script
# Save as deploy_openztna_client.sh

# Parameters
INSTALLER_PATH="./OpenZTNAClientConnector.pkg"
CONFIG_PATH="./client-config.toml"
CONFIG_DIR="/Library/Application Support/OpenZTNA/config"

# Check if running as root
if [ "$(id -u)" -ne 0 ]; then
    echo "This script must be run as root"
    exit 1
fi

# Install Client Connector
echo "Installing OpenZTNA Client Connector..."
installer -pkg "$INSTALLER_PATH" -target /

# Create config directory if it doesn't exist
mkdir -p "$CONFIG_DIR"

# Copy configuration file
echo "Deploying configuration..."
cp "$CONFIG_PATH" "$CONFIG_DIR/client-connector.toml"

# Set permissions
chmod 644 "$CONFIG_DIR/client-connector.toml"

# Start service
echo "Starting service..."
launchctl load /Library/LaunchDaemons/com.openztna.client.plist

echo "Deployment complete!"
```

## Security Monitoring Integration

### SIEM Integration

Configure the Client Connector to send logs to your SIEM system:

```toml
[logging]
# Enable SIEM integration
siem_integration = true
# Log format (CEF, LEEF, JSON)
siem_format = "CEF"
# SIEM destination
siem_destination = "syslog://siem.example.com:514"
# Log level for SIEM (debug, info, warn, error)
siem_log_level = "info"
# Include additional fields
siem_additional_fields = ["device_id", "user_id", "application"]
```

#### Splunk Integration

1. **Configure Splunk Universal Forwarder** on client devices or
2. **Configure Syslog Forwarding** to Splunk HTTP Event Collector:

```toml
[logging]
siem_integration = true
siem_format = "JSON"
siem_destination = "http://splunk.example.com:8088/services/collector/event"
siem_http_headers = { "Authorization" = "Splunk YOUR-HEC-TOKEN" }
```

#### QRadar Integration

```toml
[logging]
siem_integration = true
siem_format = "LEEF"
siem_destination = "syslog://qradar.example.com:514"
```

### EDR Integration

The Client Connector can integrate with Endpoint Detection and Response (EDR) solutions:

```toml
[device_assessment]
# Enable EDR integration
edr_integration = true
# EDR vendor (crowdstrike, sentinelone, carbonblack, etc.)
edr_vendor = "crowdstrike"
# EDR check command
edr_check_command = "/opt/CrowdStrike/falconctl status"
# EDR status regex (pattern to match for "running" status)
edr_status_regex = "State: Running"
```

#### CrowdStrike Integration

```toml
[device_assessment]
edr_integration = true
edr_vendor = "crowdstrike"
edr_check_command = "C:\\Program Files\\CrowdStrike\\CSFalconService.exe --status"
edr_status_regex = "State: Running"
```

#### SentinelOne Integration

```toml
[device_assessment]
edr_integration = true
edr_vendor = "sentinelone"
edr_check_command = "powershell -Command \"Get-Service -Name SentinelAgent | Select-Object -ExpandProperty Status\""
edr_status_regex = "Running"
```

## Network Infrastructure Integration

### Proxy Integration

Configure the Client Connector to work with existing proxy infrastructure:

```toml
[outbound_proxy]
# Corporate proxy URL
url = "http://proxy.example.com:8080"
# Authentication username (if required)
username = "proxyuser"
# Authentication password (if required)
password = "proxypass"
# Domains to bypass proxy
bypass_domains = ["internal.example.com", "*.local"]
```

### DNS Integration

Configure the Client Connector to use specific DNS servers:

```toml
[dns]
# DNS servers to use
servers = ["192.168.1.53", "192.168.1.54"]
# Search domains
search_domains = ["example.com", "corp.example.com"]
# Split DNS configuration
split_dns = [
  { domain = "internal.example.com", servers = ["10.0.0.53"] },
  { domain = "corp.example.com", servers = ["10.0.0.54"] }
]
```

## Custom Integration API

The Client Connector provides a local API for custom integrations:

```toml
[api]
# Enable local API
enabled = true
# API port
port = 8086
# Require authentication
require_auth = true
# API token (if require_auth is true)
token = "your-secure-api-token"
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/status` | GET | Get client status |
| `/api/v1/device` | GET | Get device information |
| `/api/v1/applications` | GET | List accessible applications |
| `/api/v1/connect` | POST | Establish connection |
| `/api/v1/disconnect` | POST | Terminate connection |

### Example API Usage

```bash
# Get client status
curl -X GET http://127.0.0.1:8086/api/v1/status \
  -H "Authorization: Bearer your-secure-api-token"

# Connect to the ZTNA network
curl -X POST http://127.0.0.1:8086/api/v1/connect \
  -H "Authorization: Bearer your-secure-api-token"
```

## Troubleshooting Integration Issues

### Common Integration Issues

| Issue | Possible Causes | Solutions |
|-------|----------------|-----------|
| Identity provider connection fails | Incorrect OAuth configuration, network issues | Verify client ID, client secret, and OAuth URL; check network connectivity |
| MDM deployment fails | Incorrect package format, permissions issues | Verify package format for the target platform; ensure proper permissions |
| SIEM integration not working | Network connectivity, format mismatch | Check network connectivity to SIEM; verify log format compatibility |
| EDR integration fails | Incorrect command path, permissions | Verify EDR command path; ensure client has permissions to execute command |

### Integration Testing

Before full deployment, test integration with:

1. **Test Identity Provider Integration**:
   ```bash
   openztna-client-connector --test-auth
   ```

2. **Test SIEM Integration**:
   ```bash
   openztna-client-connector --test-siem
   ```

3. **Test EDR Integration**:
   ```bash
   openztna-client-connector --test-edr
   ```

## Next Steps

After integrating the Client Connector with your infrastructure:

- [Deploy](../getting-started/installation) the Client Connector to your endpoints
- [Configure](../getting-started/configuration) the Client Connector for your environment