import {convertCredentials, parseConfig} from "./AppConfigHelper"
import * as config from "@splunk/splunk-utils/config"
import {defaultFetchInit, handleResponse} from '@splunk/splunk-utils/fetch'
import {staticConfig} from "./SplunkWebConfig"

// This service handles all interaction with the Splunk REST API
// It is used by the AppConfigService to get and update the app's configuration, and perform any other REST API calls.
// Supports running within a Splunk app, or in a standalone React app (for development) by setting the runningInSplunk flag
// Uses jwtToken to authenticate with Splunk when running in standalone mode
class SplunkRestService {
    constructor({
                    runningInSplunk = false,
                    jwtToken = null,
                    localSplunkHost = "https://lvh.me:8089",
                    settingsEndpoint = "/servicesNS/nobody/radware_cwaf_enrichment/radware_cwaf_enrichment/radware_cwaf_enrichment_config/settings",
                    propertiesEndpoint = "/services/properties/radware_cwaf_enrichment/settings"
                }) {
        this.runningInSplunk = runningInSplunk
        this._fetchFn = window.fetch.bind(window)
        this.localSplunkHost = localSplunkHost
        this.settingsEndpoint = settingsEndpoint
        this.propertiesEndpoint = propertiesEndpoint
        this.splunkAuthToken = jwtToken
        this.settingsUrl = this.getRelativeUrl(this.settingsEndpoint)
        this.propertiesUrl = this.getRelativeUrl(this.propertiesEndpoint)

    }

    getRelativeUrl = (url) => {
        if (this.runningInSplunk === true) {
            return `/en-US/splunkd/__raw${url}`
        }
        return `${this.localSplunkHost}${url}`
    }

    getRemoteConfig = () => {
        return staticConfig
    }

    getFetchConfig = () => {
        let fetchConfig = {}
        if (this.runningInSplunk === true) {
            fetchConfig = {
                ...defaultFetchInit, headers: {
                    'X-Splunk-Form-Key': config.CSRFToken,
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                }
            }
        } else {
            fetchConfig = {
                method: 'get',
                headers: {'Authorization': 'Splunk ' + this.splunkAuthToken, 'Accept': 'application/json'}
            }
        }
        return fetchConfig
    }

    getConfig = async () => {
        return this.fetchFn('get', this.propertiesEndpoint)
    }

    // Wrapper around fetch to handle requests to the SplunkApp settings endpoint
    fetchFn = async (method = 'get', url, params, processResponse=true) => {
        let config = this.getFetchConfig()
        config.method = method
        url = this.getRelativeUrl(url)
        if (params) {
            params['output_mode'] = 'json'
        } else {
            params = {output_mode: 'json'}
        }
        url = url + "?" + new URLSearchParams(params)
        return this._fetchFn(url, config)
            .then(processResponse ? handleResponse(200) : (response) => Promise.resolve(response))
            .catch((error) => {
                if(typeof error.json !== 'function'){
                    return Promise.reject(error)
                }
                return error.json().then((json) => {
                    return Promise.reject(json)
                })
            })
    }

    // Fetch the app's settings from properties

    // Update the app's settings (e.g. log_level, object_list, etc.)
    updateSettings = async (settings) => {
        delete (settings.disabled)
        delete (settings['eai:acl'])
        return this.fetchFn('post', this.settingsEndpoint, settings).then((data) => {
            return Promise.resolve(parseConfig(data))
        })
    }

    deleteCredential = async (credential_index) => {
        let params = {
            [`credential.${credential_index}.action`]: "delete"
        }
        return this.fetchFn('post', this.settingsEndpoint, params).then((data) => {
            const updatedConfig = parseConfig(data)
            return Promise.resolve(updatedConfig.credentials)
        })
    }

    addOrUpdateCredential = async (credential, credential_index = "create") => {
        let updateCred = {...credential}

        if (updateCred.password_set === "1") {
            delete updateCred.password
        }
        updateCred.name = updateCred.credential_name

        delete updateCred.password_confirm
        delete updateCred.credential_name
        delete updateCred.state
        if (credential_index !== "create") {
            updateCred['action'] = "update"
        } else {
            updateCred['action'] = "create"
        }
        let credentialPayload = convertCredentials({
            [credential_index]: updateCred
        })
        return this.fetchFn('post', this.settingsEndpoint, credentialPayload).then((data) => {
            const updatedConfig = parseConfig(data)
            return Promise.resolve(updatedConfig.credentials)
        })
    }
}

export default SplunkRestService
