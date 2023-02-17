import React from 'react'

import layout from '@splunk/react-page'
import {getUserTheme} from '@splunk/splunk-utils/themes'
import {StyledContainer, StyledGreeting} from './StartStyles'
import MainAppViewComponent from "@splunk/radware-enrichment-components/src/components/MainAppViewComponent"
import AppConfigService from "@splunk/radware-enrichment-components/src/services/AppConfigService"
import SplunkRestService from "@splunk/radware-enrichment-components/src/services/SplunkRestService"

getUserTheme()
    .then((theme) => {
        layout(<StyledContainer>
            <StyledGreeting>Radware CWAF Enrichment</StyledGreeting>
            <MainAppViewComponent markdownFile={'/static/app/radware_cwaf_enrichment/README.md'}
                                  runningInSplunk={true}
                                  initialPanelId={'info'}
                                  configService={new AppConfigService(new SplunkRestService({runningInSplunk: true}))}/>
        </StyledContainer>, {
            theme,
        })
    })
    .catch((e) => {
        const errorEl = document.createElement('span')
        errorEl.innerHTML = e
        document.body.appendChild(errorEl)
    })
