import React, {useEffect, useState} from 'react'
import TabLayout from '@splunk/react-ui/TabLayout'
import DocumentationComponent from './DocumentationComponent'
import RadwareEnrichmentSetupComponent from './RadwareEnrichmentSetupComponent'
import Settings from '@splunk/react-icons/Settings'
import Info from '@splunk/react-icons/Info'
import Question from "@splunk/react-icons/Question"
import Data from "@splunk/react-icons/Data"
import Monitor from "@splunk/react-icons/Monitor"
import AboutPanel from "./AboutPanel"
import ManageObjectsComponent from "./ManageObjectsComponent"
import {RadwareEnrichmentContext} from "../RadwareEnrichmentContext"
import Toaster, {makeCreateToast} from "@splunk/react-toast-notifications/Toaster"
import {TOAST_TYPES} from "@splunk/react-toast-notifications/ToastConstants"
import SearchJob from "@splunk/search-job"
import {staticConfig} from "../services/SplunkWebConfig"
import DashboardComponent from "./DashboardComponent"
import { get as _get } from 'lodash'
import { set as _set } from 'lodash'

function MainAppViewComponent({
                                  readmePath = "/static/app/radware_cwaf_enrichment/README.md",
                                  renderVersion = 1,
                                  initialPanelId = 'dash',
                                  configService,
                                  runningInSplunk = false
                              }) {

    const [activePanelId, setActivePanelId] = useState(initialPanelId)
    const [cfgService, setCfgService] = useState(configService)

    // Toaster for sending notifications
    const createToast = makeCreateToast(Toaster)

    // Handle tab change
    const handleChange = (e, {activePanelId: panelId}) => {
        setActivePanelId(panelId)
    }

    // Global App Error Handler
    const handleError = (error, title = "Error Updating Settings") => {
        if (error.messages && error.messages.length > 0) {
            for (let message of error.messages) {
                createToast({
                    type: TOAST_TYPES.ERROR, title: title, message: message.text, autoDismiss: false,
                })
            }
        } else if (error.status && error.url) {
            createToast({
                type: TOAST_TYPES.ERROR, title: title, message: `Fetch Error ${error.status} `, autoDismiss: false,
            })
        } else {
            createToast({
                type: TOAST_TYPES.ERROR, title: title, message: JSON.stringify(error, null, 2), autoDismiss: false,
            })
        }
    }
    useEffect(() => {
        setCfgService(configService)

    }, [configService, renderVersion])

    if (!runningInSplunk) {
        console.log("Running isn Splunk: ", runningInSplunk)
        var root = typeof window === 'undefined' ? global : window;
        _set([root, '$C'], staticConfig.config)
        SearchJob.setSplunkConfig(staticConfig)
        SearchJob.setBaseFetchInit(configService.configDataService.getFetchConfig())

    }

    return (<RadwareEnrichmentContext.Provider
        value={{handleError: handleError, configService: configService, createToast: createToast}}>
        <TabLayout activePanelId={activePanelId}
                   onChange={handleChange}
                   iconSize="small">
            <TabLayout.Panel label="Info"
                             panelId="info"
                             icon={<Info screenReaderText={null}/>}>
                <div>
                    <DocumentationComponent readmePath={readmePath}/>
                </div>
            </TabLayout.Panel>
            <TabLayout.Panel label="Setup"
                             panelId="setup"
                             icon={<Settings screenReaderText={null}/>}>
                <RadwareEnrichmentSetupComponent renderVersion={renderVersion}/>
            </TabLayout.Panel>
            <TabLayout.Panel panelId={'manage'}
                             label={'Manage Objects'}
                             icon={<Data screenReaderText={null}/>}>
                <ManageObjectsComponent/>
            </TabLayout.Panel>
            <TabLayout.Panel panelId={'logs'} label={'Logs'} icon={<Monitor screenReaderText={null}/>}>
                <DashboardComponent/>
            </TabLayout.Panel>
            <TabLayout.Panel panelId={'about'} label={'About'} icon={<Question screenReaderText={null}/>}>
                <AboutPanel/>
            </TabLayout.Panel>
        </TabLayout>
    </RadwareEnrichmentContext.Provider>)
}

export default MainAppViewComponent
