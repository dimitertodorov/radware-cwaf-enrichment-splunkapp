import React, {useEffect, useState} from 'react'
import Card from "@splunk/react-ui/Card"
import ColumnLayout from "@splunk/react-ui/ColumnLayout"
import {StyledCard} from "./RadwareEnrichmentSetupComponentStyles"
import ControlGroup from "@splunk/react-ui/ControlGroup"
import Button from "@splunk/react-ui/Button"
import SearchResultTableComponent from "./SearchResultTableComponent"

const DashboardComponent = (props) => {

    const [searchComplete, setSearchComplete] = useState(false)
    const [searchRunning, setSearchRunning] = useState(false)
    const logSearchQuery = {
        search: 'index="_internal" source="*/var/log/splunk/radware_cwaf_enrichment.log" OR source="*\\\\var\\\\log\\\\splunk\\\\radware_cwaf_enrichment.log" | rex "(?<LogDate>.*)\\s(?<LogLevel>(DEBUG|INFO|WARNING|ERROR|CRITICAL))\\s(?<Facility>[a-zA-Z_]+)\\s-\\s(?<Message>.*$)" | search LogLevel=* | eval _timestamp=strptime(LogDate, "%Y-%m-%d %T,%3N") | sort _timestamp desc | table LogDate LogLevel Facility Message',
        earliest_time: '-2d',
        latest_time: 'now'
    }
    const [searchQuery, setSearchQuery] = useState(undefined)
    const [searchTime, setSearchTime] = useState(Date.now())

    const executeLogQuery = () => {
        setSearchRunning(true)
        setSearchTime(Date.now())
        setSearchComplete(false)
    }

    useEffect(() => {
        setSearchQuery(logSearchQuery)
        setSearchRunning(true)
    },[])

    return (<ColumnLayout>
        <ColumnLayout.Row>
            <ColumnLayout.Column span={6}>
                <StyledCard>
                    <Card className={'setup-card'}>
                        <Card.Header title={'Logs'} align={'right'}/>
                        <Card.Body>
                            <ControlGroup label={'Show Logs'} labelPosition={'top'}
                                          help={'Execute KV actions in context of the current user'}>

                            </ControlGroup>
                            <ControlGroup label={'Run Search'}>
                                <Button onClick={executeLogQuery}>Execute
                                    Get Logs</Button>
                            </ControlGroup>
                            {searchRunning ? <SearchResultTableComponent searchQuery={logSearchQuery}
                                                                         searchTime={searchTime}
                                                                         resultsCallback={() => {
                                                                             setSearchComplete(true)
                                                                         }}/> : null}
                        </Card.Body>
                    </Card></StyledCard>
            </ColumnLayout.Column>
        </ColumnLayout.Row>
    </ColumnLayout>)
}

export default DashboardComponent
