# Authentication Flow Diagram

## OAuth 2.0 Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Client as Client Connector
    participant CP as Control Plane
    participant IdP as Identity Provider

    User->>Client: Login Request
    Client->>CP: /api/v1/auth/login
    CP->>IdP: Authenticate User
    IdP-->>CP: Authentication Response
    
    alt Authentication Successful
        CP-->>Client: Access Token + Refresh Token
        Client-->>User: Login Successful
    else Authentication Failed
        CP-->>Client: Authentication Error
        Client-->>User: Login Failed
    end

    Note over Client,CP: Subsequent API Requests
    Client->>CP: Request with Access Token
    CP-->>Client: API Response

    Note over Client,CP: Token Refresh
    Client->>CP: /api/v1/auth/refresh (Refresh Token)
    CP-->>Client: New Access Token

    Note over Client,CP: Logout
    User->>Client: Logout Request
    Client->>CP: /api/v1/auth/logout
    CP-->>Client: Tokens Invalidated
    Client-->>User: Logged Out
```

## Device Registration Flow

```mermaid
sequenceDiagram
    participant User
    participant Client as Client Connector
    participant CP as Control Plane
    
    User->>Client: Install Client Connector
    Client->>Client: Generate Device ID
    
    User->>Client: Login with Credentials
    Client->>CP: /api/v1/auth/login
    CP-->>Client: Access Token
    
    Client->>Client: Collect Device Info
    Client->>CP: /api/v1/devices (POST)
    CP->>CP: Validate Device
    CP->>CP: Apply Security Policies
    CP-->>Client: Device Registration Response
    
    alt Registration Successful
        Client-->>User: Device Registered
    else Registration Failed
        Client-->>User: Registration Failed
    end
    
    Note over Client,CP: Periodic Device Assessment
    Client->>Client: Assess Device Security
    Client->>CP: /api/v1/devices/{id} (PUT)
    CP->>CP: Update Device Status
    CP-->>Client: Updated Device Status
```

## Access Control Flow

```mermaid
sequenceDiagram
    participant User
    participant Client as Client Connector
    participant CP as Control Plane
    participant App as Application Connector
    participant Resource as Protected Resource
    
    User->>Client: Request Access to Resource
    Client->>CP: /api/v1/applications
    CP-->>Client: Available Applications
    
    User->>Client: Select Application
    Client->>CP: Request Access to Application
    CP->>CP: Evaluate Policies
    
    alt Access Granted
        CP-->>Client: Access Token for Application
        Client->>App: Forward Request with Token
        App->>CP: Validate Token
        CP-->>App: Token Valid + Policies
        App->>Resource: Forward Request
        Resource-->>App: Resource Response
        App-->>Client: Forward Response
        Client-->>User: Display Resource
    else Access Denied
        CP-->>Client: Access Denied
        Client-->>User: Access Denied Message
    end
```

## Token Validation Flow

```mermaid
sequenceDiagram
    participant Client as Client/App Connector
    participant CP as Control Plane
    participant Cache as Token Cache
    
    Client->>CP: Request with Access Token
    CP->>Cache: Check Token
    
    alt Token in Cache
        Cache-->>CP: Token Valid
    else Token Not in Cache
        CP->>CP: Validate Token Signature
        CP->>CP: Check Token Expiration
        CP->>CP: Verify Token Claims
        CP->>Cache: Store Valid Token
    end
    
    alt Token Valid
        CP->>CP: Check Permissions
        CP-->>Client: Authorized Response
    else Token Invalid
        CP-->>Client: 401 Unauthorized
    end