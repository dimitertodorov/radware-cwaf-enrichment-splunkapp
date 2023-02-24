import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import { StyledCard } from './ComponentStyles';
import Card from '@splunk/react-ui/Card';
import React, { useState } from 'react';
import Button from '@splunk/react-ui/Button';
import ControlGroup from '@splunk/react-ui/ControlGroup';
import SearchResultTableComponent from './SearchResultTableComponent';

const { Sema } = require('async-sema');

const ManageObjectsPanel = () => {
    const lookupQuery =
        '| inputlookup radware_cwaf_applications_lookup | table id,workflowName,monitoringStatus,_key';

    const [activeSearch, setActiveSearch] = useState(undefined);
    const [searchQuery, setSearchQuery] = useState(undefined);
    const [searchTime, setSearchTime] = useState(Date.now());

    const executeQueryInTable = (query, resultsKey) => {
        return () => {
            setSearchTime(Date.now());
            setActiveSearch(resultsKey);
            setSearchQuery({ search: query });
        };
    };

    return (
        <ColumnLayout>
            <ColumnLayout.Row>
                <ColumnLayout.Column span={6}>
                    <StyledCard>
                        <Card className={'setup-card'}>
                            <Card.Header title={'Actions'} align={'right'} />
                            <Card.Body>
                                <ControlGroup
                                    label={'KV Actions'}
                                    labelPosition={'top'}
                                    help={'Execute KV actions in context of the current user'}
                                >
                                    <Button
                                        onClick={executeQueryInTable(lookupQuery, 'applications')}
                                    >
                                        Execute Lookup
                                    </Button>
                                    <Button
                                        onClick={executeQueryInTable(
                                            '| radwarecwafdeletelocal',
                                            'applications'
                                        )}
                                    >
                                        Delete Local KV Entries
                                    </Button>
                                </ControlGroup>
                                <ControlGroup
                                    label={'Execute Commands'}
                                    labelPosition={'top'}
                                    help={'Execute generating commands and display results.'}
                                >
                                    <Button
                                        onClick={executeQueryInTable(
                                            '| radwarecwaflistremote | table id,workflowName,tenantId',
                                            'listRemote'
                                        )}
                                    >
                                        radwarecwaflistremote
                                    </Button>
                                    <Button
                                        onClick={executeQueryInTable(
                                            '| radwarecwafimportremote',
                                            'importRemote'
                                        )}
                                    >
                                        radwarecwafimportremote
                                    </Button>
                                </ControlGroup>
                                {activeSearch ? (
                                    <SearchResultTableComponent
                                        searchQuery={searchQuery}
                                        searchTime={searchTime}
                                    />
                                ) : null}
                            </Card.Body>
                        </Card>
                    </StyledCard>
                </ColumnLayout.Column>
            </ColumnLayout.Row>
        </ColumnLayout>
    );
};

export default ManageObjectsPanel;
