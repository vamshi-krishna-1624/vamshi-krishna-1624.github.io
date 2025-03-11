# Exabot Investigate

This document provides details on Exabot Investigate that offers detailed investigative capabilities for the following entities of organizations integrated with Exaforce platform:

* Identities
* Sessions
* Events
* Resources
* Clusters
* Applications/workloads
* Repositories

The investigate capability offers granular insights and a wide range of visualizations for exploration and analysis of your organization’s entities. In addition to these, it offers cross linking across the entity details with a context-aware transition so that you can check related information across entities. For example, you can find what all resources an identity accessed or what all sessions have anomalous events.

The **Exabot Investigate** is an intelligent service that presents detailed insights and statistics across all your organizational data sources. After connecting various data sources, the platform adds semantic meaning to the data (establishes entities), labels with behavioral traits for various established data entites, and transforms these into knowledge points such as insights, analytics, stastics, and presents them into easily consumable dashboards powered with rich visualizations.

### Identities

The investigate identities capability provides insights and details on all your identities across all data sources. The platform identifies various types of identities such as human identities, machine identities, application identities, third party identities (for example, GitHub is third party identity when it triggers workflows on AWS), and group identities. It then presents related entities such as resources, events, secrets, and so on.

In addition, the investigate bot presents risks and threats associated with identities with easy access to associated risk and threat details for correlative investigation/analysis. The bot also provides automatic access reviews on each identity, reducing manual analysis for users so that they do not need to plan and execute periodic audits.

### Sessions

Sessions represent an activity by an identity and detailed analysis of sessions can help identitfy risks and threats proactively or while investigating to mitigate a threat. The investigate bot identifies and presents detailed insights into all sessions across all accounts that are integrated with Exaforce platform. Session insights are offered in terms of rich visualizations such as historic trends, grouped by identities (including origins), grouped by events (specific action such as a read/write on S3), grouped by resources, location distribution, etc. In addition, threat findings associated with sessions are also presented, helping in investigations to mitigate those threats.

One significant function of session investigation is that the platform marks if a session is a **typical** or an **outlier** session. Typical session means it conforms to regular and normal/expected behavior of a session (such as a scheduled workflow). Outlier is when a session has some events (specific actions) that are not regular or expected and therefore, can be anomalous. This helps security engineering or secops to focus on those sessions to monitor for potential risks or threats.

### Events

Events are specific actions that occur and the Exaforce platform analyzes each event and provides insights into those. The platform presents anomalies, errors, and insights such as historic trends, grouped by identities, grouped by sessions, locations, etc. The platform further enriches these by isolating and presenting data events (such as an export of logs).

### Resources

The resources part of investigation capability presents centralized monitoring for cloud resources. It provides detailed visibility into resource inventory, configurations, and lifecycle events across accounts and regions that are presented in terms of rich visualizations such as historical trends, charts, tables, and intuitive collections such as group by account, group by service, etc. The platform offers deeper insights into service distribution, regional deployment, and tagging patterns (if tags are present). The resources investigation aids security and compliance by tracking identity access patterns, resource events, threats, and risk findings. This enables efficient resource governance, security monitoring, and continous response readiness.

The platform distinguishes between types of resources and presents insights and details per resource type. For example, the platform provides deeper insights into all or a specific compute resource (such as an EC2 instance) or all or specific SSL certificates.

### Clusters

The investigate capability presents insights and details for Kubernetes cluster sessions in terms of rich visualizations such as trends, charts, tables, etc. It tracks the cluster sessions across identities, events, workloads, and locations and provides deep insights into session activity, cluster usage, and detailed audit logs. Using the obtained workload impacts, workload distribution, source IP addresses, and user agent details along with capability to filter to specific conditions, users can analyze and filter session data effectively.

**Note:** The platform identifies workloads and generates insights into all workloads or can provide granular and deeper details into specific workload.

### Applications and Code

The investigate capability also extends its scope to provide deep insights into your SaaS applications and code repositories.

The platform presents comprehensive insights for your SaaS applications, integrating authentication security, user management, and access control features. It tracks MFA status, authentication modes, and potential security risks while providing detailed insights into user activities, admin privileges, and geographical access patterns.

In case of code repositories, whether it is an active or inactive repo, it becomes critical to continuously monitor for potential security problems. The platform discovers your repositories, and provides comprehensive monitoring and security insights of all repos, allowing users to track repository activity and security configurations. It presents details such as the following:

* Active and inactive repositories
* Usage of deployment credentials (keys and secrets)
* Access patterns (by location and user agents)
* Workflow executions
* Security risks

High-level metrics with detailed breakdowns across multiple dimensions like team access, admin privileges, event logs, and threats help in investigating and mitigating while also aiding both operational monitoring and security compliance.

## References

* Identity Details Dashboard Description
* Session Details Dashboard Description
* Events Dashbpard Description
* How to Investigate K8s Clusters and Mitigate Risks
* How to Investigate Repositories and Mitigate Risks
