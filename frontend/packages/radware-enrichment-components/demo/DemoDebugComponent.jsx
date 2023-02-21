import React, {useEffect, useState} from 'react'
import Switch from "@splunk/react-ui/Switch"
import ControlGroup from "@splunk/react-ui/ControlGroup"
import AppConfigService from "../src/services/AppConfigService"
import MockConfigService from "../src/services/MockConfigService"
import {getStickyValue, useStickyState} from "../src/utils/ReactHelpers"
import Button from "@splunk/react-ui/Button"
import Text from "@splunk/react-ui/Text"
import SplunkRestService from "../src/services/SplunkRestService"
import MainAppViewComponent from "../src/components/MainAppViewComponent"
import CollapsiblePanel from "@splunk/react-ui/CollapsiblePanel"

const DemoOptionControl = ({fieldName, fieldLabel, fieldHelp, valueCallback}) => {
    const [getStorageValue, setStorageValue] = useStickyState(false, fieldName)
    const [value, setValue] = useState(getStorageValue)

    useEffect(() => {
        if (valueCallback) {
            valueCallback(value)
        }
    }, [value])

    return (<ControlGroup label={fieldLabel} help={fieldHelp}>
        <Text disabled={!value.inStorage}
              value={value.value}
              onClick={() => setValue({inStorage: true, value: ''})}
              onChange={(e) => setValue({...value, value: e.target.value})}/>
        <Button type="submit" label={`Save ${fieldName}`} appearance="primary" onClick={() => {
            setStorageValue({inStorage: true, value: value.value})
        }}/>
        <Button label={'Reset'} onClick={() => {
            window.localStorage.removeItem(fieldName)
            setValue(getStickyValue(fieldName, ''))
        }}/>
    </ControlGroup>)
}

const DemoDebugComponent = () => {
    const [useMock, setUseMock] = useState(false)
    const [renderVersion, setRenderVersion] = useState(0)
    const [jwtToken, setJwtToken] = useState('')

    const getMainView = () => {
        if (useMock) {
            return <MainAppViewComponent configService={new AppConfigService(new MockConfigService())}
                                         initialPanelId={'manage'}/>
        }
        const restService = new AppConfigService(new SplunkRestService({runningInSplunk: false, jwtToken}))
        return <MainAppViewComponent configService={restService} initialPanelId={'logs'}/>
    }

    return (<div>
        <CollapsiblePanel title={'Configure Demo Settings'}>
            <ControlGroup label="Use Mock Settings">
                <Switch key="useMock" value={useMock} selected={useMock} onClick={() => {
                    setUseMock(!useMock)
                    setRenderVersion(renderVersion + 1)
                }} appearance="toggle"/>
            </ControlGroup>
            <DemoOptionControl fieldName="adminToken"
                               fieldLabel="JWT Token For Splunk AUTH"
                               fieldHelp={'Specify JWT Token for connecting to Splunk API'}
                               valueCallback={setJwtToken}/>
            <DemoOptionControl fieldName="splunkdHostUrl"
                               fieldLabel="URL to Splunkd API"
                               fieldHelp={'Point to the REST API host'}/>
            <DemoOptionControl fieldName="splunkWebUrl"
                               fieldLabel="URL to Splunk Web"
                               fieldHelp={'Base path to Splunk WEB'}/>


        </CollapsiblePanel>
        {getMainView()}
    </div>)
}

export default DemoDebugComponent
