import { parseRawProperties } from './AppConfigHelper';

class AppConfigService {
    constructor(configDataService) {
        this.config = {};
        this.configDataService = configDataService;
    }

    getConfig = async () => {
        return this.configDataService
            .getConfig()
            .then((config) => {
                return Promise.resolve(parseRawProperties(config));
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    };

    updateSettings = async (settings) => {
        if (Array.isArray(settings.object_list)) {
            settings.object_list = settings.object_list.join(',');
        }
        return this.configDataService.updateSettings(settings);
    };

    addOrUpdateCredential = async (credential, credentialIndex = 'new') => {
        return this.configDataService.addOrUpdateCredential(credential, credentialIndex);
    };

    deleteCredential = async (credentialIndex) => {
        return this.configDataService.deleteCredential(credentialIndex);
    };
}

export default AppConfigService;
