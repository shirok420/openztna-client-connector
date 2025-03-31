---
sidebar_position: 3
---

# Usage Guide

This guide explains how employees can use the OpenZTNA Client Connector to securely access enterprise resources.

## User Interface Overview

The OpenZTNA Client Connector provides several interfaces for users:

1. **System Tray/Menu Bar Icon**: Quick access to status and controls
2. **Status Dashboard**: Detailed information about connection and security
3. **Browser Extension**: Optional extension for seamless web application access

## Getting Started

### First-Time Setup

When launching the Client Connector for the first time:

1. **Authentication**: You'll be prompted to authenticate with your organization's identity provider
2. **Device Assessment**: The client will check your device's security posture
3. **Initial Configuration**: The client will apply settings from your organization's policies

### Authentication

The authentication process is straightforward:

1. A browser window will open to your organization's identity provider
2. Log in with your credentials (and complete any multi-factor authentication)
3. The browser will redirect back to the client, completing authentication
4. Your session will remain active based on your organization's policies

## Accessing Resources

### Web Applications

For web applications, you have two options:

#### Option 1: Browser with Proxy Configuration

1. The Client Connector automatically configures your default browser
2. Navigate to internal applications using their normal URLs
3. Access is secured through the Client Connector

#### Option 2: Browser Extension

If your organization provides a browser extension:

1. Install the extension from your browser's extension store
2. The extension will connect to the local Client Connector
3. Navigate to internal applications using their normal URLs
4. The extension will handle authentication and secure access

### Non-Web Applications

For non-web applications (e.g., SSH, database clients):

1. Configure the application to use the SOCKS proxy at `127.0.0.1:1080`
2. Connect to the internal resource using its normal address
3. The Client Connector will handle authentication and secure access

Example SSH configuration:

```
# ~/.ssh/config
Host internal-server
    HostName internal-server.example.com
    User username
    ProxyCommand nc -x 127.0.0.1:1080 %h %p
```

## Managing Your Connection

### System Tray/Menu Bar Controls

The system tray/menu bar icon provides quick access to common functions:

- **Status**: View current connection status
- **Connect/Disconnect**: Manually control the connection
- **Settings**: Access user-configurable settings
- **Exit**: Close the Client Connector

### Connection Status

The connection status is indicated by the icon color:

- **Green**: Connected and secure
- **Yellow**: Connected with warnings
- **Red**: Not connected or security issues
- **Gray**: Disconnected

### Status Dashboard

The status dashboard provides detailed information:

1. Open the dashboard by clicking "Show Dashboard" in the system tray/menu bar menu
2. View connection details, device security status, and active applications
3. Access troubleshooting tools and logs

## Common Tasks

### Checking Connection Status

To verify your connection is working:

1. Click the system tray/menu bar icon
2. Select "Show Dashboard"
3. Check the "Connection" section for status

### Viewing Accessible Applications

To see which applications you can access:

1. Open the status dashboard
2. Navigate to the "Applications" tab
3. Browse the list of applications you're authorized to access

### Manually Reconnecting

If you experience connection issues:

1. Click the system tray/menu bar icon
2. Select "Disconnect"
3. Wait a few seconds
4. Select "Connect"

### Updating Device Security

If access is blocked due to device security issues:

1. Open the status dashboard
2. Navigate to the "Device Security" tab
3. Address the highlighted security issues
4. Click "Re-assess Device" to update your status

## Troubleshooting

### Common Issues

| Issue | Symptoms | Solution |
|-------|----------|----------|
| Authentication failure | "Authentication failed" message | Check credentials and try again |
| Device security failure | "Device does not meet security requirements" | Address security issues listed in dashboard |
| Connection issues | Applications not loading | Check network connection and client status |
| Resource access denied | "Access denied" message | Verify you have permission for the resource |

### Viewing Logs

For advanced troubleshooting:

1. Open the status dashboard
2. Navigate to the "Logs" tab
3. Set the log level (Info, Debug, Trace)
4. Review logs for error messages

### Getting Help

If you encounter issues:

1. Check the troubleshooting section in the status dashboard
2. Contact your IT support team with:
   - Error messages from the logs
   - Screenshot of the status dashboard
   - Description of what you were trying to access

## Best Practices

### Security Recommendations

- **Keep the Client Connector running**: Ensures continuous protection
- **Update your device**: Maintain current OS and security updates
- **Report suspicious behavior**: Alert IT if you notice unusual access patterns
- **Lock your device**: When stepping away, even briefly
- **Use strong authentication**: Enable MFA if available

### Performance Optimization

- **Close unused applications**: Reduces resource usage
- **Connect to reliable networks**: Ensures stable connections
- **Update the Client Connector**: Install updates when prompted
- **Restart occasionally**: Clears cached data and refreshes connections

## Privacy Considerations

The OpenZTNA Client Connector:

- **Does** monitor connections to enterprise resources
- **Does** assess device security posture
- **Does** enforce access policies
- **Does not** monitor personal activities
- **Does not** collect keystrokes or screenshots
- **Does not** access personal files

## Next Steps

- Learn about [advanced features](../features/overview) of the Client Connector
- Understand the [security model](../architecture/security-model) protecting your access
- Explore [integration options](../guides/integration) with other tools