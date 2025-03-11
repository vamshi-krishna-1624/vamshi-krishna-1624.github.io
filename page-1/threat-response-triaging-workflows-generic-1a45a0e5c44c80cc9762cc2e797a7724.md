# Threat Response Triaging Workflows (Generic) 1a45a0e5c44c80cc9762cc2e797a7724

## Threat Response - Triaging Workflows (Generic)

## Objective

This document provides a quick walkthrough on how you can use Exaforce Detect capability to discover threats, perform automatic or manual triaging (raise incident and triage), and expedite investigation to resolve the case (mark as false-positive or take mitigation steps).

The steps shown in this document cover the data extracted from AWS GuardDuty and Exaforce Generic workflow for automatic triaging and resolving. The generic workflow covers the following:

* Raising of a threat finding and presenting the analysis
* Triggering default automation rules (depending on your notification settings)
* Triggering a workflow that involves Slack messaging channel
* Suggest a response action based on analysis and workflow completion

Using the instructions provided in this document, you can connect your AWS datasource, configure AWS GuardDuty for detection ingestion, detect a threat, and perform automatic triaging to resolve the threat.

<mark style="background-color:blue;">💡Note: The instructions in this document cover an entire AWS organization. However, you can onboard individual account in which GuardDuty is enabled and perform triaging.</mark>

### Prerequisites

The following prerequisites apply:

* A valid Exaforce account.
* A valid AWS account and GuardDuty setup
* A valid Slack account
* Admin Access to AWS services
* Admin Access to Slack
* Default notification settings enabled in Exaforce

💡

Default notification settings are optional and only needed if you want to get notifications delivered to specific receivers such as emails or communication channels.

## Steps

The following image presents the sequence of steps you require to take to perform automatic triaging of a threat using Exaforce:

### Step 1: Onboard AWS Organization

Onboarding includes setting up Exaforce to fetch AWS configuration and activity logs, so that Exaforce enriches the finding with relevant data, in addition to what you get out of GuardDuty.

Perform the following steps to onboard your AWS organization:

