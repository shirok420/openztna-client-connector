---
sidebar_position: 1
---

# Installation Guide

This guide provides step-by-step instructions for deploying the OpenZTNA Client Connector to employee devices.

## Deployment Options

OpenZTNA Client Connector can be deployed in several ways:

1. **Manual Installation**: Direct installation on individual devices
2. **Automated Deployment**: Mass deployment using MDM/EMM systems
3. **Self-Service Portal**: Employee-initiated installation

## Prerequisites

Before deploying the Client Connector, ensure you have:

- Control Plane server accessible to all employee devices
- Identity provider configured (OAuth2/OIDC compatible)
- Access policies defined for your applications
- Administrator access on target devices

## Manual Installation

### Step 1: Download the Client Connector

Download the appropriate package for your operating system:

```bash
# Clone the repository
git clone https://github.com/openztna/client-connector.git
cd client-connector

# Build the client connector
cargo build --release --package openztna-client-connector
```

Pre-built packages are also available on the [releases page](https://github.com/openztna/client-connector/releases).

### Step 2: Install the Client Connector

#### Windows

1. Run the installer package as administrator
2. Follow the installation wizard
3. Select installation options (startup behavior, proxy settings)
4. Complete the installation

#### macOS

1. Open the DMG file
2. Drag the Client Connector to Applications
3. Open System Preferences → Security & Privacy → Privacy
4. Grant necessary permissions (Network, Input Monitoring, Full Disk Access)

#### Linux

```bash
# Debian/Ubuntu
sudo dpkg -i openztna-client-connector.deb

# RHEL/CentOS
sudo rpm -i openztna-client-connector.rpm
```

### Step 3: Configure the Client Connector

Create a configuration file at the appropriate location:

- Windows: `C:\ProgramData\OpenZTNA\config\client-connector.toml`
- macOS: `/Library/Application Support/OpenZTNA/config/client-connector.toml`
- Linux: `/etc/openztna/client-connector.toml`

Basic configuration:

```toml
[server]
host = "127.0.0.1"
port = 3001

[control_plane]
url = "https://control-plane.example.com"
check_interval = 60  # seconds

[auth]
identity_provider = "oauth2"
client_id = "your-client-id"
client_secret = "your-client-secret"
oauth_url = "https://auth.example.com"

[device_assessment]
enabled = true
required_os_updates = true
firewall_required = true
antivirus_required = true
```

## Automated Deployment

### Windows Deployment (SCCM/Intune)

1. Create an application package in SCCM/Intune
2. Include the installer and configuration file
3. Set installation parameters for silent installation
4. Define deployment scope (users/devices)
5. Schedule deployment

Example PowerShell script for silent installation:

```powershell
# Install Client Connector
Start-Process -FilePath "OpenZTNAClientConnector.exe" -ArgumentList "/S" -Wait

# Copy configuration file
Copy-Item "client-connector.toml" -Destination "C:\ProgramData\OpenZTNA\config\"

# Start service
Start-Service -Name "OpenZTNAClient"
```

### macOS Deployment (Jamf)

1. Create a policy in Jamf Pro
2. Upload the PKG installer
3. Configure installation settings
4. Create a configuration profile for settings
5. Scope and deploy to target devices

### Linux Deployment (Ansible)

```yaml
- name: Install OpenZTNA Client Connector
  hosts: workstations
  tasks:
    - name: Copy package
      copy:
        src: openztna-client-connector.deb
        dest: /tmp/openztna-client-connector.deb
        
    - name: Install package
      apt:
        deb: /tmp/openztna-client-connector.deb
        
    - name: Create configuration file
      template:
        src: templates/client-connector.toml.j2
        dest: /etc/openztna/client-connector.toml
        
    - name: Enable and start service
      systemd:
        name: openztna-client
        enabled: yes
        state: started
```

## Self-Service Portal

For organizations that prefer employee-initiated installation:

1. Set up a self-service portal on your intranet
2. Provide download links for each platform
3. Include step-by-step installation instructions
4. Offer configuration assistance

## Post-Installation Verification

After installation, verify that the Client Connector is working correctly:

1. Check service status:
   ```bash
   # Windows
   sc query OpenZTNAClient
   
   # macOS/Linux
   systemctl status openztna-client
   ```

2. Verify connectivity to Control Plane:
   ```bash
   curl http://127.0.0.1:3001/health
   ```

3. Test application access through the Client Connector

## Troubleshooting Common Deployment Issues

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Installation fails | Insufficient permissions | Run installer as administrator/root |
| Service won't start | Configuration error | Check logs for specific errors |
| Authentication fails | Incorrect client credentials | Verify client_id and client_secret |
| Device assessment fails | Missing security tools | Install required security software |
| Application access fails | Policy configuration | Check access policies in Control Plane |

## Next Steps

After successfully deploying the Client Connector:

- [Configure](./configuration) the Client Connector for your environment
- Learn how to [use](./usage) the Client Connector
- Set up [monitoring](../guides/monitoring) for deployed clients