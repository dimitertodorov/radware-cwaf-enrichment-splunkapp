import React, { useEffect, useState } from 'react';
import TabLayout from '@splunk/react-ui/TabLayout';
import DocumentationPanel from './DocumentationPanel';
import SettingsPanel from './SettingsPanel';
import Settings from '@splunk/react-icons/Settings';
import Info from '@splunk/react-icons/Info';
import Question from '@splunk/react-icons/Question';
import Data from '@splunk/react-icons/Data';
import Monitor from '@splunk/react-icons/Monitor';
import AboutPanel from './AboutPanel';
import ManageObjectsPanel from './ManageObjectsPanel';
import { RadwareEnrichmentContext } from '../RadwareEnrichmentContext';
import Toaster, { makeCreateToast } from '@splunk/react-toast-notifications/Toaster';
import ToastMessages from '@splunk/react-toast-notifications/ToastMessages';
import { TOAST_TYPES } from '@splunk/react-toast-notifications/ToastConstants';
import SearchJob from '@splunk/search-job';
import { getStaticConfig } from '../utils/splunk_web_utils';
import LogsPanel from './LogsPanel';
import { set as _set } from 'lodash';

function MainAppViewComponent({
    readmePath = '/static/app/radware_cwaf_enrichment/README.md',
    renderVersion = 1,
    initialPanelId = 'dash',
    configService,
    runningInSplunk = false,
}) {
    const [activePanelId, setActivePanelId] = useState(initialPanelId);
    const [cfgService, setCfgService] = useState(configService);

    // Toaster for sending notifications
    const createToast = makeCreateToast(Toaster);

    // Handle tab change
    const handleChange = (e, { activePanelId: panelId }) => {
        setActivePanelId(panelId);
    };

    // Global App Error Handler
    const handleError = (error, title = 'Error Updating Settings') => {
        if (error.messages && error.messages.length > 0) {
            for (let message of error.messages) {
                createToast({
                    type: TOAST_TYPES.ERROR,
                    title: title,
                    message: message.text,
                    autoDismiss: false,
                });
            }
        } else if (error.status && error.url) {
            createToast({
                type: TOAST_TYPES.ERROR,
                title: title,
                message: `Fetch Error ${error.status} `,
                autoDismiss: false,
            });
        } else {
            createToast({
                type: TOAST_TYPES.ERROR,
                title: title,
                message: error.message,
                autoDismiss: false,
            });
        }
    };
    useEffect(() => {
        setCfgService(configService);
    }, [configService, renderVersion]);

    if (!runningInSplunk) {
        var root = typeof window === 'undefined' ? global : window;
        _set([root, '$C'], getStaticConfig().config);
        SearchJob.setSplunkConfig(getStaticConfig());
        SearchJob.setBaseFetchInit(configService.configDataService.getFetchConfig());
    }

    return (
        <RadwareEnrichmentContext.Provider
            value={{
                handleError: handleError,
                configService: configService,
                createToast: createToast,
            }}
        >
            <ToastMessages />
            <TabLayout activePanelId={activePanelId} onChange={handleChange} iconSize="small">
                <TabLayout.Panel
                    label="Info"
                    panelId="info"
                    icon={<Info screenReaderText={null} />}
                >
                    <div>
                        <DocumentationPanel readmePath={readmePath} />
                    </div>
                </TabLayout.Panel>
                <TabLayout.Panel
                    label="Setup"
                    panelId="setup"
                    icon={<Settings screenReaderText={null} />}
                >
                    <SettingsPanel renderVersion={renderVersion} />
                </TabLayout.Panel>
                <TabLayout.Panel
                    panelId={'manage'}
                    label={'Manage Objects'}
                    icon={<Data screenReaderText={null} />}
                >
                    <ManageObjectsPanel />
                </TabLayout.Panel>
                <TabLayout.Panel
                    panelId={'logs'}
                    label={'Logs'}
                    icon={<Monitor screenReaderText={null} />}
                >
                    <LogsPanel />
                </TabLayout.Panel>
                <TabLayout.Panel
                    panelId={'about'}
                    label={'About'}
                    icon={<Question screenReaderText={null} />}
                >
                    <AboutPanel />
                </TabLayout.Panel>
            </TabLayout>
        </RadwareEnrichmentContext.Provider>
    );
}

export default MainAppViewComponent;
