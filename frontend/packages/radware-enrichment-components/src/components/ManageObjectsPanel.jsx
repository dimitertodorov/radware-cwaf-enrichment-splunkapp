import ColumnLayout from "@splunk/react-ui/ColumnLayout"
import {StyledCard} from "./ComponentStyles"
import Card from "@splunk/react-ui/Card"
import React, {useContext, useState} from "react"
import {RadwareEnrichmentContext} from "../RadwareEnrichmentContext"
import Button from "@splunk/react-ui/Button"
import ControlGroup from "@splunk/react-ui/ControlGroup"
import SearchResultTableComponent from "./SearchResultTableComponent"

const {Sema} = require('async-sema')

const ManageObjectsPanel = () => {
    const {handleError, configService} = useContext(RadwareEnrichmentContext)
    const lookupQuery = '| inputlookup radware_cwaf_applications_lookup | table id,workflowName,monitoringStatus,_key'

    const [searchResults, setSearchResults] = useState({
        applications: undefined,
        listRemote: undefined,
        importRemote: undefined
    })

    const [activeSearch, setActiveSearch] = useState(undefined)
    const [searchQuery, setSearchQuery] = useState(undefined)
    const [searchTime, setSearchTime] = useState(Date.now())

    const deleteAll = () => {
        const deleteSema = new Sema(6, {capacity: 200})
        searchResults['applications'].forEach((row) => {
            deleteSema.acquire().then(() => {
                configService.configDataService.fetchFn('delete', '/servicesNS/nobody/radware_cwaf_enrichment/storage/collections/data/radware_cwaf_applications/' + row._key, undefined, false).then((_) => {
                    deleteSema.release()
                }).catch((error) => {
                    deleteSema.release()
                    handleError(error, `Error Deleting Object ${row._key} ${error}`)
                })
            })
        })
        setSearchTime(Date.now())
        executeQueryInTable(lookupQuery, 'applications')()
        setSearchResults({...searchResults, applications: undefined})
    }

    const executeQueryInTable = (query, resultsKey) => {
        return () => {
            setSearchResults({...setSearchResults, [resultsKey]: undefined})
            setSearchTime(Date.now())
            setActiveSearch(resultsKey)
            setSearchQuery({search: query})
        }
    }

    const updateSearchResultsCallback = (resultsKey) => {
        return (results) => {
            setSearchResults({...setSearchResults, [resultsKey]: results.results})
        }
    }

    return (<ColumnLayout>
        <ColumnLayout.Row>
            <ColumnLayout.Column span={6}>
                <StyledCard>
                    <Card className={'setup-card'}>
                        <Card.Header title={'Actions'} align={'right'}/>
                        <Card.Body>
                            <ControlGroup label={'KV Actions'} labelPosition={'top'}
                                          help={'Execute KV actions in context of the current user'}>
                                <Button onClick={executeQueryInTable(lookupQuery, 'applications')}>Execute
                                    Lookup</Button>
                                <Button onClick={deleteAll}
                                        disabled={!searchResults.applications || searchResults.applications.length === 0}>Delete
                                    All</Button>
                            </ControlGroup>
                            <ControlGroup label={'Execute Commands'} labelPosition={'top'}
                                          help={'Execute generating commands and display results.'}>
                                <Button
                                    onClick={executeQueryInTable('| radwarecwaflistremote | table id,workflowName,tenantId', 'listRemote')}>radwarecwaflistremote</Button>
                                <Button
                                    onClick={executeQueryInTable('| radwarecwafimportremote', 'importRemote')}>radwarecwafimportremote</Button>

                            </ControlGroup>
                            {(activeSearch) ?
                                <SearchResultTableComponent searchQuery={searchQuery}
                                                            searchTime={searchTime}
                                                            resultsCallback={updateSearchResultsCallback(activeSearch)}/> : null}
                        </Card.Body>
                    </Card>
                </StyledCard>
            </ColumnLayout.Column>
        </ColumnLayout.Row>
    </ColumnLayout>)
}

export default ManageObjectsPanel
