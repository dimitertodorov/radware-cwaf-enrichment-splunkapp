import React, {useContext, useEffect, useState} from 'react'
import Button from '@splunk/react-ui/Button'
import ColumnLayout from '@splunk/react-ui/ColumnLayout'
import Select from '@splunk/react-ui/Select'
import ControlGroup from '@splunk/react-ui/ControlGroup'
import Switch from "@splunk/react-ui/Switch"
import CredentialComponent from "./CredentialComponent"
import {StyledCard} from "./ComponentStyles"
import Card from "@splunk/react-ui/Card"
import {TOAST_TYPES} from "@splunk/react-toast-notifications/ToastConstants"
import ProgressBarComponent from "./ProgressBarComponent"
import WaitSpinner from "@splunk/react-ui/WaitSpinner"
import Save from "@splunk/react-icons/Save"
import Text from "@splunk/react-ui/Text"
import {RadwareEnrichmentContext} from "../RadwareEnrichmentContext"

const isEqual = require('lodash/isEqual')

const SettingsPanel = ({
                                             renderVersion,
                                             debugMode = false
                                         }) => {
    const logLevels = [{label: 'DEBUG', value: 'DEBUG'}, {label: 'INFO', value: 'INFO'}, {
        label: 'WARNING', value: 'WARNING'
    }, {label: 'ERROR', value: 'ERROR'}, {label: 'CRITICAL', value: 'CRITICAL'},]

    const objectTypes = ['applications']

    // State variables
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [appConfig, setAppConfig] = useState({
        "credentials": {}, "settings": {
            "object_list": ["applications"], "log_level": "INFO",
            "use_proxy": 0, "proxy_url": "", "proxy_port": 0, "proxy_user": "", "proxy_password": ""
        }
    })
    const [originalSettings, setOriginalSettings] = useState(appConfig.settings)
    const [formChanged, setFormChanged] = useState(false)

    const {handleError, configService, createToast} = useContext(RadwareEnrichmentContext)

    useEffect(() => {
        setIsLoading(true)
        configService.getConfig().then((data) => {
            setOriginalSettings(data.settings)
            setAppConfig(data)
            setIsLoading(false)
        }).catch((error) => {
            handleError(error, "Error Loading Settings")
        })
    }, [renderVersion, configService])

    let handleObjectListChange = (event, {value}) => {
        if (appConfig.settings.object_list.includes(value)) {
            setAppConfig({
                ...appConfig, settings: {
                    ...appConfig.settings,
                    object_list: appConfig.settings.object_list.filter((item) => item !== value).sort()
                }
            })
        } else {
            setAppConfig({
                ...appConfig,
                settings: {...appConfig.settings, object_list: [...appConfig.settings.object_list, value].sort()}
            })
        }
    }

    const handleLogLevelChange = (event, {value}) => {
        setAppConfig({...appConfig, settings: {...appConfig.settings, log_level: value}})
    }

    const handleFieldChange = (field) => (e) => {
        setAppConfig({...appConfig, settings: {...appConfig.settings, [field]: e.target.value}})
    }

    const handleCredentialsUpdate = (credentials) => {
        setAppConfig({...appConfig, credentials: credentials})
    }

    const ObjectListCheckBoxes = objectTypes.map((value) => (<Switch
        key={value}
        value={value}
        onClick={handleObjectListChange}
        selected={appConfig.settings.object_list.includes(value)}
        appearance="toggle"
    >
        {value}
    </Switch>))

    const handleSettingsUpdate = () => {
        setIsSaving(true)
        configService.updateSettings(appConfig.settings).then((data) => {
            setAppConfig({...appConfig, settings: data.settings})
            setOriginalSettings(data.settings)
            setFormChanged(false)
            createToast({
                type: TOAST_TYPES.INFO, title: "Success", message: "Updated Settings", autoDismiss: true,
            })
            setIsSaving(false)
        }).catch((error) => {
            setIsSaving(false)
            console.error(error)
            handleError(error)
        })
    }

    const getSettingsForm = () => {
        if (isLoading) {
            return (<Card.Body>
                <ProgressBarComponent timeToComplete={5000}/>
                Loading Settings...
            </Card.Body>)
        } else {
            return (<Card.Body>
                <ControlGroup label="Log Level">
                    <Select value={appConfig.settings.log_level} onChange={handleLogLevelChange}>
                        {logLevels.map((lvl) => {
                            return (<Select.Option
                                label={lvl.label}
                                value={lvl.value}
                                key={lvl.value}
                            />)
                        })}
                    </Select>
                </ControlGroup>
                <ControlGroup label="Objects">
                    {ObjectListCheckBoxes}
                </ControlGroup>
                <ControlGroup label={'Proxy Settings'}>
                    <Switch
                        key={'use_proxy'}
                        value={appConfig.settings.use_proxy}
                        onClick={(event, {value}) => {
                            let updateValue = value === 1 ? 0 : 1
                            setAppConfig({...appConfig, settings: {...appConfig.settings, use_proxy: updateValue}})
                        }}
                        selected={appConfig.settings.use_proxy === 1}
                        appearance="toggle"
                    >
                        Use Proxy
                    </Switch>
                </ControlGroup>
                {appConfig.settings.use_proxy === 1 ?
                    <div>
                        <ControlGroup label={'Proxy Host'}>
                            <Text value={appConfig.settings.proxy_host}
                                  onChange={handleFieldChange('proxy_host')}/>
                        </ControlGroup>
                        <ControlGroup label={'Proxy Port'}>
                            <Text value={appConfig.settings.proxy_port}
                                  onChange={handleFieldChange('proxy_port')}/>
                        </ControlGroup>
                        <ControlGroup label={'Proxy User'}>
                            <Text value={appConfig.settings.proxy_user}
                                  onChange={handleFieldChange('proxy_user')}/>
                        </ControlGroup>
                        <ControlGroup label={'Proxy Password'}>
                            <Text value={appConfig.settings.proxy_password}
                                  type={'password'}
                                  onChange={handleFieldChange('proxy_password')}/>
                        </ControlGroup>
                    </div>
                    : null}
                <ControlGroup label={'Save Base Options'}
                              help={formChanged}>
                    <Button type={'submit'}
                            label={'Save'}
                            appearance={'primary'}
                            onClick={() => {
                                handleSettingsUpdate()
                            }}
                            icon={isSaving ? <WaitSpinner size={'small'}/> : <Save/>}
                            disabled={isEqual(appConfig.settings, originalSettings) || isSaving}
                    />
                </ControlGroup>
            </Card.Body>)
        }
    }

    return (
        <ColumnLayout>
            <ColumnLayout.Row alignItems={'stretch'}>
                <ColumnLayout.Column span={6}>

                    <StyledCard>
                        <Card className={'setup-card'}>
                            <Card.Header title={'Radware CWAF Enrichment Setup Page'}/>
                            {getSettingsForm()}
                        </Card>
                        {isLoading ? null : <CredentialComponent credentials={appConfig.credentials}
                                                                 handleCredentialsUpdate={handleCredentialsUpdate}
                                                                 createToast={createToast}/>}

                    </StyledCard>
                </ColumnLayout.Column>
                {debugMode ? <ColumnLayout.Column span={6}>
                    <StyledCard>
                        <Card className={'setup-card'}>
                            <Card.Header title={'Debug'}/>
                            <Card.Body>
                                <pre>{JSON.stringify(appConfig, null, 2)}</pre>
                            </Card.Body>
                        </Card>
                    </StyledCard>
                </ColumnLayout.Column> : null}
            </ColumnLayout.Row>
        </ColumnLayout>)
}

export default SettingsPanel
