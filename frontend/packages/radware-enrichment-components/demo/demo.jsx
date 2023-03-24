import React from 'react'
import {render} from 'react-dom'

import {SplunkThemeProvider} from '@splunk/themes'
import {getUserTheme} from '@splunk/splunk-utils/themes'
import SearchResultTableComponent from "../src/components/SearchResultTableComponent"
import DemoDebugComponent from "./DemoDebugComponent"

getUserTheme()
    .then((theme) => {
        const containerEl = document.getElementById('main-component-container');
        render(
            <SplunkThemeProvider family="enterprise" colorScheme="light" density="comfortable">
                <DemoDebugComponent />
            </SplunkThemeProvider>,
            containerEl
        );
    })
    .catch((e) => {
        const errorEl = document.createElement('span');
        errorEl.innerHTML = e;
        document.body.appendChild(errorEl);
    });
