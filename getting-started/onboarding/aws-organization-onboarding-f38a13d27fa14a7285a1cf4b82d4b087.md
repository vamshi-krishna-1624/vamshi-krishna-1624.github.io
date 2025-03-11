# AWS Organization Onboarding f38a13d27fa14a7285a1cf4b82d4b087

## AWS Organization Onboarding

## Introduction

This document provides the steps for you to onboard your AWS account or AWS organization to Exaforce Security & Operations Cloud® for real time detection, insights, and analysis of your AWS environment. The onboarding steps are designed to integrate your AWS environment with Exaforce so that Exaforce can monitor your environment, and offer detection, insights, and analysis to you.

The process in this guide is applicable in onboarding a single AWS account, and guides you through steps to securely integrate your AWS environment with Exaforce.

## Integration Overview

Our integration process involves monitoring of two key components:

* AWS Config for all services configuration monitoring
* AWS CloudTrail logs exported to S3 bucket across all your accounts in the AWS organization.

## Prerequisites

To facilitate the integration process and CloudTrail log access, the following types of AWS accounts are mentioned throughout this document.

* Management Account: This is the AWS account you wish Exaforce to monitor. It gets integrated with Exaforce services to monitor configurations and activities.
* Cloudtrail Log Account: This account stores your organization's CloudTrail logs in S3 bucket.
* Member Accounts: These accounts are the member accounts of AWS organization.

The following are required:

