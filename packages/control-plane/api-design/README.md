# Control Plane API Design

This directory contains the API design documentation for the Control Plane component of the OpenZTNA Client Connector.

## Overview

The Control Plane API serves as the central coordination point for the ZTNA system, providing endpoints for:

1. Authentication and authorization
2. Policy management
3. Device registration and management
4. Application registration and access control

## API Specification

The API follows RESTful principles and uses JSON for data exchange. All endpoints are versioned with a `/api/v1` prefix.

### Authentication Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/auth/login` | POST | Authenticate a user and receive access tokens |
| `/api/v1/auth/refresh` | POST | Refresh an expired access token |
| `/api/v1/auth/logout` | POST | Invalidate current tokens |

### Policy Management Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/policies` | GET | List all policies |
| `/api/v1/policies` | POST | Create a new policy |
| `/api/v1/policies/{id}` | GET | Get a specific policy |
| `/api/v1/policies/{id}` | PUT | Update a policy |
| `/api/v1/policies/{id}` | DELETE | Delete a policy |

### Device Management Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/devices` | GET | List all registered devices |
| `/api/v1/devices` | POST | Register a new device |
| `/api/v1/devices/{id}` | GET | Get device details |
| `/api/v1/devices/{id}` | PUT | Update device information |
| `/api/v1/devices/{id}` | DELETE | Remove a device |

### Application Management Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/applications` | GET | List all applications |
| `/api/v1/applications` | POST | Register a new application |
| `/api/v1/applications/{id}` | GET | Get application details |
| `/api/v1/applications/{id}` | PUT | Update application information |
| `/api/v1/applications/{id}` | DELETE | Remove an application |

## Data Models

### User

```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "roles": ["string"],
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Policy

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "rules": [
    {
      "resource": "string",
      "action": "string",
      "conditions": {}
    }
  ],
  "assignedTo": {
    "users": ["string"],
    "devices": ["string"],
    "groups": ["string"]
  },
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Device

```json
{
  "id": "string",
  "name": "string",
  "type": "string",
  "osType": "string",
  "osVersion": "string",
  "lastSeen": "datetime",
  "status": "string",
  "securityStatus": {
    "compliant": "boolean",
    "issues": ["string"]
  },
  "userId": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Application

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "url": "string",
  "type": "string",
  "status": "string",
  "policies": ["string"],
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## Authentication Flow

The Control Plane uses OAuth 2.0 with JWT tokens for authentication:

1. Client authenticates with username/password to receive access and refresh tokens
2. Access token is included in the Authorization header for subsequent requests
3. When the access token expires, the refresh token can be used to obtain a new access token
4. Tokens can be revoked by calling the logout endpoint

## Next Steps

1. Implement the API endpoints in Rust using Actix-web
2. Create database models and migrations
3. Implement authentication with JWT
4. Add policy evaluation logic
5. Connect with Client and Application Connectors