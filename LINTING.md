# Linting and Formatting in OpenZTNA Client Connector

This project uses various linting and formatting tools to ensure consistent code style and quality across different parts of the codebase. Currently, we have set up linting for the admin-console component, with plans to extend it to other parts of the project.

## Components

- **Admin Console**: Uses ESLint and Prettier (fully configured)
- **Rust code**: Uses Clippy (configured but not integrated into pre-commit)
- **Website**: Uses ESLint and Prettier (configured but not integrated into pre-commit)

## Pre-commit Hook

The pre-commit hook currently:
1. Formats admin-console files using Prettier

Future enhancements will include:
1. Formatting website files
2. Running Clippy on Rust code

## Usage

- **Admin Console**: `cd packages/control-plane/admin-console && yarn format`
- **Rust**: `./rust-lint.sh` (manual execution)
- **Website**: `cd website && yarn format` (manual execution)

We plan to integrate all components into the pre-commit hook in the future to ensure consistent code quality across the entire project.