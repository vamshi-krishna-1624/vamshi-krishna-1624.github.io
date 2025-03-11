# AWS Single Account Onboarding

## Introduction

This document provides the steps for you to onboard your AWS account or AWS organization to Exaforce Security & Operations Cloud® for real time detection, insights, and analysis of your AWS environment. The onboarding steps are designed to integrate your AWS environment with Exaforce so that Exaforce can monitor your environment, and offer detection, insights, and analysis to you.

This document covers integration of a single AWS account to Exaforce. The information presented in this document guides you through steps to securely integrate your AWS environment with Exaforce.

### Integration Overview

Our integration process involves monitoring of two key components:

1. AWS configuration for monitoring configuration of all services
2. AWS CloudTrail logs exported to S3 bucket

Depending on the requirements for your organization, Exaforce can monitor at an account level or organization level. It is recommended to integrate at organization level to obtain a comprehensive view of your AWS environment.

## Prerequisites

To facilitate the integration process and CloudTrail log access, two types of AWS accounts are mentioned throughout this document, namely **Account 1** and **Account 2**.

1. **Account 1** (Configuration Monitoring Account): This is the AWS account you wish Exaforce to monitor. It requires integration with Exaforce services to monitor configurations and activities. This is a Required account.
2. **Account 2** (CloudTrail Log Account): This account stores your CloudTrail logs, and it is optional. It may be the same as **Account 1** or a separate account, depending on your AWS setup.

Ensure that you have the following accesses:

* AWS IAM (Identity and Access) Admin access to create roles on **Account 1**
* Access to AWS Cloud Formation for automatically creating resources on **Account 1** and/or **Account 2**
* Access to SNS and SQS Services on **Account 2** or **Account 1** (if using for CloudTrail)
* Access to create notifications on S3 bucket **Account 2** (if using for CloudTrail)
* Understanding of how [delegated access to third-party](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html) works with combination of assume role and external id

## Onboarding Steps

To facilitate monitoring, onboarding is divided into the following steps:

1. Deploy AWS Cloud Formation Stack for IAM Policy Role: Creates IAM Roles with assume role permissions and managed session policy
2. Deploy AWS Cloud Formation Stack for SQS and SNS Resources: Creates resources related to SQS and SNS, so that Exaforce can do real time ingestion of the logs
3. Configure Notification on S3 Bucket: Creates notifications when specific events occur on your AWS S3 bucket.

### Deploy AWS Cloud Formation Stack for IAM Role Creation on Account 1

Do the following to create IAM roles with assume role permissions and managed session policy:

1. Login to AWS dedicated account or the delegated administrator account for configuration.
2.  Click Create stack.

    create-stack
