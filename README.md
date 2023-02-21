# Radware CWAF Enrichment - SplunkApp

This project contains a Splunk App that integrates with the Radware Cloud WAF Rest API.

For App documentation see the [README.md](splunkapp/README.md) inside the splunkapp subfolder.

The instructions below are only for those interested in development workflow for this application.
## Development - Getting Started

Most build and development logic is implmented with InvokeBuild Powershell Tasks
See the `*.build.ps1` files for more details.

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

### Developing with Local Splunk
#### Setup an Auth Token. 
This will enable JWT authentication and store a JWT token and URI coordinates inside *frontend/packages/radware-enrichment-components/demo/standalone/local_setup.js*

`Invoke-Build SetupAuthToken`

### Link and Update app
Requires SPLUNK_HOME environment variable to be set. 
Will link the app into etc/apps/radware_cwaf_enrichment

`Invoke-Build UpdateApp`

### Run Integration Tests
Tests are run using [Pester](https://pester.dev/) and PowerShell.
These tests check app configuration functionality, as well as testing the generating commands.

`Invoke-Build Pester`

### Frontend Development Tasks

### Install and Build Frontend
Build all frontend components and copy into live Splunk app directory.

`Invoke-Build BuildFrontend`

### Start Demo App
This will start webpack demo app with live-reload for developing and testing your frontend code outside of Splunk.

`Invoke-Build StartDemoApp`