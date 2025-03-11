# Exabot Detect

This document provides details on Exabot Detect that can identify and present threats while also presenting reliable and actionable outcomes to quickly mitigate threats for an organization’s various cloud environments, identity providers, repositories, K8s clusters, and so on.

## Overview

A **threat** is an active security incident or problem such as an unusual/suspicious access attempt to a sensitive resource that requires investigation and mitigation. Threats are identified based on the suspicious runtime events which are triggered by malicious actors. Typical examples of threats include, but not limited to the following:

* Unauthorized Access Attempts
* Suspicious Resource Discovery Attempts
* Anomalous Data Theft Attempts
* Credential Access Attempts
* Log Disabling Attempts
* Unauthorized Privileged Account Usage

The **Exabot Detect** finds threats using anomaly detection and risk detection from the logs and it can also analyze data from services such as AWS GuardDuty (by integrating it with Exaforce). The **Detect** bot then presents the threats in terms of reliable and actionable data, complimented with rich visualizations and options to mitigate.

### Threat Findings

Threats, on a high-level have 2 properties namely **threat severity** and **threat type**. The threat severity is Exaforce’s classification of threats accroding to the severity of the threat (extent or degree of impact of damage) with severity levels being info, low, medium, high, and critical. The threat type is mainly the type of incident occured and can has many values. For example, credential access, forbidden resource access attempt, etc.

**Note:** The threat findings of severity **Info** indicate that these findings are for awareness purpose, but good to monitor these. These generally do not pose any risk or security problem.

Exaforce presents you a snapshot report of number of threats found, and tells you how many of those are false-positive and how many require investigation/action, reducing manual efforts to analyse the same. The platform provides rich visualizations such as threat trends, MTTR trends, threat distribution (chart) by data sources, by assignees, and by severity.

### Threat Assessment

It also offers an option to assign threat to a member from your secops or security engineering team and take mitigation action. Exaforce presents a detailed breakdown for every detected threat and presents it as Exabot assessment containing analysis on involved principal actor, session, location, action that lead to this finding, and recommended steps to mitigate the threat.

### Threat Investigation

Exaforce platform also provides detailed information in case users want to inspect a threat themselves and decide on a course of action. These details cover full details on the finding such as timeline, involved sessions, resources, similar risks, etc. The investigation is supported by wide range of rich visualizations such as timeline charts, distribution charts (such as doughnut charts), and also context-based insights in the form of question and answers that can further aid and expedite the investigation in right direction.

## Layered Models for Findings

Exaforce findings are powered using a layered models architecture. Raw data (including configuration, runtime activity, historic logs) is funneled through the following models before findings are created:

* Semantic Data Model
* Behavior Model
* Knowledge Model
* AI Agents

### Semantic Data Model

The raw configuration and logs ingested from data sources such as AWS, Github, and Okta are first processed through the semantic data model. The semantic model enriches the data by adding context and meaning so that it becomes easier to explore and understand the kind of data. Some of the main features of semantic model are normalizing, adding structure to the raw data (configuration and logs), and adding contextual information.

### Behavior Data Model

Finding threats requires establishing baselines and detecting anomalies by performing the statistical analysis (using ML) on the data obtained from the semantic data model. The behavior data model performs this and after processing the data through this model, the foundational detections types are generated.

The following is a list of foundational detection types:

### **AWS Data Sources**

| Category                      | Detection Type             | Description                                                                                                                                                                      |
| ----------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Events by Identity            | WRITE\_EVENTS              | Events categorized by levels. For example, Level 1 for IAM privilege escalation and Level 2 for admin activities                                                                 |
| Events by Identity            | READ\_EVENTS               | Events focused on read actions                                                                                                                                                   |
| Location-Based                | ABNORMAL\_CITY             | Detection of activity from unusual cities based on identity baselines                                                                                                            |
| Location-Based                | ABNORMAL\_IP               | Alerts for activity from IP addresses deviating from identity baselines                                                                                                          |
| Location-Based                | ASN                        | Flags anomalies in autonomous system numbers (ASN)                                                                                                                               |
| Location-Based                | CONCURRENT\_USER\_ACTIVITY | Detects simultaneous activity from the same identity in different locations                                                                                                      |
| Location-Based                | SUSPICIOUS\_TRAVEL         | Detects instances where an identity is observed initiating events from consecutive locations that are geographically impossible to travel between within the observed time frame |
| Identity Behavior             | NEWLY\_SEEN\_USER          | Highlights newly observed identities, such as third-party accounts                                                                                                               |
| Identity Behavior             | INACTIVE\_USER             | Detects activity from identities that have been inactive, signaling potential misuse of long-term credentials                                                                    |
| Event Source and Metadata     | EVENT\_SOURCE              | Identifies anomalies in service usage by an identity                                                                                                                             |
| Event Source and Metadata     | USER\_AGENT                | Flags unusual user agents for identities                                                                                                                                         |
| Root User Events              | WRITE\_EVENTS\_ROOT        | Write actions performed by the root account                                                                                                                                      |
| Root User Events              | READ\_EVENTS\_ROOT         | Read actions performed by the root account                                                                                                                                       |
| Long-Term Credential Activity | WRITE\_LTC                 | Write events using long-term credentials                                                                                                                                         |
| Long-Term Credential Activity | READ\_LTC                  | Read events using long-term credentials                                                                                                                                          |
| Regions Used                  | AWS\_REGION\_ACCOUNT       | Identifies use of new regions by an identity at the account level                                                                                                                |
| Resource Access               | RESOURCE\_ACCESS           | Tracks patterns of access to specific resources                                                                                                                                  |
| Outlier Patterns              | PATTERN\_OUTLIER           | Detects deviations from established api access patterns                                                                                                                          |

### **GitHub Data Sources**

| Category                    | Detection Type                    | Description                                                                                                                                                                                                                                  |
| --------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identity and Token Activity | Unusual Token Usage               | Flags abnormal token behaviors                                                                                                                                                                                                               |
| Identity and Token Activity | Unusual User Activity             | Monitors anomalies in user actions                                                                                                                                                                                                           |
| Identity and Token Activity | Location and Behavior             | Identifies location-based and behavioral anomalies                                                                                                                                                                                           |
| Workflow File Anomalies     | Suspicious Workflow Modifications | Detects edits to **workflow.yaml** aimed at accessing secrets, tracks who made the modification, checks risks (such as unused tokens, no MFA), and assesses associated threat signals                                                        |
| Pull Request Anomalies      | PR Content Anomalies              | Highlights unusual PR contents, such as an actor modifying Infrastructure-as-Code (IaC) unexpectedly                                                                                                                                         |
| Pull Request Anomalies      | Actor Location Anomaly            | Flags PRs created from anomalous locations                                                                                                                                                                                                   |
| Build Provenance            | Container Builds                  | Tracks containers uploaded to registries and ties them to GitHub workflows: Alerts in case of containers uploaded without a workflow run, workflow runs triggered manually, and PR merges to unusual branches or bypassing branch protection |

### Knowledge Model

After deriving baseline detections and insights from the behavior data model, the findings are required to be enriched with external context. The knowledge model accomplishes this by funneling the detection and additional data from related sources (such as IDP) through the Large Language Models (LLMs) and produces reliable outcomes, namely recommendations and confidence levels.

## References

* Threat Dashboard Description
* How Exaforce Detections Work?
* How to Investigate and Mitigate Threat
