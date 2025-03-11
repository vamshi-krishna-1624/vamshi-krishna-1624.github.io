# Azure Entra ID Onboarding 1ac5a0e5c44c80efb285ffbfbaba9f58

## Azure Entra ID Onboarding

## Introduction

This document provides the steps for you to onboard your Azure Entra ID (formerly Azure Active Directory) to Exaforce Security & Operations Cloud® for real-time detection, insights, and analysis of your Azure environment. The onboarding steps are designed to integrate your Azure environment with Exaforce so that Exaforce can monitor your environment, and offer detection, insights, and analysis to you.

The information presented in this document guides you through steps of installing and configuring the necessary components to securely integrate your Azure Entra ID environment with Exaforce.

## Integration Overview

Integrating or onboarding your Azure Entra ID environment requires Exaforce to extract your Entra ID configuration and then add Entra ID log sources. This helps Exaforce analyze your configuration as well as runtime environment to perform security monitoring and present you real-time insights and threat detections. The following image represents a high-level view of how the integration is carried out:

## Prerequisites

The following are required:

### Exaforce App ID and Azure Cloud Shell

1. Your unique `EXAFORCE_APP_ID` (provided separately by Exaforce team)
2. Azure CLI access through the Cloud Shell of Azure Portal

### Azure Account Permissions

To execute this installation script, you need an Azure account with the following permissions:

#### Azure Active Directory Permissions

* Global Administrator role or sufficient permissions to:
* Create and manage Service Principals
* Grant admin consent for API permissions
* Configure diagnostic settings for Azure AD logs

#### Azure Subscription Permissions

* Subscription Administrator or permissions to:
* Create and manage Resource Groups
* Create and manage Storage Accounts
* Create and manage Event Hub Namespaces
* Create and manage Event Hubs

💡

**Note**: In case you do not have listed permissions, check with your Azure administrator to execute the script.

## Onboarding Steps

Do the following for integrating your Azure Entra ID to Exaforce:

### Access and Configure Azure Cloud Shell

Do the following in Azure portal.

