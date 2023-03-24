import { parseConfig } from './AppConfigHelper';

class MockConfigService {
    constructor() {
        this.props = {
            links: {},
            origin: 'https://lvh.me:8089/services/properties/radware_cwaf_enrichment/settings',
            updated: '2023-02-13T12:48:59-05:00',
            generator: {
                build: 'dd0128b1f8cd',
                version: '9.0.3',
            },
            entry: [
                {
                    name: 'credential.1.name',
                    id: 'https://lvh.me:8089/services/properties/radware_cwaf_enrichment/settings/credential.1.name',
                    updated: '1969-12-31T19:00:00-05:00',
                    links: {
                        alternate:
                            '/services/properties/radware_cwaf_enrichment/settings/credential.1.name',
                    },
                    content: 'aaa',
                },
                {
                    name: 'credential.1.password',
                    id: 'https://lvh.me:8089/services/properties/radware_cwaf_enrichment/settings/credential.1.password',
                    updated: '1969-12-31T19:00:00-05:00',
                    links: {
                        alternate:
                            '/services/properties/radware_cwaf_enrichment/settings/credential.1.password',
                    },
                    content: 'credential-1-password:mock_aaa:',
                },
                {
                    name: 'credential.1.password_set',
                    id: 'https://lvh.me:8089/services/properties/radware_cwaf_enrichment/settings/credential.1.password_set',
                    updated: '1969-12-31T19:00:00-05:00',
                    links: {
                        alternate:
                            '/services/properties/radware_cwaf_enrichment/settings/credential.1.password_set',
                    },
                    content: '1',
                },
                {
                    name: 'credential.1.tenant_id',
                    id: 'https://lvh.me:8089/services/properties/radware_cwaf_enrichment/settings/credential.1.tenant_id',
                    updated: '1969-12-31T19:00:00-05:00',
                    links: {
                        alternate:
                            '/services/properties/radware_cwaf_enrichment/settings/credential.1.tenant_id',
                    },
                    content: 'mock-c123-43fc-8e17-5bd17e5c8964',
                },
                {
                    name: 'credential.1.username',
                    id: 'https://lvh.me:8089/services/properties/radware_cwaf_enrichment/settings/credential.1.username',
                    updated: '1969-12-31T19:00:00-05:00',
                    links: {
                        alternate:
                            '/services/properties/radware_cwaf_enrichment/settings/credential.1.username',
                    },
                    content: 'mock_aaa',
                },
                {
                    name: 'credential.2.name',
                    id: 'https://lvh.me:8089/services/properties/radware_cwaf_enrichment/settings/credential.2.name',
                    updated: '1969-12-31T19:00:00-05:00',
                    links: {
                        alternate:
                            '/services/properties/radware_cwaf_enrichment/settings/credential.2.name',
                    },
                    content: 'prod2',
                },
                {
                    name: 'credential.2.password',
                    id: 'https://lvh.me:8089/services/properties/radware_cwaf_enrichment/settings/credential.2.password',
                    updated: '1969-12-31T19:00:00-05:00',
                    links: {
                        alternate:
                            '/services/properties/radware_cwaf_enrichment/settings/credential.2.password',
                    },
                    content: 'credential-2-password:mock_user2:',
                },
                {
                    name: 'credential.2.password_set',
                    id: 'https://lvh.me:8089/services/properties/radware_cwaf_enrichment/settings/credential.2.password_set',
                    updated: '1969-12-31T19:00:00-05:00',
                    links: {
                        alternate:
                            '/services/properties/radware_cwaf_enrichment/settings/credential.2.password_set',
                    },
                    content: '1',
                },
                {
                    name: 'credential.2.tenant_id',
                    id: 'https://lvh.me:8089/services/properties/radware_cwaf_enrichment/settings/credential.2.tenant_id',
                    updated: '1969-12-31T19:00:00-05:00',
                    links: {
                        alternate:
                            '/services/properties/radware_cwaf_enrichment/settings/credential.2.tenant_id',
                    },
                    content: '21ebdace-c354-43fc-8e17-5bd17e5c8964',
                },
                {
                    name: 'credential.2.username',
                    id: 'https://lvh.me:8089/services/properties/radware_cwaf_enrichment/settings/credential.2.username',
                    updated: '1969-12-31T19:00:00-05:00',
                    links: {
                        alternate:
                            '/services/properties/radware_cwaf_enrichment/settings/credential.2.username',
                    },
                    content: 'mock_user2',
                },
                {
                    name: 'log_level',
                    id: 'https://lvh.me:8089/services/properties/radware_cwaf_enrichment/settings/log_level',
                    updated: '1969-12-31T19:00:00-05:00',
                    links: {
                        alternate:
                            '/services/properties/radware_cwaf_enrichment/settings/log_level',
                    },
                    content: 'INFO',
                },
                {
                    name: 'object_list',
                    id: 'https://lvh.me:8089/services/properties/radware_cwaf_enrichment/settings/object_list',
                    updated: '1969-12-31T19:00:00-05:00',
                    links: {
                        alternate:
                            '/services/properties/radware_cwaf_enrichment/settings/object_list',
                    },
                    content: 'applications,other,users',
                },
                {
                    name: 'proxy_host',
                    id: 'https://lvh.me:8089/services/properties/radware_cwaf_enrichment/settings/proxy_host',
                    updated: '1969-12-31T19:00:00-05:00',
                    links: {
                        alternate:
                            '/services/properties/radware_cwaf_enrichment/settings/proxy_host',
                    },
                    content: '127.0.0.1',
                },
                {
                    name: 'proxy_port',
                    id: 'https://lvh.me:8089/services/properties/radware_cwaf_enrichment/settings/proxy_port',
                    updated: '1969-12-31T19:00:00-05:00',
                    links: {
                        alternate:
                            '/services/properties/radware_cwaf_enrichment/settings/proxy_port',
                    },
                    content: '8080',
                },
                {
                    name: 'use_proxy',
                    id: 'https://lvh.me:8089/services/properties/radware_cwaf_enrichment/settings/use_proxy',
                    updated: '1969-12-31T19:00:00-05:00',
                    links: {
                        alternate:
                            '/services/properties/radware_cwaf_enrichment/settings/use_proxy',
                    },
                    content: '0',
                },
            ],
        };

        this.config = {
            links: {},
            origin: 'https://lvh.me:8089/servicesNS/nobody/radware_cwaf_enrichment/radware_cwaf_enrichment/radware_cwaf_enrichment_config',
            updated: '2023-02-13T12:53:27-05:00',
            generator: {
                build: 'dd0128b1f8cd',
                version: '9.0.3',
            },
            entry: [
                {
                    name: 'settings',
                    id: 'https://lvh.me:8089/servicesNS/nobody/radware_cwaf_enrichment/radware_cwaf_enrichment/radware_cwaf_enrichment_config/settings',
                    updated: '1969-12-31T19:00:00-05:00',
                    links: {
                        alternate:
                            '/servicesNS/nobody/radware_cwaf_enrichment/radware_cwaf_enrichment/radware_cwaf_enrichment_config/settings',
                        list: '/servicesNS/nobody/radware_cwaf_enrichment/radware_cwaf_enrichment/radware_cwaf_enrichment_config/settings',
                        edit: '/servicesNS/nobody/radware_cwaf_enrichment/radware_cwaf_enrichment/radware_cwaf_enrichment_config/settings',
                    },
                    author: 'system',
                    acl: {
                        app: '',
                        can_list: true,
                        can_write: true,
                        modifiable: false,
                        owner: 'system',
                        perms: {
                            read: ['*'],
                            write: ['*'],
                        },
                        removable: false,
                        sharing: 'system',
                    },
                    fields: {
                        required: [],
                        optional: [
                            'log_level',
                            'object_list',
                            'proxy_host',
                            'proxy_password',
                            'proxy_port',
                            'proxy_user',
                            'use_proxy',
                        ],
                        wildcard: [
                            'credential\\..*\\.action',
                            'credential\\..*\\.id',
                            'credential\\..*\\.meta',
                            'credential\\..*\\.name',
                            'credential\\..*\\.password',
                            'credential\\..*\\.password_set',
                            'credential\\..*\\.tenant_id',
                            'credential\\..*\\.username',
                        ],
                    },
                    content: {
                        'credential.1.name': 'aaa',
                        'credential.1.password': 'credential-1-password:mock_aaa:',
                        'credential.1.password_set': '1',
                        'credential.1.tenant_id': 'mock-c123-43fc-8e17-5bd17e5c8964',
                        'credential.1.username': 'mock_aaa',
                        'credential.2.name': 'prod2',
                        'credential.2.password': 'credential-2-password:mock_user2:',
                        'credential.2.password_set': '1',
                        'credential.2.tenant_id': '21ebdace-c354-43fc-8e17-5bd17e5c8964',
                        'credential.2.username': 'mock_user2',
                        'eai:acl': null,
                        log_level: 'INFO',
                        object_list: 'applications,other,users',
                        proxy_host: '127.0.0.1',
                        proxy_port: '8080',
                        use_proxy: '0',
                    },
                },
            ],
            paging: {
                total: 1,
                perPage: 30,
                offset: 0,
            },
            messages: [],
        };

        this.debugOptions = {
            sendError: false,
            sendEmpty: false,
            returnResponse: {},
        };
    }

