# Core Concepts

The following sections explain core concepts of the Exaforce platform and defines some of the key terms in the context of using Exaforce capabilities.

## Security Concepts

In the context of using Exaforce platform, the following concepts are used and followed throughout, in offering you real-time insights, analytics, and detections for your organizations.

### Risks

A risk is a state of an entity (such as a specific configuration object) or one or more events that may pose a potential security threat, but not yet caused any problem. If it is not addressed, it could lead to exploitations or cause damage. Examples of risks include but not limited to the following:

* Hardcoded secrets or keys in the code
* Incorrect security configurations
* Elevated privileges for users that do not need them
* Authentication without multi-factor schemes
* Weak password policies or encryptions, leading to vulnerabilities

### Anomalies

An anomaly is an event or state of an entity that deviates from a deemed “regular” pattern of occurrence or state. While anomalies are unpredictable and can occur anytime, not all anomalies pose risks. However, each anomaly need to be detected, and analyzed for a potential risk or threat. Examples for anomalies include but not limited to the following:

* Sessions from a user regular from a geography are randomly established from a different location
* Uncommonly high workloads or CI/CD jobs from a specific repo
* Access requests to forbidden resources
* Privilege escalations to users who usually do not require them

**Note:** An anomaly can be a risk, not all anomalies are risks, and not all risks are due to anomalies.

### Threats

A threat is a state of an entity or one or more events that will cause compromise (such as sensitive data leak) and damage (misuse by malicious actors). Threats occur when one or more risks are not handled and these risks are growing in number. Such risks will lead malicious actors to gain access to internal systems or exploit vulnerabilities to send attacks (such as ransomware). Not all threats are security problems, however, all threats are required to be investigated.

**Note:** A **severity** is an extent of intensity with which a risk or threat may cause damage. \*\*\*\*Risks and threats are classified into low, medium, high, and critical severities.

### Detection

A detection is an act of finding and notifying a risk or anomaly or a threat. The Exaforce platform continuously monitors the datasources (logs, configs, etc) and detects anomalies, risks, and threats and presents them as **findings** (such as risk findings, threat findings, etc).

### Prediction Window

Exaforce platform scans logs from integrated data sources, generates insights, flags risks/anomalies, and reports threats. The platform obtains logs everyday for a specific time interval (such as past 30 days), and then runs statistical and predictive machine learning models to generate insights, flag risks/anomalies, and generates threats.

The time taken for this stastical and predictive modeling is known as a **Prediction Window** as the logs for this are evaluated/analyzed based on the models updated on the previous interval’s data.

### False Positives

During detection, a number of threat findings may not necessarily be real threats (leading to compromises and damage). Such findings are known as **False Positives**. Exaforce platform not only detects risks and findings, but also identifies false positives among the detected threats, with minimum latency, effectively reducing the efforts and operational expenditure on false positive analysis.

### Security Scores

Exaforce platform assigns security scores to various entities of your organization data (such as policies, workflows, etc). The security scores are derived on a scale of 1-100, and are an average of a **Risk Score** and **Threat score**.

A **Risk Score** represents the chance that an identity or session or resource **may be** compromised. A **Threat Score** represents the change that an identity or session or resource **is** compromised.

Risk and threat score are a weighted averages of all risks and threats found across all data sources and are derived on a scale of 1-100. Here, risks or threats are assigned with weights as per their severities. For example, low severity risks are assigned with lower weights compared to medium, high, and critical.

**Note:** If no threats are found, the score will be zero. However, this does not indicate an absence of risk.

***

## Data Sources

Exaforce is a security operations cloud plarform and offers real-time analytics, insights, and detections for your organization, based on the **data** supplied to the platform. Enterprises may have multiple tool chains, repos, version management systems, identity providers, cloud providers, applications, etc. In Exaforce, these are broadly identified as **Data Sources**. It is required that you integrate these datasources to Exafoce platform to start obtaining insights, detections, etc.

Exaforce offers you fine-grained control so that you can integrate only a sub-set of data sources. For example, you may only connect a specific repository from your GitHub organization or specific AWS accounts in an AWS org unit. Exaforce discovers these and lets you onboard or deboard these as per your needs.

**Note:** In case of some data sources such as AWS cloud environment, it may be required that you specifically configure notifications/alerts for events such as configuration changes and stream them to Exaforce to include them in Exaforce statistical models for generating insights, detections, etc.

### Identities

An Identity can be a user account or a service account or an identity provider role or application identity. A user identity can be a human identity (a real human user with credentials) or a machine identity (a service account or an IAM role).

### Raw Data

Raw data for Exaforce can be configuration data, historical data such as logs, or runtime data such as events, sessions, etc. An **Event** is an action that occured at a particular time and can include but not limited to the following:

* Configuration change
* Resource creation, updation, or deletion
* Session authentication
* Session expiration
* Workflow (CI/CD pipeline) or action (job) trigger
* Pull requests and merge requests

Logs can be audit logs or your application activity logs or configuration events or simply user session information such as authentication logs. You can configure per data source logs or within a data source, a specific entity (like an S3 bucket in AWS) logs to be streamed to Exaforce

***

## Exaforce Entities

Exaforce also provides capability for you to define few entities for which you can add custom definitions and use them to group resources, filter resources, or create integrations to setup automated workflows.

### Tags

Similar to AWS tags, Exaforce platform allows you to define tags. Tags are key-value pairs with which you can group or filter cloud resources.

### Integrations

Integrations offer you to connect your external notification systems, project/defect management systems, or Security Information and Event Management (SIEM)/Security Orchestration, Automation and Response (SOAR) systems. Once integrated, these can also be configured in Exaforce **Automation Rules** to receive notifications for a wide range of events, such as when threats or risks identified, resources are created, updated, etc.
