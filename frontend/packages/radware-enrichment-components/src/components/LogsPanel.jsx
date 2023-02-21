import React, {useEffect, useState} from 'react'
import Card from "@splunk/react-ui/Card"
import ColumnLayout from "@splunk/react-ui/ColumnLayout"
import {StyledCard} from "./ComponentStyles"
import ControlGroup from "@splunk/react-ui/ControlGroup"
import Button from "@splunk/react-ui/Button"
import SearchResultTableComponent from "./SearchResultTableComponent"

const LogsPanel = (props) => {

    const [searchRunning, setSearchRunning] = useState(false)
    const logSearchQuery = {
        search: 'index="_internal" source="*/var/log/splunk/radware_cwaf_enrichment.log" OR source="*\\\\var\\\\log\\\\splunk\\\\radware_cwaf_enrichment.log" | rex "(?<LogDate>.*)\\s(?<LogLevel>(DEBUG|INFO|WARNING|ERROR|CRITICAL))\\s(?<Facility>[a-zA-Z_]+)\\s-\\s(?<Message>.*$)" | search LogLevel=* | sort _time desc | table _time LogLevel Facility Message ',
        earliest_time: '-2d',
        latest_time: 'now'
    }

    const [searchTime, setSearchTime] = useState(Date.now())

    const executeLogQuery = () => {
        setSearchRunning(true)
        setSearchTime(Date.now())
    }

    useEffect(() => {
        setSearchRunning(true)
    }, [])

    return (<ColumnLayout>
        <ColumnLayout.Row>
            <ColumnLayout.Column span={6}>
                <StyledCard>
                    <Card className={'setup-card'}>
                        <Card.Header title={'Get Logs'} align={'right'} />
                        <Card.Body>
                            <ControlGroup label={'Show Logs'} labelPosition={'top'}
                                          help={'Get logs from app logfile'}>

                            </ControlGroup>
                            <ControlGroup label={'Run Search'}>
                                <Button onClick={executeLogQuery}>Execute
                                    Get Logs</Button>
                            </ControlGroup>

                        </Card.Body>
                    </Card></StyledCard>
                {searchRunning ? <SearchResultTableComponent searchQuery={logSearchQuery}
                                                             searchTime={searchTime} /> : null}
            </ColumnLayout.Column>
        </ColumnLayout.Row>
    </ColumnLayout>)
}

export default LogsPanel