3.  Select Template is ready option for the Prepare template section, Amazon S3 URL option for the Template source field, and paste the following URL in the Amazon S3 URL field: [https://s3.amazonaws.com/public.exaforce.com/deployment/aws/cloudformation-account.yaml](https://s3.amazonaws.com/public.exaforce.com/deployment/aws/cloudformation-account.yaml)

    template
4. Click **Next**.
5.  Enter a name in the **Stack name** field (for example, **exaforce-role-stack**), and populate the following fields:

    1. **ExaforceExternalID** - Exaforce External ID
    2. **ExaforceRoleARN** - Exaforce AWS Role ARN

    role-arn
6. Click **Next**.
7.  In the **Configure stack options** section, provide tags for the stack. This is an optional step, and no other fields are required.

    stack-options
8. Click **Next**.
9.  In the **Review and create** page, acknowledge all checkboxes, and click **Submit**.

    submit
10. AWS CloudFormation starts creating resources in the stack. Wait for the status of the stack to change to **CREATE\_COMPLETE**.
11. Click on the stack, go to the **Outputs** tab to copy the **RoleARN** output value, and share it with the Exaforce team.

💡

**Note:** Exaforce cloud formation template handles permissions for decrypting of the KMS key if data is encrypted.

### Deploy AWS Cloud Formation Stack for SQS and SNS Resources Creation on **Account 2**

Do the following in AWS Console to create SQS and SNS resources on your CloudTrail log account:

1. Login to the AWS account where the cloudtrails logs are being sent to the S3 bucket.
2.  Click Create stack.

    create-stack
3.  Select **Template is ready** option for the **Prepare template** section, **Amazon S3 URL** option for the Template source field, and paste the following URL in the **Amazon S3 URL** field:

    [https://s3.amazonaws.com/public.exaforce.com/deployment/aws/cloudformation-account-cloudtrail.yaml](https://s3.amazonaws.com/public.exaforce.com/deployment/aws/cloudformation-account-cloudtrail.yaml)

    template-sqs
4. Click **Next**.
5.  Enter the Stack name (for example **exaforce-cloudtrail-stack**), and enter the ExaforceRoleARN obtained from the output of stack deployed in the Deploy Cloud Formation Stack for IAM Policy Role Creation chapter.

    deploy-stack-account2
6. Click **Next**.
7.  In the **Configure stack options** section, provide tags for the stack. This is an optional step, and no other fields are required.

    stack-options-for-account2
8. Click **Next**.
9. In the **Review and create** page, click **Submit**.
10. AWS CloudFormation starts creating resources in the stack. Wait for the status of the stack to change to **CREATE\_COMPLET**E.
11. Click on the stack, go to the **Outputs** tab to copy the **SqsQueueUrl** Value, and share it with the Exaforce team.

> Note: You can share with the Exaforce representative you are interacting with, either directly or over messages using the Exaforce Slack/Teams channel.

sqs-url-sns-topic

### Configure Notifications on CloudTrail S3 Bucket

Do the following to configure notifications on your S3 bucket where the CloudTrail logs are sent:

1.  Go to the AWS S3 service buckets, select the bucket with Cloudtrail logs, and click on the **Properties** tab.

    s3-cloud-trail-properties
2.  Scroll down to the **Event notifications** section and select **Create event notification**.

    create-event-notification
3.  Under the **Event notification** section, enter a name in the **Event name** (for example, exaforce-cloudtrail) field, and select **All object create events** in the **Event types** section.

    event-name-and-type
4.  Under the **Destination** section, select **SNS topic**, and select **Choose from your SNS topics** option in the **Specify SNS topic** field.

    destination
5. Click **Save changes**.

After configuring notifications, when any object creation events occur on your S3 bucket, notifications are generated and Exaforce provides monitoring for those events.

> Note: If you encounter any issues while onboarding, reach out to Support.

***

## What’s Next?

After completion of integrating your AWS environment with Exaforce, your organizational details are populated in Exaforce Console and you can obtain various details such as which log sources are available, clusters running, and VPCs present in your environment.

exaforce-console-aws-data-source

you can start adding various AWS services to your data source, effectively adding more logs to obtain diversified insights and real-time detection for those services individually and on an organizational level. Instead of adding all at once, the connecting flow is designed in a way that you can choose specific service logs that you are interested in.

## Configure Service

After completion of integration, Exaforce dashboard displays the various services that are part of your AWS organization. The following types of AWS services are supported:

* **Amazon Cloud Trail** - You can select an S3 bucket from which Exaforce can read the Cloud Trail logs.
* **Amazon EKS Clusters** - You can select an EKS cluster for which you want Exaforce monitoring to be enabled. In case of clusters, note that you can select more than one at a time.
* **Amazon VPC** - You can select a VPC for which you want Exaforce monitoring to be enabled.

### Configure Amazon Cloud Trail

Do the following in Exaforce Console:

1. Log into Console, and go to **Platform** > **Data Sources**. Select **Amazon AWS**.
2.  Click **Configure Service** located on the top right corner of the page. Select **Amazon CloudTrail** from the options displayed.

    exaforce-add-cloudtrail

    > Note: You can also achieve the same by selecting a data source and selecting Configure on top or selecting from individual rows.

    select-data-source
3.  On the configure form, you are required to submit the SQS queue URL so that Exaforce can read the logs. Click **Launch Cloud Formation Stack** to create a stack and obtain SQS queue URL. See Create SQS Queue for detailed steps.

    provision-sqs
4. Enter the URL you obtained in AWS Console in the **SqsQueueUrl** field and click **Next**.
5. In the next screen, click **Open S3 Bucket in AWS Console** to enable S3 bucket notifications. See Create S3 Bucket Notifications for detailed steps.
6. Click **Next**, and in the next screen, check the details of your AWS CloudTrail log S3 bucket details, and click **Clos**e.

Exaforce will start pulling logs from your CloudTrail bucket and offer you real-time analysis and detection.

### Configure Amazon EKS

See `EKS Onboarding document` for detailed steps.

### Configure Amazon VPC

Do the following in Exaforce Console:

1. Log into Console, and go to **Platform** > **Data Sources**. Select **Amazon AWS**.
2.  Click **Configure** Service located on the top right corner of the page. Select **Amazon VPC** from the options displayed.

    > Note: You can also achieve the same by selecting a data source and selecting Configure on top or selecting from individual rows.
3. Select an S3 bucket that contains your EKS cluster logs (or DNS query logs).
4. On the configure form, you are required to submit the SQS queue URL so that Exaforce can read the logs. Click **Launch Cloud Formation Stack** to create a stack and obtain SQS queue URL. See Create SQS Queue for detailed steps.
5. Enter the URL you obtained in AWS Console in the **SqsQueueUrl** field and click **Next**.
6. In the next screen, click **Open S3 Bucket in AWS Console** to enable S3 bucket notifications. See Create S3 Bucket Notifications for detailed steps.
7. Click **Next**, and in the next screen, check the details of your VPC flow logs from the bucket you selected, and click **Close**.

Once you configure the flow logs for your VPC, the **Amazon VPC** page shows up a dashboard for your VPC onboarding.

aexaforce-aws-vpc-db

The dashboard is divided into following tabs:

* **VPCs by Flow log** – This shows VPC groups that are available and grouped based on the destination to which logs are sent. You can check if specific flow logs are supported or if they are onboarded. The dashboard also presents columns such as log message format, file format (in which these will be stored in Exafoce), region, account, and so on.
* **VPCs by DNS Query log** – This shows the VPC logs for DNS queries, and the VPCs are grouped based on the log destination.
* **All VPCs** - This shows all VPCs and associated log status for flows and DNS queries. Here you can use the grouping option located on the top right corner of the table.

Within all three tabs, you can search for a specific tab, export the VPC data, or simply view the VPCs as a table using the options located on the top right corner of the table in that tab.
