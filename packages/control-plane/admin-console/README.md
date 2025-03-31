# OpenZTNA Admin Console

The Admin Console is a web-based interface for managing the OpenZTNA Control Plane. It provides a user-friendly way to configure security policies, manage devices, and monitor the Zero Trust Network Access system.

## Features

- **Dashboard**: Get an overview of your ZTNA environment with key metrics and status information
- **Device Management**: View, add, and manage devices connecting to your network
- **Policy Configuration**: Create and manage security policies for endpoint protection
- **User Management**: Manage user access and permissions
- **Monitoring & Reporting**: View logs, alerts, and generate reports

## Technology Stack

- **Frontend**: Next.js, React, Material UI
- **Backend**: Rust-based API (OpenZTNA Control Plane)
- **Authentication**: OAuth2/OIDC integration

## Getting Started

### Prerequisites

- Node.js 18.x or later
- Yarn package manager
- Running OpenZTNA Control Plane instance

### Installation

1. Install dependencies:

```bash
cd packages/control-plane/admin-console
yarn install
```

2. Configure the environment:

Create a `.env.local` file with the following content:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Replace the API URL with the address of your Control Plane API.

### Development

Run the development server:

```bash
yarn dev
```

The admin console will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

Build the application:

```bash
yarn build
```

Start the production server:

```bash
yarn start
```

### Docker Deployment

You can also run the Admin Console using Docker:

```bash
# Build the Docker image
docker build -t openztna-admin-console .

# Run the container
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://control-plane:3001/api openztna-admin-console
```

## Integration with Control Plane

The Admin Console communicates with the OpenZTNA Control Plane API to manage the ZTNA environment. The Control Plane provides the following API endpoints:

- `/api/v1/devices` - Device management
- `/api/v1/policies` - Security policy management
- `/api/v1/users` - User management
- `/api/v1/stats` - System statistics and metrics

## Customization

### Theming

You can customize the appearance of the Admin Console by modifying the theme in `src/pages/_app.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#your-primary-color',
    },
    secondary: {
      main: '#your-secondary-color',
    },
  },
  // Other theme options
});
```

### Adding New Features

To add new features or pages:

1. Create a new page in the `src/pages` directory
2. Add the page to the navigation menu in `src/components/Layout.tsx`
3. Implement the necessary API calls in the page component

## Contributing

Contributions to the Admin Console are welcome! Please see the main [CONTRIBUTING.md](../../../CONTRIBUTING.md) file for guidelines.

## License

This project is released under the [Apache License 2.0](../../../LICENSE).