* AWS IAM (Identity and Access) Admin access to create roles on Management Account.
* Access to AWS Cloud Formation StackSets for automatically creating resources on accounts belonging to the AWS organization.
* Access to SNS and SQS Services on Cloudtrail Log Account.
* Access to create notifications on S3 bucket Cloudtrail Log Account.
* Understanding of how [delegated access to third-party](https://www.google.com/url?q=https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html\&sa=D\&source=editors\&ust=1738830053622243\&usg=AOvVaw2d3B41z6cjfpU0iCBhq5hC) works with combination of assume role and external id

## Onboarding Steps

To facilitate monitoring, onboarding is divided into the following steps:

* Deploy CloudFormation Stack for IAM Role & Policy: Creates IAM Roles with assume role permissions with managed session policy on Management Account.
* Deploy CloudFormation StackSet for IAM Role & Policy: Deploy CloudFormation StackSet on Management Account to create IAM Roles with assume role permissions with managed session policy on Member Accounts.
* Deploy CloudFormation Stack for SQS and SNS Resources: Creates resources related to SQS and SNS, so that Exaforce can do real time ingestion of the logs on Cloudtrail Log Account.
* Configure Notification on S3 Bucket: Creates notifications when specific events occur on your AWS S3 bucket in Cloudtrail Log Account.

### Deploy AWS CloudFormation Stack for IAM Role & Policy

Do the following in your Management Account in AWS:

1. Login to AWS Management Account for configuration and search for CloudFormation service.
2. Click Create stack - with new resources (standard).
3. Select Template is ready option for the Prepare template section, Amazon S3 URL option for the Template source field, and paste the following URL in the Amazon S3 URL field:

[https://s3.amazonaws.com/public.exaforce.com/deployment/aws/cloudformation-account.yaml](https://www.google.com/url?q=https://s3.amazonaws.com/public.exaforce.com/deployment/aws/cloudformation-account.yaml\&sa=D\&source=editors\&ust=1738830053625295\&usg=AOvVaw15XQodZ62y-L5RZikPAvm8)

1. Click Next.
2. Enter a name in the Stack name field (for example, exaforce-role-stack), and populate the following fields:

* ExaforceExternalID -&#x20;
* ExaforceRoleARN -&#x20;

1. Click Next.
2. In the Configure stack options section, provide tags for the stack. This is an optional step, and no other fields are required.
3. Click Next.
4. In the Review and create page, acknowledge all checkboxes, and click Submit.
5. AWS CloudFormation starts creating resources in the stack. Wait for the status of the stack to change to CREATE\_COMPLETE.
6. Click on the stack, go to the Outputs tab to copy the RoleARN output value, and share it with the Exaforce team.

### Deploy CloudFormation StackSet for IAM Role & Policy

The steps in this section deploy a CloudFormation StackSet in the AWS Management Account. This CloudFormation stackset helps deploy necessary roles and permissions across all Member Accounts under the AWS organization, eliminating the need for manual action for each account.

This also handles the automatic provisioning of roles and policies for any new accounts added to the AWS environment, ensuring a consistent security monitoring across the organization.

1. Login to AWS Management Account. Search for StackSets service.
2. Click Create StackSet.
3. Select Template is ready option for the Prepare template section, Amazon S3 URL option for the Template source field, and paste the following URL in the Amazon S3 URL field:[https://exaforceio-public.s3.us-east-2.amazonaws.com/deployment/aws/cloudformation-account.yaml](https://www.google.com/url?q=https://exaforceio-public.s3.us-east-2.amazonaws.com/deployment/aws/cloudformation-account.yaml\&sa=D\&source=editors\&ust=1738830053630514\&usg=AOvVaw0dXq-WXWImtnaCSdSa_fwh)
4. Enter a name in the Stack name field (for example, exaforce-role-stack), and populate the following fields:
5. ExaforceExternalID -&#x20;
6. ExaforceRoleARN -&#x20;
7. Click Next.
8. In the Configure stack options section, provide tags for the stack. This is an optional step, and no other fields are required.
9. Click Next.
10. Specify a single region where the stackset should be executed (for example, same as Identity Center region or the primary region). Keep default settings unless you want to exclude some of the organizational units (not recommended).
11. Review the settings and click Submit the stackset.
12. Wait for the status of all stacks to change to CREATE\_COMPLETE, and send confirmation to the Exaforce team.

💡

**Note:** Exaforce cloud formation template handles permissions for decrypting of the KMS key if data is encrypted.

### Deploy AWS Cloud Formation Stack for SQS and SNS Resource Creation

Do the following in the AWS CloudTrail Log Account:

1. Login to the AWS CloudTrail Log Account where the cloudtrails logs are being sent to the S3 bucket - go to CloudFormation as per above steps.
2. Click Create stack.
3. Select Template is ready option for the Prepare template section, Amazon S3 URL option for the Template source field, and paste the following URL in the Amazon S3 URL field:[https://s3.amazonaws.com/public.exaforce.com/deployment/aws/cloudformation-account-cloudtrail.yaml](https://www.google.com/url?q=https://s3.amazonaws.com/public.exaforce.com/deployment/aws/cloudformation-account-cloudtrail.yaml\&sa=D\&source=editors\&ust=1738830053636026\&usg=AOvVaw1HsSNOO6dlZZql2IFTdBnZ)
4. Click Next.
5. Specify a name for the stack (for example, exaforce-cloudtrail-stack), and enter ExaforceRoleARN from the output of the stack deployed in the [Deploy Cloud Formation Stack for IAM Policy Role Creation](about:blank#h.3dy6vkm) section.
6. Click Next.
7. In the Configure stack options section, provide tags for the stack. This is an optional step, and no other fields are required.
8. Click Next.
9. In Review and create page, click Submit.
10. AWS CloudFormation starts creating resources in the stack. Wait for the status of the stack to change to CREATE\_COMPLETE.
11. Click on the stack, go to the Outputs tab to copy SqsQueueUrl Value and share it with the Exaforce team.

### Configure Notifications on Cloudtrail S3 Bucket

Do the following in your CloudTrail Log Account:

1. Login to the AWS CloudTrail Log Account. Go to the AWS S3 service buckets, select the bucket with Cloudtrail logs, and click on the Properties tab.
2. Scroll down to the Event notifications section and select Create event notification.
3. Under Event Notification, fill Event name (for example, exaforce-cloudtrail), and select All object create events.
4. Under the Destination section, select SNS topic, and select Choose from your SNS topics under the Specify SNS topic section.
5. Click Save changes.

After configuring notifications, when any object creation events occur on your S3 bucket, notifications are generated and Exaforce provides monitoring for those events.

Note: If you encounter any issues while onboarding, reach out to [Support](mailto:support@exaforce.com).

## What’s Next?

After completion of integrating your AWS environment with Exaforce, your organizational details are populated in Exaforce Console and you can obtain various details such as which log sources are available, clusters running, and VPCs present in your environment.

you can start adding various AWS services to your data source, effectively adding more logs to obtain diversified insights and real-time detection for those services individually and on an organizational level. Instead of adding all at once, the connecting flow is designed in a way that you can choose specific service logs that you are interested in.

### Configure Service

After completion of integration, Exaforce dashboard displays the various services that are part of your AWS organization. The following types of AWS services are supported:

* Amazon Cloud Trail - You can select an S3 bucket from which Exaforce can read the Cloud Trail logs.
* Amazon EKS Clusters - You can select an EKS cluster for which you want Exaforce monitoring to be enabled. In case of clusters, note that you can select more than one at a time.
* Amazon VPC - You can select a VPC for which you want Exaforce monitoring to be enabled.

#### Configure Amazon Cloud Trail

Do the following in Exaforce Console:

1. Log into Console, and go to Platform > Data Sources. Select Amazon AWS.
2. Click Configure Service located on the top right corner of the page. Select Amazon CloudTrail from the options displayed.

Note: You can also achieve the same by selecting a data source and selecting Configure on top or selecting from individual rows.

1. On the configure form, you are required to submit the SQS queue URL so that Exaforce can read the logs. Click Launch Cloud Formation Stack to create a stack and obtain SQS queue URL. See [Create SQS Queue](about:blank#h.4d34og8) for detailed steps.
2. Enter the URL you obtained in AWS Console in the SqsQueueUrl field and click Next.
3. In the next screen, click Open S3 Bucket in AWS Console to enable S3 bucket notifications. See [Create S3 Bucket Notifications](about:blank#h.2s8eyo1) for detailed steps.
4. Click Next, and in the next screen, check the details of your AWS CloudTrail log S3 bucket details, and click Close.

Exaforce will start pulling logs from your CloudTrail bucket and offer you real-time analysis and detection.

#### Configure Amazon EKS

See [EKS Onboarding](https://www.google.com/url?q=https://docs.google.com/document/u/0/d/1m4zB39EKrVTY9uoErE9m5zJ9Q3hiC75IDuMrOz4d8Nk/edit\&sa=D\&source=editors\&ust=1738830053649295\&usg=AOvVaw2G6_d4kyTtmT0qKQCu3CS5) document for detailed steps.

#### Configure Amazon VPC

Do the following in Exaforce Console:

1. Log into Console, and go to Platform > Data Sources. Select Amazon AWS.
2. Click Configure Service located on the top right corner of the page. Select Amazon VPC from the options displayed.

Note: You can also achieve the same by selecting a data source and selecting Configure on top or selecting from individual rows.

1. Select an S3 bucket that contains your EKS cluster logs (or DNS query logs).
2. On the configure form, you are required to submit the SQS queue URL so that Exaforce can read the logs. Click Launch Cloud Formation Stack to create a stack and obtain SQS queue URL. See [Create SQS Queue](about:blank#h.4d34og8) for detailed steps.

Note: Ensure that you select the AWS account which was used to create the bucket for launching the stack.

1. Enter the URL you obtained in AWS Console in the SqsQueueUrl field and click Next.
2. In the next screen, click Open S3 Bucket in AWS Console to enable S3 bucket notifications. See [Create S3 Bucket Notifications](about:blank#h.2s8eyo1) for detailed steps.

Note: Ensure that you select the AWS account which was used to create the bucket for configuring the notifications.

1. Click Next, and in the next screen, check the details of your VPC flow logs from the bucket you selected, and click Close.

Once you configure the flow logs for your VPC, the Amazon VPC page shows up a dashboard for your VPC onboarding.

The dashboard is divided into following tabs:

* VPCs by Flow log – This shows VPC groups that are available and grouped based on the destination to which logs are sent. You can check if specific flow logs are supported or if they are onboarded. The dashboard also presents columns such as log message format, file format (in which these will be stored in Exafoce), region, account, and so on.
* VPCs by DNS Query log – This shows the VPC logs for DNS queries, and the VPCs are grouped based on the log destination.
* All VPCs - This shows all VPCs and associated log status for flows and DNS queries. Here you can use the grouping option located on the top right corner of the table.

Within all three tabs, you can search for a specific tab, export the VPC data, or simply view the VPCs as a table using the options located on the top right corner of the table in that tab.
