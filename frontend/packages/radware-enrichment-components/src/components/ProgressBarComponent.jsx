import React, {useEffect, useState} from 'react'
import Progress from '@splunk/react-ui/Progress'
import PropTypes from "prop-types"

const ProgressBarComponent = ({timeToComplete}) => {
    const [percentage, setPercentage] = useState(0)
    const increment = 100 / (timeToComplete / 200)
    useEffect(() => {
        const timer = window.setInterval(() => {
            setPercentage((currentPercentage) => {
                if (currentPercentage >= 100) {
                    return 0
                }
                return currentPercentage + increment
            })
        }, 200)
        return () => {
            window.clearInterval(timer)
        }
    }, [])

    return (<Progress percentage={percentage} tooltip="Loading..."/>)
}

ProgressBarComponent.propTypes = {
    timeToComplete: PropTypes.number.isRequired
}

export default ProgressBarComponent
