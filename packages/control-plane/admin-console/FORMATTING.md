# Code Formatting and Linting

This project uses Prettier to enforce consistent code style and formatting across different developer environments. This helps prevent formatting differences in commits and ensures a consistent codebase.

## Tools Used

- **Prettier**: For consistent code formatting
- **Husky**: For Git hooks to run formatters before commits
- **lint-staged**: For running formatters only on staged files

## Configuration Files

- `.prettierrc`: Prettier configuration
- `.prettierignore`: Files to be ignored by Prettier
- `lint-staged.config.js`: Configuration for lint-staged
- `.husky/pre-commit`: Git pre-commit hook to run lint-staged

## Available Scripts

- `yarn format`: Format all files using Prettier
- `yarn check-format`: Check if files are properly formatted without making changes
- `./lint.sh`: Custom script to check and fix formatting issues
- `./format-all.sh`: Convenience script to format all files

## Pre-commit Hook

The pre-commit hook automatically runs Prettier on files before each commit. This ensures that all committed code follows the project's formatting rules.

Note: We initially tried to set up ESLint as well, but encountered compatibility issues with ESLint v9.0.0, which requires a new configuration format (eslint.config.js). For now, we're focusing on Prettier for code formatting.

## Manual Formatting

To manually format all files in the project, run:

```bash
yarn format
```

Or use the convenience script:

```bash
./format-all.sh
```

## Adding New Files

When adding new files to the project, they will automatically be formatted according to the project's rules when committed. You can also manually format them using the commands above.
