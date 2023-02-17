import {createContext} from "react"
import AppConfigService from "./services/AppConfigService"
import MockConfigService from "./services/MockConfigService"


const RadwareEnrichmentContext = createContext({
    handleError: () => {
    }, createToast: () => {
    }, configService: new AppConfigService(new MockConfigService())
})

export {RadwareEnrichmentContext}
