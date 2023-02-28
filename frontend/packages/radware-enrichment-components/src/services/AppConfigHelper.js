// Convert credentials from complex object to flat params.
// Example:
// {
//     "0": {
//         "name": "credential1",
//         "username": "user1",
//         "password": "password1",
//         "tenant_id": "tenant1"
//     },
// }
// =>
// {
//     "credential.0.name": "credential1",
//     "credential.0.username": "user1",
//     "credential.0.password": "password1",
//     "credential.0.tenant_id": "tenant1"
// }
const convertCredentials = (credentials) => {
    const readOnlyKeys = ['id', 'password_set'];
    const flattenedCredentials = {};
    Object.keys(credentials).forEach((idx, _) => {
        Object.keys(credentials[idx]).forEach((fieldName, _) => {
            if (!readOnlyKeys.includes(fieldName)) {
                flattenedCredentials[`credential.${idx}.${fieldName}`] =
                    credentials[idx][fieldName];
            }
        });
    });
    return flattenedCredentials;
};

// Convert flat config from Splunk app.conf results to a tree of settings and credentials
// Example:
// {
//     "credential.0.name": "credential1",
//     "credential.0.username": "user1",
//     "credential.0.password": "password1",
//     "credential.0.tenant_id": "tenant1",
//     "object_list": "object1,object2"
// }
// =>
// {
//     "credentials": {
//         "0": {
//             "name": "credential1",
//             "username": "user1",
//             "password": "password1",
//             "tenant_id": "tenant1"
//         },
//     },
//     "settings": {
//         "object_list": "object1,object2"
//     }
// }
const parseConfig = (configResponse) => {
    const { content } = configResponse.entry[0];
    const outputCredentials = {};
    const outputSettings = {};
    const credentialRegex = /(?<prefix>.*)\.(?<idx>[0-9]+|new)\.(?<suffix>.*)/;
    Object.keys(content).forEach((configKey, _) => {
        const match = credentialRegex.exec(configKey);
        if (match) {
            const { _, idx, suffix } = match.groups;
            if (!outputCredentials[idx]) {
                outputCredentials[idx] = {};
            }
            outputCredentials[idx][suffix] = content[configKey].toString();
            outputCredentials[idx].state = 'exists';
        } else if (configKey === 'object_list') {
            outputSettings[configKey] = content[configKey].split(',').sort();
        } else if (configKey === 'disabled' || configKey === 'use_proxy') {
            outputSettings[configKey] = parseInt(content[configKey]);
        } else {
            outputSettings[configKey] = content[configKey];
        }
    });
    return { credentials: outputCredentials, settings: outputSettings };
};

const parseRawProperties = (rawProperties) => {
    const configContent = {};
    rawProperties.entry.forEach((entry, _) => {
        configContent[entry.name] = entry.content;
    });
    return parseConfig({ entry: [{ content: configContent }] });
};

export { parseConfig, parseRawProperties, convertCredentials };
