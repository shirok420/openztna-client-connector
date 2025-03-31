---
sidebar_position: 1
slug: /
---

# OpenZTNA Client Connector

OpenZTNA Client Connector is a free, open-source Zero Trust Network Access (ZTNA) client that secures access to enterprise resources from employee devices. It implements the "never trust, always verify" principle to protect your organization's applications and data.

## What is Zero Trust Network Access?

Zero Trust Network Access (ZTNA) is a security model that:

- Provides application-level access instead of network-level access
- Continuously verifies user identity and device security posture
- Applies least privilege principles to minimize attack surface
- Encrypts all communications end-to-end
- Operates independently of network location

## Why OpenZTNA Client Connector?

Commercial ZTNA clients have several limitations:

- **Licensing Costs**: Subscription-based pricing that scales with your workforce
- **Closed Source**: No visibility into the code or security implementation
- **Limited Customization**: Difficult to adapt to specific organizational needs
- **Vendor Lock-in**: Dependency on a single vendor's ecosystem

OpenZTNA Client Connector addresses these challenges by providing:

- **Free and Open**: No licensing costs, fully open-source under Apache License 2.0
- **Transparent Security**: Open code that can be audited and verified
- **Customizable**: Adapt to your specific organizational requirements
- **Vendor-Independent**: Works with various ZTNA infrastructure components

## How It Protects Your Endpoints

The OpenZTNA Client Connector secures employee devices by:

1. **Authenticating Users**: Verifies user identity through OAuth2/OIDC
2. **Assessing Device Security**: Checks device posture before granting access
3. **Enforcing Access Policies**: Applies granular, context-aware access controls
4. **Securing Communications**: Creates encrypted tunnels to protected resources
5. **Continuous Monitoring**: Maintains security throughout the session

## Key Components

The Client Connector consists of five core modules:

- **Authentication Module**: Handles user authentication with identity providers
- **Device Assessment Engine**: Evaluates device security state
- **Tunneling Module**: Establishes encrypted communication channels
- **Policy Enforcer**: Applies access policies locally
- **Local Proxy**: Mediates application traffic

## Getting Started

Ready to secure your endpoints? Follow our [installation guide](./getting-started/installation) to deploy the OpenZTNA Client Connector to your organization's devices.
