# Okta Organization Onboarding 1a45a0e5c44c806d9e47e65006b7a805

## Okta Organization Onboarding

## Introduction

This document provides the steps for you to onboard your Okta audit event logs to Exaforce Security & Operations Cloud® for real time detection, insights, and analysis of your AWS environment. The onboarding steps are designed to integrate your Okta environment with Exaforce so that Exaforce can monitor your environment, and offer detection, insights, and analysis to you.

The information presented in this document guides you through steps to securely install Exaforce service application and connect with your Exaforce tenant Console.

## Integration Overview

The Exaforce application is published as [API service integrations.](https://www.google.com/url?q=https://www.okta.com/integrations/exaforce/\&sa=D\&source=editors\&ust=1739958105005046\&usg=AOvVaw208jy8XiJAfo-TYW6RckDJ) The application enables Exaforce to access the core Okta API using OAuth 2.0. Exaforce uses this integration to gather system audit event logs and apps, sessions, and policies configuration from Okta.

## Prerequisites

Onboarding Okta to Exaforce requires involving two personas. It is recommended to get both personas coordinated (for example, meet over a call) to perform the onboarding in a timely and efficient manner. The following list describes the required personas:

1. **Okta Admin**: User with administrator access to Okta Admin Console and permissions to install service application integrations.
2. **Exaforce Admin**: User with administrator access to Exaforce Console to configure data integrations.

## Onboarding Steps

To facilitate monitoring, onboarding is divided into the following steps:

* Install Exaforce Service App on Okta: Authorizes and installs Exaforce service app on Okta. This step is performed by the Okta administrator.
* Connect Okta Data Source from Exaforce Console: Starts Okta data source integration. This step is performed by the Exaforce administrator.

### Install Exaforce service app on Okta

Do the following in Okta:

1. Go to [Exaforce App Integration page](https://www.google.com/url?q=https://www.okta.com/integrations/exaforce/\&sa=D\&source=editors\&ust=1739958105006648\&usg=AOvVaw2kLJdUEax1r6SrNHEXqxlx) in Okta.
2. Click **+Add Integration**.
3. Select your Okta work organization to sign-in.
4. Click **Install & Authorize**.
5. Copy the Client Secret and click **Done**.
6. Copy the values of Okta Domain and Client ID fields shown on the screen.
7. Share the secret, Okta domain, and client ID with the Exaforce administrator.

### Connect Okta Data Source from Exaforce Console

Do the following in the Exaforce Console:

1. In the left navigation, select **Integrations** > **Data Sources**
2. Click the **Connect Data Source** button on the top right part of the screen.
3. Add the Okta integration details as per the following guidelines:
   1. Enter your Okta organization name.
   2. Enter your Okta organization URL.
   3. Enter the client ID received from Okta administrator.
   4. Enter the client secret received from Okta administrator.
4. Click **Next**.
5. Review and synchronize the data.
