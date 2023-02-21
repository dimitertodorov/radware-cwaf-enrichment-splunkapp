import ColumnLayout from "@splunk/react-ui/ColumnLayout"
import {StyledCard} from "./ComponentStyles"
import Card from "@splunk/react-ui/Card"
import DL from "@splunk/react-ui/DefinitionList"
import React from "react"

const AboutPanel = () => {

    return (
        <ColumnLayout>
            <ColumnLayout.Row>
                <ColumnLayout.Column span={6}>
                    <StyledCard>
                        <Card className={'setup-card'}>
                            <Card.Header title={'App Properties'}/>
                            <Card.Body>
                                <DL>
                                    <DL.Term>Author</DL.Term>
                                    <DL.Description>Dimiter Todorov</DL.Description>
                                    <DL.Term>App Version </DL.Term>
                                    <DL.Description>{__GIT__VERSION}</DL.Description>
                                    <DL.Term>App Commit </DL.Term>
                                    <DL.Description>{__GIT__COMMITHASH}</DL.Description>
                                    <DL.Term>App Branch </DL.Term>
                                    <DL.Description>{__GIT__BRANCH}</DL.Description>
                                    <DL.Term>Frontend Build </DL.Term>
                                    <DL.Description>{BUILT_AT}</DL.Description>
                                </DL>
                            </Card.Body>
                        </Card>
                    </StyledCard>
                </ColumnLayout.Column>
            </ColumnLayout.Row>
        </ColumnLayout>
    )
}

export default AboutPanel
