import React, {useState} from 'react'
import Switch from "@splunk/react-ui/Switch"
import ControlGroup from "@splunk/react-ui/ControlGroup"
import AppConfigService from "../src/services/AppConfigService"
import MockConfigService from "../src/services/MockConfigService"
import {useStickyState} from "../src/utils/ReactHelpers"
import Button from "@splunk/react-ui/Button"
import Text from "@splunk/react-ui/Text"
import SplunkRestService from "../src/services/SplunkRestService"
import MainAppViewComponent from "../src/components/MainAppViewComponent"

const DemoDebugComponent = () => {
    const [useMock, setUseMock] = useState(false)
    const [renderVersion, setRenderVersion] = useState(0)
    const [getStorageJwtToken, setStorageJwtToken] = useStickyState("", "splunkAppJwtToken")
    const [jwtToken, setJwtToken] = useState(getStorageJwtToken)

    const getMainView = () => {
        if (useMock) {
            return <MainAppViewComponent configService={new AppConfigService(new MockConfigService())}
                                         initialPanelId={'manage'}/>
        }
        const restService = new AppConfigService(new SplunkRestService({runningInSplunk: false, jwtToken}))
        return <MainAppViewComponent configService={restService} initialPanelId={'logs'}/>
    }

    return (<div>
        <ControlGroup label="Use mock data">
            <Switch key="useMock" value={useMock} selected={useMock} onClick={() => {
                setUseMock(!useMock)
                setRenderVersion(renderVersion + 1)
            }} appearance="toggle"/>
        </ControlGroup>
        <ControlGroup label="JWT Token For Splunk AUTH">
            <Text value={jwtToken} onChange={(e) => setJwtToken(e.target.value)}/>
            <Button type="submit" label="Save Token" appearance="primary" onClick={() => {
                setStorageJwtToken(jwtToken)
                setRenderVersion(renderVersion + 1)
            }}/>
        </ControlGroup>
        {getMainView()}

    </div>)
}

export default DemoDebugComponent