* Step 1.1: Create stack to configure Exaforce assume role to connect your org with Exaforce.
  1. Log into your AWS Console, go to CloudFormation, and click **Create Stack.**
  2.  Select **Template is ready** option for the **Prepare template** section, **Amazon S3 URL** option for the **Template source** field, and paste the following URL in the **Amazon S3 URL** field:

      [https://s3.amazonaws.com/public.exaforce.com/deployment/aws/cloudformation-account.yaml](https://www.google.com/url?q=https://s3.amazonaws.com/public.exaforce.com/deployment/aws/cloudformation-account.yaml\&sa=D\&source=editors\&ust=1738830053625295\&usg=AOvVaw15XQodZ62y-L5RZikPAvm8)
  3. Click **Next**.
  4. Enter a stack name in the **Stackname** field and populate the following fields:
     * **ExaforceExternalID** -&#x20;
     * **ExaforceRoleARN** -&#x20;
  5. Click **Next**, acknowledge all checkboxes in the **Review and create** page, and click **Submit**.
  6. Wait for the stack status to change to **CREATE\_COMPLETE.** After the stack is created, click on it, go to **Outputs** tab, and copy RoleARN output value. Share the same with Exaforce team.
* Step 1.2: Create StackSet to apply IAM roles and policies across all member accounts.
  1. Go to **StackSets** service, and click **Create StackSet**.
  2.  Select **Template is ready** option for the **Prepare template** section, **Amazon S3 URL** option for the **Template source** field, and paste the following URL in the **Amazon S3 URL** field:

      [https://s3.amazonaws.com/public.exaforce.com/deployment/aws/cloudformation-account.yaml](https://www.google.com/url?q=https://exaforceio-public.s3.us-east-2.amazonaws.com/deployment/aws/cloudformation-account.yaml\&sa=D\&source=editors\&ust=1738830053630514\&usg=AOvVaw0dXq-WXWImtnaCSdSa_fwh)
  3. Enter a stack name in the **Stackname** field and populate the following fields:
     * **ExaforceExternalID** -&#x20;
     * **ExaforceRoleARN** -&#x20;
  4. Click **Next,** and in the **Configure Stackset** options section, click **Next**.
  5. Click **Submit the stackset** in the review page. Wait for stack creation to complete, and notify Exaforce team.
* Step 1.3: Create SQS and SNS resources so that all your data, including alerts are fetched by Exaforce.
  1. Log into your AWS account to which CloudTrail logs are being sent to S3 bucket.
  2. Go to **CloudFormation** service and click **Create stack**.
  3.  Select **Template is ready** option for the **Prepare template** section, **Amazon S3 URL** option for the **Template source** field, and paste the following URL in the **Amazon S3 URL** field:

      [https://s3.amazonaws.com/public.exaforce.com/deployment/aws/cloudformation-account-cloudtrail.yaml](https://s3.amazonaws.com/public.exaforce.com/deployment/aws/cloudformation-account-cloudtrail.yaml)
  4. Click **Next**. Enter a name for your stack, and enter the value for **ExaforceRoleARN** field. This is the value you obtained in Step 1.2.
  5. Click **Next** in the next couple of screens while keeping the default settings.
  6. Click **Submit** in the Review and create page. Wait for the stack creation to complete, and click on the stack.
  7. Go to Outputs tab, copy the **SqsQueueUrl** value, and share it with Exaforce team.
* Step 1.4: Enable notifications on S3 bucket so that any update is sent to Exaforce.
  1. Switch to S3 services, go to the S3 buckets where the CloudTrail logs are stored, and switch to **Properties** tab.
  2. Scroll down to **Event notifications** section and select **Create event notification**.
  3. Enter a name for your notification, and select **All object create events**.
  4. In the **Destination** section, select **SNS topic**, and select **Choose from your SNS topics** under **the Specify SNS topic** section. Select the topic you created in previous step.
  5. Click **Save changes**.

***

### Step 2: Integrate Slack

Integrating Slack enables Exaforce to trigger the automatic triaging workflow in which Exaforce Detect bot performs a detailed analysis about the threat condition, finds associated principal user, and triggers a communication via Slack. It then also reads the response, and based on the response, generates a recommendation while marking threat with a type.

Do the following to integrate your Slack environment with Exaforce.

* Step 2.1: Log into Exaforce Console with your credentials. Go to **Platform** > **Integrations**.
* Step 2.2 Click **Add New Integration**. Select Slack in the integration creation form.
* Step 2.3: Enter a name for your integration, enter incoming webhook URL for Slack, and click **Test Integration**.
*   Step 2.4: Verify that your channel receives the Slack message and Click **Add Integration**.

    Ensure that your integration is successful and shows up under the Tenant tab.

***

### Step 3: Perform Triaging

When GuardDuty reports its findings, Exaforce enriches the finding with relevant and contextual information by performing agentic analysis. Therefore, you do not need to perform any action, apart from checking the analysis that is presented in the Console, and take an appropriate mitigation action.

Do the following in Exaforce Console to perform automatic triaging:

* Step 3.1: In Exaforce Console, go to **Exabot Detect** > **Threat Findings**.
  1. Click on the Finding Source filter on top of the page, select GuardDuty from the displayed options, and click Apply.
  2. A list of GuardDuty findings enriched with Exaforce analysis is displayed.
* Step 3.2: Open a finding and view the detailed analysis generated by Exaforce Detect.
  1. Hover over a finding name, and click the following option to open the analysis in new tab.
  2.  View the assessment generated by Exabot.

      This example shows that an unusual and suspicious attempt that does not fall in the observed regular or usual behavior of the involved resource or principal . This finding is enriched with Exabot Detect analysis and a summary assessment is returned along with the conclusion and confidence level.

      In addition, the analysis is broken down into principal involved, location from which the action took place, associated session, and resource details, which are not available in the GuardDuty original finding. Also, the bot provides suggested mitigation steps so that you can simply follow the steps to perform mitigation.
  3. Check the investigation performed and presented by the Exabot. Switch to **Investigate** tab. Check the events that led to this finding, presented in a graph as well as a table, listing the anomalous events and normal events that are related.
  4. Scroll down to view the related investigative details bubbled up and presented in different tabs such as principal, actor, actions, related threats, related risks, and detections. This data is presented in terms of critical questions and answers that help expediting the investigation. Questions such as what was the impacted identity, session, location of the actor, etc are presented.
  5. Some sections such as actions also present graph view of actions divided into categories, and this will help in understanding the general trend for the specific user or principal.
*   Step 3.3: Optionally, investigate the principal involved in this finding by checking its identity details page.

    💡

    **Note:** This is optional as the threat finding details page produces all relevant principal details for you, eliminating the need for you to manually check details. Therefore, not all principal identity details are covered in this document as this document primarily intended to present the automatic triaging capabilities.

    1. In the **Investigate** tab, scroll down to **Principal** tab in bottom section, hover your mouse pointer over the principal and click on the :open-exa: icon to view the principal details in a modal window.
    2. The principal details are loaded and by default the **Runtime** tab is displayed.
    3. Check the user summary snapshot, and sessions timeline for this principal in a graph view. You can also see the detailed list of sessions in a table beneath the graph. Check the **Session Outlier** column for inspecting anomalous sessions.
    4. Scroll to bottom section where you can inspect more details such identities, locations, events related to this principal, resources, etc. Among these, the **Threat Findings** tab, which presents the overall threats related to this principal is of interest, as it helps with investigation related to the current threat finding.
* Step 3.4: Use the Exabot chat agent to query specifics about the finding.
  1. Switch to **Exabot Assessment** tab and click **Ask Exabot about this specific finding** button located in the bottom. This invokes the Exabot chat agent.
  2.  Click on any suggested queries or type in a query of your own and click **Send**. This example invokes a workflow to confirm with the principal user if the action is legitimate or not. Type yes and send when asked to confirm.

      A workflow gets triggered in which principal user gets notified to manually confirm the legitimacy of this finding. Depending on the response, the bot updates the analysis and classification of the finding. It also updates the suggested actions.

      💡

      Workflow for user confirmation is only supported when the principal actor is a human user and a slack account exists for the user.
*   Step 3.5: Check the activity log to go through detailed sequence of events in determining the conclusion for this finding.

    Click on the Activity button located on the top right to view the detailed activity log and analysis related to this finding. You can also see the user confirmation workflow in which a Slack notification is triggered and analysis is updated based on the workflow.

    💡

    Tip: Click **Show More** to view the detailed communication between bot and user.
*   Step 3.6: Optionally, perform the mitigation.

    Depending on the classification provided and your investigation, take mitigation actions. Depending on the finding and analysis, the bot may also suggests mitigation steps that you can follow. Look for a section named **Next Steps** in the **Exabot Assessment** tab to refer to the suggested mitigation actions.

    💡

    **Note**: Not all findings need mitigation steps. Therefore, Exabot may not produce mitigation suggestion in every finding.