*   Step 1: Log in to[Azure Portal](https://www.google.com/url?q=https://portal.azure.com\&sa=D\&source=editors\&ust=1741085241459223\&usg=AOvVaw1sepdSUr8J3PW9SskoYewp) and launch Cloud Shell.

    Click the Cloud Shell icon next to the search bar of the Azure portal.
*   Step 2: Select Bash to launch shell in bash.

    When prompted, select **Bash** as your shell environment.
*   Step 3: If this is your first time using Cloud Shell, you are required to configure storage.

    Do the following in the `You have no storage mounted` window:

    * Select your preferred subscription from the dropdown menu.
    * Select **Mount storage account** and click **Apply**.

    Choose one of the following storage options:

    * **Option 1**: Use Existing Storage Account (Recommended)
      * Select Select existing storage account.
        * Choose your storage account from the list.
        * Either select an existing file share or create a new one.
      * Click **Ok** to confirm.
    *   **Option 2**: Create New Storage Account - in this case, Cloud Shell automatically creates following:

        * A resource group (for example, "cloud-shell-storage-eastus")
        * A storage account
        * A file share

        Click **Next** and then, click **Create**.

    💡

    **Note**: The deployment may fail due to the restriction on the naming of the storage account, it has to be only lower case letters and number with length between (3-24)

The storage account is used to persist your Cloud Shell home directory. This is a one-time setup, and automatically gets mounted for future sessions.

### Perform Onboarding

Onboarding requires you to perform following two actions:

* Configure Exaforce service principal - this obtains your Entra ID configuration
* Configure log streaming using Azure event hub - this fetches your Entra ID log sources

#### Configure Exaforce Service Principal

Do the following in the Cloud Shell to perform onboarding:

*   **Step 1:** Download the Exaforce service principal creation script.

    Run the following command to download the script in Cloud Shell and grant permissions:

    `curl -O https://exaforceio-public.s3.us-east-2.amazonaws.com/deployment/azure/exaforce-azure-grant-entraid-access-to-app.sh && chmod +x exaforce-azure-grant-entraid-access-to-app.sh`
*   **Step 2:** Optionally, customize the script parameters.

    Run the following command to see the parameters:

    `./exaforce-azure-grant-entraid-access-to-app.sh --help`

    💡

    **Note**: Parameters set using CLI args take precedence over environment variables.

    | **Parameter**                                                 | **Description**                     |
    | ------------------------------------------------------------- | ----------------------------------- |
    | `--exaforce-app-id`                                           | UUID of the Exaforce App. Required. |
    | Can also be set using `EXAFORCE_APP_ID` environment variable. |                                     |
*   **Step 3:** Execute the script.

    Enter the following command:

    `./exaforce-azure-grant-entraid-access-to-app.sh –exaforce-app-id <you-app-id>`

    💡

    **Note**: The Exaforce App ID is provided by the Exaforce team. Replace `<your-app-id>` with the actual `EXAFORCE_APP_ID` provided. The default Azure location is `East US`, and you can set your preferred Azure location.

💡

Note 2: The script will take approximately 10-15 minutes to complete. In case you encounter the `not registered to use microsoft.insights` error, check that you have necessary permissions to execute the script.

#### Configure Log Streaming Using Event Hub

Do the following in Azure Cloud Shell:

*   **Step 1:** Download the log streaming script.

    Run the following command to download and set permissions for the Exaforce log streaming script:

    `curl -O https://exaforceio-public.s3.us-east-2.amazonaws.com/deployment/azure/exaforce-azure-enable-entraid-logging.sh && chmod +x exaforce-azure-enable-entraid-logging.sh`
*   **Step 2:** Optionally, customize the script parameters as per your requirements.

    Run the following commands to see customization options:

    `./exaforce-azure-enable-entraid-logging.sh --help`

    💡

    **Note**: Parameters set using CLI args take precedence over environment variables.

    | **Option**                                                                                                   | **Description**                                                                                           |
    | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
    | `EXAFORCE_PREFIX`                                                                                            | Can only be set as an environment variable. Prefix added to all resources’ names. Defaults to `exaforce`. |
    | `--azure-location`                                                                                           | Azure Location to be used. Defaults to `East US`.                                                         |
    | Can also be set using `AZURE_LOCATION` environment variable.                                                 |                                                                                                           |
    | `--enabled-logtypes`                                                                                         | Space separated list of enabled log types, in single quotes.                                              |
    | By default none of the log types are enabled. This should not be used together with `--enable-all-logtypes`. |                                                                                                           |

    Example: `--enabled-logtypes 'AuditLogs SignInLogs'`.

    This can also be set using `LOG_TYPES` environment variable.                                         The available log types are: • AuditLogs • SignInLogs • NonInteractiveUserSignInLogs • ServicePrincipalSignInLogs • ManagedIdentitySignInLogs • ProvisioningLogs • ADFSSignInLogs • RiskyUsers • UserRiskEvents • NetworkAccessTrafficLogs • NetworkAccessAlerts • RiskyServicePrincipals • ServicePrincipalRiskEvents • EnrichedOffice365AuditLogs • MicrosoftGraphActivityLogs • RemoteNetworkHealthLogs | | `--enable-all-logtypes` | Enables all log types. Should not be used together with `--enabled-logtypes`. | | `--resource-group-name` | Overwrites the resource group name. No prefix or suffix will be added to this name. | | `--event-hub-namespace-name` | Overwrites the event hub namespace name. No prefix or suffix will be added to this name. | | `--event-hub-name` | Overwrites the event hub name. No prefix or suffix will be added to this name. | | `--diagnostic-settings-name` | Overwrites the diagnostic settings name. No prefix or suffix will be added to this name. |
*   **Step 3**: Execute the script with chosen options. The recommended ones are shown below.

    Run the following command:

    `./exaforce-azure-enable-entraid-logging.sh --enable-all-logtypes`

The script will return the Event Hub Connection String and Event Hub Name, which can be used to onboard logs in Exaforce Console. The following is a sample output for a successful completion of script:

```bash
Event Hub Connection String: Endpoint=sb://exaforce-eh-ns-asdfgh.servicebus.windows.net/;SharedAccessKeyName=logsReader;SharedAccessKey=xxxxxxxxxxxxxxxxxxxxxx

Event Hub Name: exaforce-eh-asdfgh

Script execution completed successfully.
```

### Verify Installation

After successful execution, do the following to verify that the onboarding is carried out successfully:

*   **Step 1:** Verify that proper permissions were given to the application.

    Navigate in the Azure Portal to **Enterprise applications** and search for the app whose name starts with `exaforce-`. Open the application and navigate to **Security-Permissions**. See if 18 permissions are granted.
*   **Step 2:** Verify that the Event Hub Namespace and Event Hub are created.

    Navigate to **Event Hubs** and select the `exaforce-eh-ns-<random-suffix>` Event Hub Namespace. See if the Event Hub `exaforce-eh-<random-suffix>` was created in this namespace.

    This is the last item that the script creates, indicating a successful script execution.

💡

**Notes:** It takes up to 24 hours for dashboards in Exaforce Console to start displaying information about your Entra ID environment.

***

## Troubleshooting

Refer to the following information to perform troubleshooting:

### Common Issues

*   **Permission Errors**

    To resolve permission related issues, do the following:

    * Ensure you have all required permissions listed in the `Prerequisites` section.
    * Contact your Azure administrator if required.
*   **Resource Name Conflicts**

    In case you use a resource name that is already in use, conflicts occur, and in such cases, do the following:

    * If resources with similar names exist, try changing the `PREFIX` variable
    * Backup and delete the `.random_suffix` file if you need to regenerate random suffixes
*   **Script Timeout**

    Cloud Shell sessions may timeout after 20 minutes and in that case, re-connect and run the script again. The script will attempt to continue from where the session timeout occurred.

### Error Messages

Refer to the following table for Error Messages and associated resolution steps to perform:

| Error Message                            | Possible Cause               | Solution                             |
| ---------------------------------------- | ---------------------------- | ------------------------------------ |
| Failed to create resource group          | Insufficient permissions     | Check Azure subscription permissions |
| Permission being assigned already exists | Permissions already granted. | Safe to ignore, script will continue |

### Get Help

If you encounter issues not covered in this guide, do the following to get support:

1. Check the script output for specific error messages.
2. Capture the full error message and script output.
3. Contact [Exaforce support](mailto:support@exaforce.com) with the following information:
   * Error messages
   * Azure subscription ID
   * Resource group name
   * Time of execution

***

## What’s Next?

### Add a Log Source

After successfully onboarding the Entra ID, you can now connect multiple log sources to Exaforce, enabling Exaforce to analyze the logs, and provide insights, analytics, and threat detections.

Do the following in Exaforce Console to add Azure log sources.

1. Log into Exaforce Console, and go to Platform > Data Sources in the left menu.
2. Select Azure from the displayed data sources.
3. Click **Configure Log Source**.
4. Enter a name for your log source, select an option for the Log type field, and specify a connection string for the Event Hub Connection String and the Event Hub Name.
5. Click **Next**.
6. In the review screen, you will see the summary of the added log source.
7. Click close.
