# GitHub Organization Onboarding 1a45a0e5c44c80a48aa7d0f38eaf16d0

## GitHub Organization Onboarding

## Introduction

This document is designed to streamline the process for our customers to onboard their GitHub organization to Exaforce Security & Operations Cloud for real-time detection, insights, and analysis. The steps outlined below will guide you through the process of installing the Exaforce GitHub app and connecting your GitHub organization with your Exaforce tenant console.

This document provides the steps for you to onboard your GitHub organization to Exaforce Security & Operations Cloud® for real time detection, insights, and analysis of your environment. The onboarding steps are designed to integrate your GitHub environment with Exaforce so that Exaforce can monitor your environment, and offer detection, insights, and analysis to you.

The information presented in this document guides you through process of installing the Exaforce GitHub app and connecting your GitHub organization with your Exaforce tenant Console.

## Integration Overview

Exaforce integrates with GitHub using a GitHub app that provides secure access to your organization's repositories and audit logs. The integration enables Exaforce to:

* Monitor repository configurations and settings
* Track organization-wide security policies
* Collect audit logs for security analysis
* Monitor repository activities and changes

## Prerequisites

The following are required for GitHub integration:

1. **GitHub Admin**: User with administrator access to the GitHub organization and permissions to install GitHub apps.
2. **Exaforce Admin**: User with administrator access to Exaforce Console to configure data integrations.

## Onboarding Steps

To facilitate monitoring, onboarding is divided into two main steps:

* Install Exaforce GitHub App: Authorizes and installs Exaforce app on your GitHub organization
* Connect GitHub Data Source from Exaforce Console: Configure GitHub data source integration in Exaforce

### Install Exaforce GitHub App

Do the following in Exaforce Console:

1. Go to **Platform** > **Datasources** page in Exaforce Console.
2. Click **Connect Data Source** in the top right corner.
3. From the available options, select **GitHub**.
4. Enter your GitHub organization name and click **Next**.
5.  Review the installation steps and click **Install Exaforce Application on Github**.

    💡

    **Note**: You will be redirected to GitHub to configure the Exaforce app
6. Select your organization in GitHub and click **Install**.
7. Review that you have the required permissions at various following levels:
   * Repository permissions
   * Organization permissions
   * User permissions
8. Click **Install**.
9. Confirm access by signing in to your GitHub account when prompted, and wait for the success confirmation.

### Connect GitHub Data Source from Exaforce Console

1. After GitHub app installation, return to the Exaforce Console to complete the connection workflow.
2. Review the connection details and click **Finish** to complete the integration.

Once completed, Exaforce starts collecting data from your GitHub organization. You can monitor the integration status from the Datasources page in your Exaforce console.

💡

**Note**: The time taken for initial data synchronization depends on the size of your GitHub organization and number of repositories.
