import React from 'react'

const ActionPanel = ({searchQuery}) => {
    const [defState, setDefState] = React.useState({})
    const [currentQuery, setCurrentQuery] = React.useState(searchQuery)

    const definition = {
        dataSources: {
            radwareCommandDs: {
                options: {
                    context: {
                        cache: true
                    },
                    query: '',
                }, type: 'ds.search',
            }
        }, visualizations: {
            table: {
                type: 'splunk.table', title: 'Action Results', description: 'Results', options: {
                    count: 50,
                }, dataSources: {
                    primary: 'radwareCommandDs'
                }
            }
        }, layout: {
            type: 'grid', options: {
                submitButton: true
            }, structure: [{
                item: 'table', position: {
                    x: 0, y: 0, w: 1000, h: 500,
                },
            }],

        },
    }

    React.useEffect(() => {
        setCurrentQuery(searchQuery)
        definition.dataSources.radwareCommandDs.options.query = searchQuery
        setDefState(definition)
    }, [searchQuery])

    return (<div>


    </div>)
}

export default ActionPanel
