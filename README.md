# Radware CWAF Enrichment - SplunkApp

This project contains a Splunk App that integrates with the Radware Cloud WAF Rest API.

## Getting Started

### App Requirements
* Splunk 9.0.0 or SplunkCloud
* Rest API Credentials for Radware Cloud WAF

### Development Requirements
* NodeJS 16.x or higher
* Powershell Core for Build Scripts (With [Invoke-Build](https://github.com/nightroman/Invoke-Build) Module)
* Yarn 1.22.10 or higher
* Local Splunk Enterprise installation (Dockerized development environment is not yet supported)

### Package Layout
* `frontend` - Contains the frontend code for the radware_cwaf_enrichment Splunk App. Written in [React](https://reactjs.org/) with the [Splunk UI Framework](https://splunkui.splunk.com/)
* `splunkapp` - Contains the Splunk App code for the radware_cwaf_enrichment Splunk App
* `build` - Contains the build scripts for the radware_cwaf_enrichment Splunk App