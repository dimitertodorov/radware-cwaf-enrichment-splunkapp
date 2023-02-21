import React, {useEffect, useState} from 'react'
import Markdown from '@splunk/react-ui/Markdown'

const DocumentationPanel = ({readmePath = '/static/app/radware_cwaf_enrichment/README.md'}) => {
    const [markdownContent, setMarkdownContent] = useState('### Loading...')
    useEffect(() => {
        fetch(readmePath)
            .then(response => response.text())
            .then(text => setMarkdownContent(text))
    }, [readmePath])
    return (
        <Markdown text={markdownContent}/>
    )
}

export default DocumentationPanel
