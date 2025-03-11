# GCP Onboarding

## Introduction

This document provides the steps for you to onboard your GCP account or AWS organization to Exaforce Security & Operations Cloud® for real time detection, insights, and analysis of your GCP environment. The onboarding steps are designed to integrate your GCP environment with Exaforce so that Exaforce can monitor your environment, and offer detection, insights, and analysis to you.

This document covers integration of a GCP organization or specific GCP project to Exaforce. The information presented in this document guides you through steps to securely integrate your GCP environment with Exaforce.

### Integration Overview

Our integration process involves the following:

1. Exaforce Provisioning - Exaforce support team enables provisioning from platform side so that customers can start onboarding.
2. Customer Configuration - Customers performs enablement settings on their Google environment side to integrate with Exaforce.

Depending on the requirements for your organization, Exaforce can monitor at an account level or organization level. It is recommended to integrate at organization level to obtain a comprehensive view of your GCP environment.

## Prerequisites

To facilitate the integration process and [Google Cloud Audit Logs](https://cloud.google.com/logging/docs/audit/understanding-audit-logs) access, the following are required:

* Valid Exaforce Subscription
* Admin privileges on Google Cloud Platform for organization

## Onboarding Steps

To facilitate monitoring, onboarding is divided into the following steps:

* Create an initial service account tenant - This is done by Exaforce and includes creating a SaaS tenant for customer, creating a GCP project for tenant, setting up IAM service account, and configuring workload identity federation with AWS.

The following are to be performed by customer:

* Connect GCP environment to Exaforce GCP environment - This includes Google workspace configuration, granting access to Exaforce principle service account, and creating rule to allow Exaforce organization.
* Add GCP datasource in Exaforce Console.
* Configure adding of GCP Audit Logs in GCP.
* Add the log source in Exaforce Console

### Exaforce Provisioning (SRE Personnal Only)

Do the following from Exaforce platform side:

1. Create tenant in Exaforce SaaS, by launching the bootstrap terraform module.
2. Create a GCP project in Exaforce GCP organization and name it in the **g-** format.
3. In the GCP project, setup an IAM service account for the customer (`exa-default@g-demo-pcufdz4w.iam.gserviceaccount.com`) with the following roles:
   * Browser
   * Cloud Asset Viewer
   * Pub/Sub Subscriber
   * Viewer
   * Workload Identity User
4. Start creating the Workload Identity Federation with AWS. In GCP, go to **IAM & Admin** > **Workload Identity Pools** and click **ADD PROVIDER**
5. Add a name and enter Exaforce AWS account ID and save the provider settings.
6. Share the service account Email with the customer, as it is part of Console onboarding.

### Connect GCP Environment to Exaforce GCP Environment (Customer Configuration)

Do the following in GCP:

1.  Configure Google workspaces to share data with Google cloud to log the login events. Go to **Admin** > **Account Settings** and select **Enabled** in **Sharing Options** section.

    **Note:** The OAuth and SAML also are handled via Google workspaces, which manages the authentication for the domain. Refer to [this article](https://support.google.com/a/answer/9320190?sjid=4813920044865796923-EU) for more information.
2. Grant Access to principal service account from Exaforce Organization with same roles created in previous chapter.
3. Check if the **iam.allowedPolicyMemberDomains** is active (green), then edit the **Domain restricted sharing** policy (using the meatballs menu next to the policy).
4. Select **Override parent’s policy** in the **Policy source** section.
5. In the **Rules** section, do the following for the **New Rule** 1. select **Custom** for **Policy values** field 2. select **Allow** for the **Policy type** field 3. Enter a custom value for principalSet with the organization value as 435945161038. This will allow Exaforce organization 435945161038.

```
**Note:** This is required eachtime for onboarding an Organization and Single project.
```

```
![image.png](GCP%20Onboarding%201895a0e5c44c80ddb545e999bfd5d8e3/image%206.png)
```

6\. Confirm that the override rule is applied.

```
![image.png](GCP%20Onboarding%201895a0e5c44c80ddb545e999bfd5d8e3/image%207.png)
```

### Add GCP Data Source to Exaforce

After provisioning from Exaforce side and connecting Exaforce principal account with customer GCP account, it is required to add GCP data source to Exaforce, in Exaforce Console.

Do the following:

1. Log into Exaforce Console, and go to **Platform** > **Data Sources**. Select **Connect Data Source** located on top-right corner of the page.
2. Enter a name, select **Organization** for the **Target Entity Type** field. Enter the GCP organization ID in the **Organization ID** field and select **Next**. This automatically onboards all discovered projects in the organization represented by the organization ID.

### Configure Adding Audit Logs

Do the following in GCP Console:

1. Go to **IAM Admin** and select **Audit Logs**. Enable **Admin read** at organizational level.
2. In the default audit logs access configuration, select **Admin read** and click **SAVE**.
3. Go to **Pub/Sub** and select **Topics.** Select **CREATE TOPIC** in specific project where the service account is to be granted.
4. Go to **Subscriptions** and create **Pub/Sub Subscription** inside of topic.
5. Go to **Logging** service, select **Observability Scopes.** Create **Log Router Sink** in organization level with destination to subscription added in previous step, and filter on `cloudaudit.googleapis.com` . The following are the example values:
   * NAME: exaforce-log-sink-0a5a2809
   * DESTINATION: pubsub.googleapis.com/projects/exaforce-demo/topics/exaforce-logs-topic-0a5a2809
   * FILTER: logName:"cloudaudit.googleapis.com"

### Add GCP Log Source in Exaforce Console

1. Log into Exaforce Console, and go to **Platform** > **Data Sources**. Select **Google Cloud Platform** and click **Configure Log Sources** located on top-right corner of the page.
2.  Add GCP Project ID and PubSub Topic Subscription ID. Click **Next.**

    ## References

    * [https://medium.com/google-cloud/centralised-audit-logs-in-google-cloud-the-new-way-log-analytics-4b8a1fb195e](https://medium.com/google-cloud/centralised-audit-logs-in-google-cloud-the-new-way-log-analytics-4b8a1fb195e)
