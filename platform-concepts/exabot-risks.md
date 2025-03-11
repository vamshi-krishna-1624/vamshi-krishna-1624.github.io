# Exabot Risks

This document provides details on Exabot Risks that identify and present reliable and actionable outcomes for users to quickly mitigate risks for their organization’s various cloud environments, identity providers, repositories, K8s clusters, and so on.

A risk is a potential security problem such as a vulnerability that may not yet have lead to a compromise or attack, but it may lead to them if not acted upon for mitigation. Risks can surface due to various configuration states or runtime activities that could potentially lead to exploitation by malicious actors. Typical examples of risks include, but not limited to the following:

* Wrong or misconfiguration
* Unrotated keys
* Deviations for security guidelines (such as weak password policies)
* Unencrypted secrets or hardcoding them
* Privileges that are not required
* Inactive identities

Exabot Risks Presenting Reliable and Actionable Risk Findings

The **Exabot Risks** offers the following services for you, on a per data source basis or across all data sources:

### Risk Findings

Exaforce detects and classifies risks according to the severity (extent of damage if risk leads to a compromise) with severity levels being low, medium, high, and critical. The platform also offers option to assign a risk to a member from your secops or security engineering team and take mitigation action. You can also supress the risk finding if you deem it as a false-positive. The platform also suggests you mitigation actions that you can follow and mitigate the risk. The risk findings offers various trends, charts, and grouping options for rich visualization.

### Rules

Rules are pre-defined conditions using which Exaforce detects potential security problems and classifies them into risks. Users can disable certain rules if requied, but it is recommended to not disable critical and high risk rules, so that your environments are monitored continuously. Instead, users can use supression to turn off risks in case the reported risk is deemed false-positive.

**Note:** Currently all rules are system-defined and users can enable or disable them, but cannot create custom conditions.

## References

* Risks Dashboard Description
* How to Prevently Mitigate Threats
