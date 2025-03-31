# Contributing to OpenZTNA

Thank you for your interest in contributing to OpenZTNA! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to foster an open and welcoming environment.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/openztna-client-connector.git`
3. Create a new branch for your feature or bugfix: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Run tests to ensure your changes don't break existing functionality: `cargo test`
6. Commit your changes: `git commit -m "Add your meaningful commit message"`
7. Push to your branch: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Workflow

### Setting Up Development Environment

1. Ensure you have Rust 1.70 or later installed
2. Install required dependencies as specified in the README.md
3. Run `cargo build` to build all components

### Running Tests

```bash
# Run all tests
cargo test

# Run tests for a specific component
cargo test --package openztna-client-connector
```

### Code Style

- Follow the Rust style guidelines
- Use `cargo fmt` to format your code
- Use `cargo clippy` to catch common mistakes and improve your code

## Pull Request Process

1. Update the README.md or documentation with details of changes if appropriate
2. Update the CHANGELOG.md with details of changes
3. The PR should work on the main development branch
4. Include tests for new functionality
5. Ensure CI passes for your PR
6. A maintainer will review and merge your PR

## Reporting Bugs

When reporting bugs, please include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Your environment (OS, Rust version, etc.)

## Feature Requests

Feature requests are welcome! Please provide:

- A clear and descriptive title
- A detailed description of the proposed feature
- Any relevant examples or use cases
- If possible, a rough implementation idea

## License

By contributing to OpenZTNA, you agree that your contributions will be licensed under the project's [Apache License 2.0](LICENSE).