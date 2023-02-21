import React, {useEffect, useState} from 'react'
import Paginator from "@splunk/react-ui/Paginator"
import Table from "@splunk/react-ui/Table"
import SearchJob from "@splunk/search-job"
import WaitSpinner from "@splunk/react-ui/WaitSpinner"
import isEqual from "lodash/isEqual"

const SearchResultTableComponent = ({
                                        pageSize = 25,
                                        searchQuery = undefined,
                                        searchTime = Date.now(),
                                        resultsCallback = undefined
                                    }) => {

    const [pageNum, setPageNum] = useState(1)
    const [tableData, setTableData] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [lastSearchTime, setLastSearchTime] = useState(searchTime)
    let lookupJob;

    useEffect(() => {
        let freshSearch
        if (searchQuery && tableData && !isEqual(searchQuery, tableData.searchQuery)) {
            setTableData(undefined)
            freshSearch = true
        } else if (searchTime > lastSearchTime) {
            freshSearch = true
            setTableData(undefined)
            setLastSearchTime(searchTime)
        }else freshSearch = !!(searchQuery && !tableData)

        if (searchQuery && freshSearch) {
            setLoading(true)
            lookupJob = SearchJob.create(searchQuery, {cache: false, keepAlive: false})
            lookupJob.getResults().subscribe((results) => {
                setTableData({...results, searchQuery: {...searchQuery}})
                setLoading(false)
                if (resultsCallback) {
                    resultsCallback(results)
                }
            })
        }
    }, [searchQuery, searchTime])

    useEffect(() => {
        return () => {
            if (lookupJob) {
                lookupJob.cancel()
            }
        }
    }, [])


    const handleChange = (event, {page}) => {
        setPageNum(page)
    }

    const getTotalPages = () => {
        if (tableData.columns && tableData.columns.length > 0) {
            return Math.ceil(tableData.columns[0].length / pageSize)
        } else if (tableData.results && tableData.results.length > 0) {
            return Math.ceil(tableData.results.length / pageSize)
        }
        return 0
    }

    const getTableRows = () => {
        let startIndex = (pageNum - 1) * pageSize
        let endIndex = pageNum * pageSize
        let rows = []
        if (tableData.results && tableData.results.length > 0) {
            tableData.results.slice(startIndex, endIndex).forEach((row, rowIndex) => {
                rows.push((<Table.Row key={`row-${rowIndex}`}>
                    {tableData.fields.map((field, fieldIndex) => (
                        <Table.Cell key={`cell-${rowIndex}-${fieldIndex}`}>{row[field.name]}</Table.Cell>))}
                </Table.Row>))
            })
        } else if (tableData.columns && tableData.columns.length > 0) {
            for (let i = startIndex; i <= endIndex; i++) {
                rows.push(<Table.Row key={"tabledata-" + i}>
                    {tableData.fields.map((field, idx) => (
                        <Table.Cell key={`cell-${idx}-${i}`}>{tableData.columns[idx][i]}</Table.Cell>))}
                </Table.Row>)
            }
        }
        return rows
    }

    const getSearchMessage = () => {
        if (loading) {
            return (
                <div><WaitSpinner size={'medium'}/> Loading... {JSON.stringify(searchQuery)}</div>
            )
        }
        if (!tableData) {
            return (
                <div>No Results </div>
            )
        }
        if (tableData.messages && tableData.messages.length > 0) {
            return tableData.messages.map((message, idx) => {
                return (<div key={`search-${idx}`}>{JSON.stringify(message)}</div>)
            })
        }
    }

    return (<div>
        {(tableData && tableData.fields) ?
            <div><Table stripeRows={true}>
                <Table.Head>
                    {tableData.fields.map((row) => (
                        <Table.HeadCell key={`header-${row.name}`}>{row.name}</Table.HeadCell>))}
                </Table.Head>
                <Table.Body>
                    {getTableRows()}
                </Table.Body>
            </Table>
                <Paginator
                    onChange={handleChange}
                    current={pageNum}
                    alwaysShowLastPageLink
                    totalPages={getTotalPages()}
                /></div>
            : null}
        <div>{getSearchMessage()}</div>
    </div>)
}

export default SearchResultTableComponent
