---
title: "Installation"
type: "docs" 
description: "Detailed installation instructions for different platforms"
date: 2024-01-02
weight: 1
---

# Installation Guide

This guide covers installation steps for different platforms and environments. Choose the method that best suits your needs.

## Using Package Manager (Recommended)

### npm

```bash
npm install @your-org/project
```

### yarn

```bash
yarn add @your-org/project
```

## Manual Installation

If you prefer not to use a package manager, you can manually install the project:

1. Download the latest release from our [releases page](https://github.com/your-org/project/releases)
2. Extract the files to your project directory
3. Include the necessary files in your project:

```html
<link rel="stylesheet" href="path/to/project/styles.css">
<script src="path/to/project/script.js"></script>
```

## Platform-Specific Instructions

### Docker

We provide official Docker images for easy deployment:

```bash
# Pull the latest image
docker pull your-org/project:latest

# Run the container
docker run -p 3000:3000 your-org/project:latest
```

### Build from Source

For developers who want to build from source:

```bash
# Clone the repository
git clone https://github.com/your-org/project.git

# Change into the project directory
cd project

# Install dependencies
npm install

# Build the project
npm run build

# Start the application
npm start
```

## Verifying Installation

To verify your installation:

1. Start the application:
```bash
npm run start
```

2. Open your browser and navigate to `http://localhost:3000`

3. You should see the welcome page

## Common Issues

### Node Version Mismatch

If you see errors related to Node.js version:

```bash
# Check your Node version
node --version

# Use nvm to install the correct version
nvm install 18
nvm use 18
```

### Port Already in Use

If port 3000 is already in use:

1. Either stop the process using that port
2. Or configure a different port:

```bash
PORT=3001 npm start
```

## Next Steps

- Review the [Configuration Guide](/docs/configuration) to customize your installation
- Check out our [Tutorials](/tutorials) to start building
- Join our [Community](/community) for support

## Need Help?

If you encounter any issues during installation:

1. Check our [Troubleshooting Guide](/docs/troubleshooting)
2. Search existing [GitHub Issues](https://github.com/your-org/project/issues)
3. Ask for help in our [Discord community](https://discord.gg/your-project)