    // sleep time expects milliseconds
    sleep = async (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };

    getConfig = async () => {
        return this.sleep(300).then(() => {
            return new Promise((resolve) => resolve(this.props));
        });
    };

    getFetchConfig = () => {
        return {};
    };

    updateSettings = async (settings) => {
        const config = parseConfig(this.config);
        config.settings = { ...config.settings, ...settings };
        this.config.entry[0].content = { ...this.config.entry[0].content, ...settings };
        console.log('MOCK updateSettings', config.settings);

        return Promise.resolve(parseConfig(this.config));
    };

    deleteCredential = async (credential_index) => {
        const config = parseConfig(this.config);
        delete config.credentials[credential_index];
        const configContent = this.config.entry[0].content;
        for (const key in configContent) {
            if (key.startsWith(`credential.${credential_index}`)) {
                delete configContent[key];
            }
        }
        this.config.entry[0].content = configContent;
        return Promise.resolve({ ...config.credentials });
    };

    addOrUpdateCredential = async (credential, credential_index = 'new') => {
        const updateCred = { ...credential };
        delete updateCred.password_confirm;
        updateCred.name = updateCred.credential_name;
        delete updateCred.credential_name;
        let config = parseConfig(this.config);
        const existingIndexes = Object.keys(config.credentials).sort();
        const nextIndex =
            existingIndexes.length > 0
                ? parseInt(existingIndexes[existingIndexes.length - 1]) + 1
                : 1;

        if (credential_index !== 'new') {
            updateCred.action = 'update';
            config = {
                ...config,
                credentials: { ...config.credentials, [credential_index]: updateCred },
            };
        } else {
            updateCred.action = 'create';
            credential_index = nextIndex;
            config = {
                ...config,
                credentials: { ...config.credentials, [credential_index]: updateCred },
            };
        }
        return Promise.resolve({ ...config.credentials });
    };
}

export default MockConfigService;
