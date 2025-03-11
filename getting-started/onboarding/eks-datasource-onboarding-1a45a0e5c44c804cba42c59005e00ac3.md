# EKS Datasource Onboarding 1a45a0e5c44c804cba42c59005e00ac3

## EKS Datasource Onboarding

## Overview

This document provides comprehensive instructions to onboard your Amazon Elastic Kubernetes Service (EKS) clusters with Exaforce Security & Operations Cloud®. Onboarding your EKS clusters requires integrating the EKS environment with Exaforce. The document also covers the key concepts, prerequisites, and integration process.

## Concepts

The EKS integration with Exaforce allows comprehensive monitoring and analysis of your Kubernetes cluster activities. It combines log data from EKS along with resource information to provide insights, investigations, detection, and response capabilities so that you can obtain real-time and historic insights on your EKS clusters..

### Accessing EKS Cluster Logs

Exaforce requires you to enable EKS cluster control plane logging. Once enabled, EKS is set up to send the logs to a CloudWatch log group. After that, you are required to enable a subscription on the CloudWatch log group so that Exaforce can start streaming the logs to the Exaforce account.

### Accessing EKS Resource Information

Exaforce requires the deployment of an agent (Exabot) on your EKS cluster. This agent operates with minimal privileges, running in a read-only, non-root mode with strict access limitations. Its primary function is to monitor the Kubernetes API server across all namespaces, collecting configuration objects, and other essential information to build a comprehensive view of deployments and other cluster resources.

Exabot uses EKS external OIDC provider to assume the scan role and send messages to SQS.

To ensure continuous operation, the agent sends regular heartbeats, confirming its active status and ongoing data transmission from the cluster.

## Prerequisites

Before beginning the onboarding, ensure you have the following:

#### AWS IAM Permissions

* EKS Cluster permissions: Ability to enable logging on EKS clusters
* CloudWatch log groups: Permissions to set up subscription filters on CloudWatch log groups

#### Kubernetes Cluster Access

Permissions to deploy the required resources for the agent

#### Other Tools

* AWS CLI installed and configured with appropriate credentials
* Kubectl installed and configured to interact with your EKS cluster
* Helm installed for deploying the Exaforce agent

## Onboarding Steps

Do the following in Exaforce Console:

1. Navigate to Amazon EKS cluster onboarding page.
2. In Left Navigation, select **Integrations** > **Data sources**.
3. Select **Amazon AWS**
4. Select **EKS** under **Log Sources**.
5. Search for a specific cluster you want to onboard, and click **configure**.
6. Select the EKS cluster you want to connect, and click **Next**.
7. If logging is not enabled, UI will prompt you to select the clusters where logging must be enabled.
8. Click **Next**.
9. In the **Update Configuration** Step, use the AWS CLI or the terraform script to enable logging. Once the script is executed, use the **Check Status** button to see the updated status.
10. Click **Next**.
11. Apply a Subscription Filter, download the CF Template yaml file. Or download the CLI file of your choice to run the script to apply the subscription filter.
12. Click **Next**.
13. Use the helm instruction to add the repo and update it. This is the repo used to install the exaforce-k8s agent.
14. Click **Next**.
15. Install K8s Agent using the command given in the CLI Command column.
16. Click **Next**.
17. Review the cluster configuration and submit it.
