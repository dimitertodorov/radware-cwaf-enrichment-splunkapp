import RadwareJsonService from '../services/RadwareJsonService'
import JSONTree from "@splunk/react-ui/JSONTree"
import ToastMessages from "@splunk/react-toast-notifications"
import Card from "@splunk/react-ui/Card"
import React from "react"
import ColumnLayout from "@splunk/react-ui/ColumnLayout"
import {StyledCard} from "./RadwareEnrichmentSetupComponentStyles"

const JsonPathSelectorComponent = () => {
    const svc = new RadwareJsonService()

    return (
        <ColumnLayout>
            <ColumnLayout.Row alignItems={'stretch'}>
                <ColumnLayout.Column span={6}>
                    <ToastMessages/>
                    <StyledCard>
                        <Card className={'setup-card'}>
                            <Card.Header title={'Radware CWAF Enrichment Setup Page'}/>
                            <Card.Body>
                                <JSONTree json={svc.sampleJson}/>
                            </Card.Body>
                        </Card>
                    </StyledCard>
                </ColumnLayout.Column>
                <ColumnLayout.Column span={6}>
                    <StyledCard>
                        <Card className={'setup-card'}>
                            <Card.Header title={'Selected'}/>
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </StyledCard>
                </ColumnLayout.Column>
            </ColumnLayout.Row>
        </ColumnLayout>
    )
}

export default JsonPathSelectorComponent
