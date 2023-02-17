class RadwareJsonService {
    constructor() {
        this.sampleJson = {
            "number": 0,
            "size": 35,
            "totalPages": 1,
            "numberOfElements": 28,
            "totalElements": 28,
            "previousPage": false,
            "first": true,
            "nextPage": false,
            "last": true,
            "content": [{
                "id": "f28787c6-fe2f-4709-ae94-e0f4ed4856dc",
                "name": "rad-ist-0003-svc-edcs-0000",
                "deploymentStatus": "PROTECTING",
                "isCustomDeployment": false,
                "frontend": "alcon",
                "hstsEnabled": true,
                "http2Enabled": true,
                "ipv6Enabled": false,
                "ssrfEnabled": true,
                "awBypassEnabled": false,
                "antibotEnabled": true,
                "geoBlockingEnabled": true,
                "workflowName": "someist0003svc.rad_ist_0003_svc_edcs_0000",
                "hstsAge": 31536000,
                "mux": true,
                "gzipCompressionPolicy": {
                    "gzipProxied": "OFF", "gzipVaryEnable": false
                },
                "bigFileConfiguration": {
                    "fileSize": 1048576, "enabled": false
                },
                "monitoringStatus": "MONITORING_AND_ALERT",
                "azureDdosEnabled": false,
                "advancedRulesEnabled": true,
                "advancedRulesReportingEnabled": true,
                "apiProtectionEnabled": false,
                "apiDiscoveryEnabled": false,
                "apiProtectionRefinementEnabled": false,
                "apiProtectionCaseSensitivePreflightEnabled": false,
                "showArecord": false,
                "showCnameRecord": true,
                "showOrigins": true,
                "generalInfo": {
                    "ownerName": "Bob McDonald",
                    "ownerEmail": "bob.mcdonald@ontario.ca",
                    "externalID": "EXT_ID59642",
                    "description": "SOME MCKB EDCS PPE"
                },
                "originLatencyEnabled": false,
                "attackersFeedEnabled": false,
                "internalConfiguration": {
                    "wafInternalConfiguration": {
                        "tunnelConfiguration": {
                            "tunnels": ["someist0003svc_rad_ist_0003_svc_edcs_0000_HTTPS", "someist0003svc_rad_ist_0003_svc_edcs_0000_HTTP"]
                        }
                    }, "ddosInternalConfiguration": null
                },
                "featuresData": {
                    "wafFeatureData": {
                        "dns": {
                            "dnsRecords": [{
                                "type": "A", "value": "N/A"
                            }, {
                                "type": "CNAME", "value": "f28787c6fe2f4709ae94e0f4ed4856dc.1.radaremock.netcloud.net"
                            }]
                        }, "oopDns": null, "operationMode": {
                            "mode": "LOAD_BALANCE", "failoverMode": null, "loadBalanceMode": {
                                "serverAddresses": [{
                                    "addressType": "IP", "address": "204.41.1.207"
                                }], "loadBalanceMetric": "ROUND_ROBIN", "protocol": null
                            }
                        }, "mainDomain": {
                            "mainDomain": "stage2.example.com"
                        }, "ipRange": ["66.22.26.68"], "sourceIpHeader": null, "accessRules": {
                            "accessRules": []
                        }, "accessControlList": {
                            "accessControlListItems": [],
                            "defaultOperation": "PERMIT",
                            "mode": "ENABLE",
                            "reported": false
                        }, "securityPolicy": {
                            "protectionMode": "IMMEDIATE", "technology": "BASIC"
                        }, "region": "CANADA_1", "blockPage": {
                            "url": null
                        }, "protectionConfiguration": {
                            "allowedFileExtensionProtection": {
                                "protectionStatus": "ACTIVE", "allowList": {
                                    "allowListItems": [{
                                        "uri": "*.woff", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "/", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.xml", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.jpg", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.htm", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.csv", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.gif", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.doc", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.eot", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.xsl", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.pdf", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.pptx", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.xml", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.js", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "/", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.do", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.nghtml", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.doc", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.asp", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.swf", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.bmp", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.jsp", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.css", "method": "OPTIONS", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.axd", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.mp4", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.docx", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.no-extension", "method": "HEAD", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.no-extension", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.svg", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.wmv", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.js", "method": "OPTIONS", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.asp", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.aspx", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.no-extension", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.aspx", "method": "PUT", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.php", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.jpg", "method": "OPTIONS", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.ppt", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.php", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.mp3", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.tif", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.gif", "method": "OPTIONS", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.aspx", "method": "HEAD", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.flv", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.png", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.shtml", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.ico", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.no-extension", "method": "PUT", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.jsp", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.zip", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "/obrar.cgi", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.woff2", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.html", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.docx", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.jpeg", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.json", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.css", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.png", "method": "OPTIONS", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.xlsx", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.aspx", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.xls", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.ttf", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.json", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.ico", "method": "OPTIONS", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.ashx", "method": "GET", "acceptable": true, "regex": false
                                    }]
                                }
                            }, "knownAttackTypesProtection": {
                                "protectionStatus": "PASSIVE"
                            }, "httpProtocolComplianceProtection": {
                                "protectionStatus": "ACTIVE"
                            }, "ddosProtection": {
                                "protectionStatus": "ACTIVE"
                            }, "ipReputationProtection": {
                                "protectionStatus": "ACTIVE"
                            }, "vulnerabilityProtection": {
                                "protectionStatus": "ACTIVE", "vulnerabilityList": {
                                    "vulnerabilityItems": [{
                                        "ruleId": "9302",
                                        "pattern": "/administration/",
                                        "details": "Attempt to access a sensitive location"
                                    }, {
                                        "ruleId": "10454",
                                        "pattern": "egrep",
                                        "details": "There was an attempt to retrieve Unix sensitive files."
                                    }, {
                                        "ruleId": "9333",
                                        "pattern": "/configuration/",
                                        "details": "Attempt to access a sensitive location"
                                    }, {
                                        "ruleId": "9300",
                                        "pattern": "/sql/",
                                        "details": "Attempt to access administrative location"
                                    }, {
                                        "ruleId": "6904",
                                        "pattern": "N/A",
                                        "details": "Four subsequent opening parentheses, this may be an attempt to execute code on the server."
                                    }, {
                                        "ruleId": "9359",
                                        "pattern": "/libs/",
                                        "details": "Attempt to access a sensitive location"
                                    }, {
                                        "ruleId": "9794",
                                        "pattern": "%253Cscript",
                                        "details": "Blocking of Cross Site Scripting (XSS)"
                                    }, {
                                        "ruleId": "10468",
                                        "pattern": "N/A",
                                        "details": "PHPMailer Remote Code Execution CVE-2016-10033"
                                    }, {
                                        "ruleId": "9281",
                                        "pattern": "/admin/",
                                        "details": "Attempt to access administrative location"
                                    }, {
                                        "ruleId": "9229",
                                        "pattern": "+++++++",
                                        "details": "Fuzzer: HTTP GET Request Invalid URI (Encoded)"
                                    }, {
                                        "ruleId": "11444",
                                        "pattern": "c:\\users",
                                        "details": "Attempt to access a sensitive location on windows OS"
                                    }, {
                                        "ruleId": "10487",
                                        "pattern": "%25[0-9a-f][0-9a-f]",
                                        "details": "Double Encoding was detected"
                                    }, {
                                        "ruleId": "11373",
                                        "pattern": "\\x0d\\x0a",
                                        "details": "Response Splitting attack"
                                    }, {
                                        "ruleId": "8001",
                                        "pattern": "/../",
                                        "details": "An attempt to performed a Path Traversal attack on web server's directory structure was intercepted."
                                    }, {
                                        "ruleId": "10120",
                                        "pattern": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                        "details": "Buffer Overflow Attack Attempt"
                                    }]
                                }
                            }, "databaseProtection": {
                                "protectionStatus": "ACTIVE", "databaseProtectionList": {
                                    "databaseProtectionItems": [{
                                        "page": "All Pages",
                                        "parameter": "json.entities.[0-9]+.VisibilityExpression",
                                        "ruleIds": ["ATCOCO", "ATAOCO", "ATABRA"],
                                        "regex": true,
                                        "discardAllRules": false
                                    }, {
                                        "page": "All Pages",
                                        "parameter": ".*[P|p]assword|.*[P|p]asswrd|.*[P|p]wd",
                                        "ruleIds": ["FSPA01", "ATPANP", "FSPA02"],
                                        "regex": true,
                                        "discardAllRules": false
                                    }, {
                                        "page": "All Pages",
                                        "parameter": "__RequestVerificationToken",
                                        "ruleIds": ["S3STPR"],
                                        "regex": false,
                                        "discardAllRules": false
                                    }, {
                                        "page": "All Pages",
                                        "parameter": "json.ProgramTitle",
                                        "ruleIds": ["ATAORN"],
                                        "regex": false,
                                        "discardAllRules": false
                                    }]
                                }
                            }, "antibotProtection": {
                                "protectionStatus": "ACTIVE",
                                "enable": false,
                                "customCaptchaPage": null,
                                "whitelistedIpList": null,
                                "badBotResponse": null,
                                "legitimateBotResponse": null,
                                "siteExternalId": 0
                            }, "ssrfProtection": {
                                "protectionStatus": "DISABLE", "ssrfProtectionLists": {
                                    "ssrfProtectionTrustedHosts": [], "ssrfProtectionExcludedURIs": []
                                }
                            }
                        }
                    }, "ddosFeatureData": {
                        "dpipeAssetId": null, "dpPolicyName": null
                    }
                },
                "creationDate": 1639408567347,
                "compressionEnabled": true,
                "xrdwripAllowed": false,
                "rateLimitEnabled": false,
                "rateLimitMaxRules": 5,
                "cspEnabled": false,
                "applicationSecuritySettings": {
                    "cipherSuite": {
                        "name": "High",
                        "ciphers": ["ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256"],
                        "defaultSet": true,
                        "systemSet": true
                    }, "useDefaultCipherSuite": true, "securityProtocolSet": {
                        "ssl30": false,
                        "tls10": false,
                        "tls11": false,
                        "tls12": true,
                        "tls13": true,
                        "defaultSet": false
                    }, "useDefaultProtocolSet": false
                },
                "ipSourceAffinitySettings": {
                    "ipAffinityEnabled": false
                },
                "ipPersistencySettings": {
                    "ipPersistencyEnabled": false
                },
                "featureStates": {
                    "AccessControlList": true, "Protections": true, "AccessRules": true
                },
                "certificate": {
                    "id": "0b2ae1a4-7085-46f5-bfd6-11d212c4796e",
                    "fingerprint": "B1C492D040911D85D161E489EA7D5BCBC0FA5A00",
                    "issuer": "CN=Entrust Certification Authority - L1K,OU=(c) 2012 Entrust\\, Inc. - for authorized use only,OU=See www.entrust.net/legal-terms,O=Entrust\\, Inc.,C=US",
                    "validFrom": 1652297462000,
                    "validTo": 1685129461000,
                    "certificateChain": "CN=stage2.example.com,OU=SomeOrg,O=SomeOrg,L=Toronto,ST=Ontario,C=CA;CN=Entrust Certification Authority - L1K,OU=(c) 2012 Entrust\\, Inc. - for authorized use only,OU=See www.entrust.net/legal-terms,O=Entrust\\, Inc.,C=US;CN=Entrust Root Certification Authority - G2,OU=(c) 2009 Entrust\\, Inc. - for authorized use only,OU=See www.entrust.net/legal-terms,O=Entrust\\, Inc.,C=US",
                    "protectedDomains": "stage2.example.com;stage2.example.com;www.stage2.example.com",
                    "keySize": "2048",
                    "email": null,
                    "creationDate": 1652382542430,
                    "applications": [{
                        "applicationUUID": "f28787c6-fe2f-4709-ae94-e0f4ed4856dc",
                        "applicationName": "rad-ist-0003-svc-edcs-0000"
                    }],
                    "nextLocks": [],
                    "previousLocks": [],
                    "certificateType": "REGULAR",
                    "certificateKind": "server",
                    "whiteLabelConfiguration": null,
                    "customerAccount": null,
                    "synchronized": true,
                    "caCertificate": false
                },
                "mtlsCertificate": null,
                "geoBlocking": {
                    "excludedIps": [],
                    "countries": ["AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"],
                    "geoBlockingMode": "BLOCK_AND_REPORT"
                },
                "geoBlockingPolicy": null,
                "alconMetric": "ROUND_ROBIN",
                "alconAccessLogConfiguration": {
                    "enabled": false,
                    "format": "$x_rdwr_ip_value - $remote_user [$time_local] $server_addr $server_port \"$http_host\" \"$request\" $status $body_bytes_sent \"$http_referrer\" \"$http_user_agent\""
                },
                "advancedRules": {
                    "rulesLimit": 3, "redirectRules": [], "securityRules": [], "deliveryRules": [{
                        "id": 101,
                        "order": 1,
                        "name": "Radware Auth Header",
                        "enabled": true,
                        "readOnly": false,
                        "description": "Add header for backend to verify request originated with Radware.",
                        "lastChanged": 1660575193167,
                        "trigger": {
                            "conditions": [{
                                "conditionType": "IP", "operator": "CONTAINS", "ips": ["0.0.0.0/0"]
                            }], "operator": "AND"
                        },
                        "action": {
                            "type": "REWRITE_HEADER",
                            "headerName": "Radware-Auth",
                            "toHeader": "e1290619-543f-4e36-a9e0-b926284988b3",
                            "addIfMissing": true
                        }
                    }], "responseDeliveryRules": [], "index": 101
                },
                "attackersFeed": {
                    "excludedIps": [], "attackersFeedMode": "DISABLE"
                },
                "jsonParsing": {
                    "jsonParsingMode": "ACTIVE", "excludedUris": []
                },
                "rateLimit": {
                    "rateLimitSiteWide": {
                        "id": "eaf6d4dc-4cb6-48ab-9a8c-800c930f7e8a",
                        "enable": false,
                        "durationType": "MIN",
                        "blockingPeriod": 1,
                        "threshold": 500
                    }, "rateLimitMode": "DISABLE", "rateLimitRules": [], "rateLimitExcludes": []
                },
                "alconPopConfigurationContexts": [{
                    "popName": "YYZ", "disabled": false
                }, {
                    "popName": "ASH_YYZ", "disabled": false
                }],
                "applicationServices": [{
                    "id": "583b78ef-6f9f-4f63-a641-4afe6279f932",
                    "frontPort": 443,
                    "backPort": 443,
                    "type": "HTTPS",
                    "description": null,
                    "enabled": true
                }],
                "healthChecks": [{
                    "id": "dbc9bb96-299d-4ad4-a5e2-bf497f519573",
                    "type": "HTTPS",
                    "port": 443,
                    "hostname": "stage2.example.com",
                    "url": "/",
                    "responseCode": 302
                }],
                "redirect": {
                    "id": "1dac742e-dcd3-4570-b415-0217a72e63ba", "targetPort": 443, "responseCode": 302
                },
                "readOnly": false,
                "ntlmEnabled": false,
                "multiPorts": false,
                "multiPortsLimit": null,
                "ipServiceLevel": "default",
                "ddosSslApplicationSettings": {
                    "ddosSslEnabled": false, "ddosSslIp": null, "ddosSslBgpCommunity": null
                },
                "tunableParameters": {
                    "tunableHttpParameters": {
                        "clientHeaderBufferSize": "1k",
                        "largeClientHeaderBuffer": {
                            "number": 4, "size": "8k"
                        },
                        "clientBodyBufferSize": "4k",
                        "clientBodyTimeout": "10s",
                        "clientHeaderTimeout": "10s",
                        "clientMaxBodySize": "0",
                        "proxyBuffering": true,
                        "proxyConnectTimeout": "60s",
                        "proxyReadTimeout": "600s",
                        "proxySendTimeout": "60s",
                        "tunableHttpUpstreamParameters": {
                            "keepAlive": 128, "keepAliveTimeout": "600s", "keepAliveRequests": 1000
                        },
                        "keepAliveTimeout": "600s",
                        "keepAliveRequests": 1000
                    }, "tunableStreamParameters": {
                        "preReadBufferSize": "16k", "preReadTimeout": "30s", "proxyProtocolTimeout": "30s"
                    }
                },
                "cdnConfiguration": {
                    "enabled": false, "bypassed": false, "domainName": null, "lastChanged": null, "behaviors": {
                        "lastChanged": null, "values": [{
                            "precedence": 0,
                            "pathPattern": "Default (*)",
                            "cachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
                            "compression": true,
                            "default": true
                        }]
                    }, "invalidations": {
                        "values": []
                    }, "distribution": null
                },
                "cdnEnabled": false,
                "mtlsEnabled": false,
                "geoBlockingReportingEnabled": true,
                "aclReportingEnabled": true,
                "rateLimitingReportingEnabled": true,
                "attackersFeedReportingEnabled": true,
                "clientCertificatePassConfiguration": {
                    "enabled": false, "header": ""
                },
                "applicationAssetType": "IN_LINE",
                "oopApiKey": null,
                "mtlsConfiguration": {
                    "config": {
                        "enable": false, "fingerprint": null, "applicationServices": [], "origin_server_parameters": {
                            "pass_origin_server": false, "header_prefix": null, "suffix_list": [{
                                "enable": false, "suffix_type": "Full client certificate"
                            }, {
                                "enable": false, "suffix_type": "Fingerprint"
                            }, {
                                "enable": false, "suffix_type": "Common name"
                            }, {
                                "enable": false, "suffix_type": "Serial number"
                            }]
                        }
                    }, "bypass": {
                        "bypass": []
                    }, "applicationId": "f28787c6-fe2f-4709-ae94-e0f4ed4856dc"
                },
                "accessLogsEnabled": false,
                "sourceBlockingEnabled": false,
                "sharedObjectsEnabled": true,
                "alconL7Config": {
                    "enable": false, "globalRateLimit": 0
                },
                "apiProtection": {
                    "status": "DISABLE",
                    "hostname": {
                        "useDefault": true, "hostname": ""
                    },
                    "basePaths": [],
                    "endpoints": [],
                    "openApiFileStatus": "NO_FILE",
                    "apiDiscovery": false,
                    "startedBy": null,
                    "discoveryFileAvailable": false,
                    "mergePolicyDto": {
                        "uploadFilePolicy": {
                            "policy": "OVERWRITE_ALL", "excludeDeleted": false, "overwriteManual": true
                        }, "discoveryFilePolicy": {
                            "policy": "APPEND_NEW", "excludeDeleted": true
                        }
                    },
                    "caseSensitive": true,
                    "preflight": false
                },
                "cspApplicationConfig": null,
                "customDeployment": false
            }, {
                "id": "204a5f13-edcb-4856-9509-2c6d42ba7c2e",
                "name": "rad-ist-0003-svc-oen-0000",
                "deploymentStatus": "PROTECTING",
                "isCustomDeployment": false,
                "frontend": "alcon",
                "hstsEnabled": true,
                "http2Enabled": true,
                "ipv6Enabled": false,
                "ssrfEnabled": true,
                "awBypassEnabled": false,
                "antibotEnabled": true,
                "geoBlockingEnabled": true,
                "workflowName": "someist0003svc.rad_ist_0003_svc_oen_0000",
                "hstsAge": 31536000,
                "mux": true,
                "gzipCompressionPolicy": {
                    "gzipProxied": "OFF", "gzipVaryEnable": false
                },
                "bigFileConfiguration": {
                    "fileSize": 1048576, "enabled": false
                },
                "monitoringStatus": "MONITORING_AND_ALERT",
                "azureDdosEnabled": false,
                "advancedRulesEnabled": true,
                "advancedRulesReportingEnabled": true,
                "apiProtectionEnabled": false,
                "apiDiscoveryEnabled": false,
                "apiProtectionRefinementEnabled": false,
                "apiProtectionCaseSensitivePreflightEnabled": false,
                "showArecord": false,
                "showCnameRecord": true,
                "showOrigins": true,
                "generalInfo": {
                    "ownerName": "Bob McDonald",
                    "ownerEmail": "bob.mcdonald@ontario.ca",
                    "externalID": "CI0000000833283",
                    "description": "SOME MCKB OEN PPE"
                },
                "originLatencyEnabled": false,
                "attackersFeedEnabled": false,
                "internalConfiguration": {
                    "wafInternalConfiguration": {
                        "tunnelConfiguration": {
                            "tunnels": ["someist0003svc_rad_ist_0003_svc_oen_0000_HTTPS", "someist0003svc_rad_ist_0003_svc_oen_0000_HTTP"]
                        }
                    }, "ddosInternalConfiguration": null
                },
                "featuresData": {
                    "wafFeatureData": {
                        "dns": {
                            "dnsRecords": [{
                                "type": "CNAME", "value": "204a5f13edcb485695092c6d42ba7c2e.1.radaremock.netcloud.net"
                            }, {
                                "type": "A", "value": "N/A"
                            }]
                        }, "oopDns": null, "operationMode": {
                            "mode": "LOAD_BALANCE", "failoverMode": null, "loadBalanceMode": {
                                "serverAddresses": [{
                                    "addressType": "IP", "address": "204.41.1.208"
                                }], "loadBalanceMetric": "ROUND_ROBIN", "protocol": null
                            }
                        }, "mainDomain": {
                            "mainDomain": "stage22.example.com"
                        }, "ipRange": ["88.34.45.22"], "sourceIpHeader": null, "accessRules": {
                            "accessRules": []
                        }, "accessControlList": {
                            "accessControlListItems": [],
                            "defaultOperation": "PERMIT",
                            "mode": "ENABLE",
                            "reported": false
                        }, "securityPolicy": {
                            "protectionMode": "IMMEDIATE", "technology": "BASIC"
                        }, "region": "CANADA_1", "blockPage": {
                            "url": null
                        }, "protectionConfiguration": {
                            "allowedFileExtensionProtection": {
                                "protectionStatus": "ACTIVE", "allowList": {
                                    "allowListItems": [{
                                        "uri": "*.woff", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.asmx", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.asmx", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.aspx", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.aspx", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.jpg", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "/", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "/", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.htm", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.csv", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.gif", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.eot", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.xsl", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.asmx", "method": "HEAD", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.jsp", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.jsp", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.ppt", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.pdf", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.asp", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.asp", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.mp3", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.tif", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.pptx", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.aspx", "method": "HEAD", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.js", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.flv", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.do", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.png", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.shtml", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.ico", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.doc", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.zip", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.swf", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "/obrar.cgi", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.bmp", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.woff2", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.docx", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.html", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.jpeg", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.css", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.json", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.json", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.mp4", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.xlsx", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.xml", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.xml", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.no-extension", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.no-extension", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.svg", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.axd", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.axd", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.xls", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.ttf", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.wmv", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.php", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.php", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.ashx", "method": "GET", "acceptable": true, "regex": false
                                    }]
                                }
                            }, "knownAttackTypesProtection": {
                                "protectionStatus": "PASSIVE"
                            }, "httpProtocolComplianceProtection": {
                                "protectionStatus": "ACTIVE"
                            }, "ddosProtection": {
                                "protectionStatus": "ACTIVE"
                            }, "ipReputationProtection": {
                                "protectionStatus": "ACTIVE"
                            }, "vulnerabilityProtection": {
                                "protectionStatus": "ACTIVE", "vulnerabilityList": {
                                    "vulnerabilityItems": [{
                                        "ruleId": "6904",
                                        "pattern": "N/A",
                                        "details": "Four subsequent opening parentheses, this may be an attempt to execute code on the server."
                                    }, {
                                        "ruleId": "11444",
                                        "pattern": "c:\\users",
                                        "details": "Attempt to access a sensitive location on windows OS"
                                    }, {
                                        "ruleId": "10487",
                                        "pattern": "%25[0-9a-f][0-9a-f]",
                                        "details": "Double Encoding was detected"
                                    }, {
                                        "ruleId": "9229",
                                        "pattern": "+++++++",
                                        "details": "Fuzzer: HTTP GET Request Invalid URI (Encoded)"
                                    }, {
                                        "ruleId": "9247", "pattern": ".asmx?wsdl", "details": "WSDL scan prevention"
                                    }, {
                                        "ruleId": "9359",
                                        "pattern": "/libs/",
                                        "details": "Attempt to access a sensitive location"
                                    }, {
                                        "ruleId": "10468",
                                        "pattern": "N/A",
                                        "details": "PHPMailer Remote Code Execution CVE-2016-10033"
                                    }, {
                                        "ruleId": "9407",
                                        "pattern": " - Copy.",
                                        "details": "File names that contain ' - Copy.' are possible backup files, and might contain internal scripts or data"
                                    }]
                                }
                            }, "databaseProtection": {
                                "protectionStatus": "ACTIVE", "databaseProtectionList": {
                                    "databaseProtectionItems": [{
                                        "page": "All Pages",
                                        "parameter": ".*[P|p]assword|.*[P|p]asswrd|.*[P|p]wd",
                                        "ruleIds": ["FSPA01", "ATPANP", "FSPA02"],
                                        "regex": true,
                                        "discardAllRules": false
                                    }, {
                                        "page": "All Pages",
                                        "parameter": "ctl00\\$[\\w|\\$]+\\$HiddenField\\d+",
                                        "ruleIds": ["FZENG3", "FZENG4", "EULHFP"],
                                        "regex": true,
                                        "discardAllRules": false
                                    }, {
                                        "page": "All Pages",
                                        "parameter": "state",
                                        "ruleIds": ["S3STPR"],
                                        "regex": false,
                                        "discardAllRules": false
                                    }]
                                }
                            }, "antibotProtection": {
                                "protectionStatus": "ACTIVE",
                                "enable": false,
                                "customCaptchaPage": null,
                                "whitelistedIpList": null,
                                "badBotResponse": null,
                                "legitimateBotResponse": null,
                                "siteExternalId": 0
                            }, "ssrfProtection": {
                                "protectionStatus": "DISABLE", "ssrfProtectionLists": {
                                    "ssrfProtectionTrustedHosts": [], "ssrfProtectionExcludedURIs": []
                                }
                            }
                        }
                    }, "ddosFeatureData": {
                        "dpipeAssetId": null, "dpPolicyName": null
                    }
                },
                "creationDate": 1639408872396,
                "compressionEnabled": true,
                "xrdwripAllowed": false,
                "rateLimitEnabled": false,
                "rateLimitMaxRules": 5,
                "cspEnabled": false,
                "applicationSecuritySettings": {
                    "cipherSuite": {
                        "name": "High",
                        "ciphers": ["ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256"],
                        "defaultSet": true,
                        "systemSet": true
                    }, "useDefaultCipherSuite": true, "securityProtocolSet": {
                        "ssl30": false,
                        "tls10": false,
                        "tls11": false,
                        "tls12": true,
                        "tls13": true,
                        "defaultSet": false
                    }, "useDefaultProtocolSet": false
                },
                "ipSourceAffinitySettings": {
                    "ipAffinityEnabled": false
                },
                "ipPersistencySettings": {
                    "ipPersistencyEnabled": false
                },
                "featureStates": {
                    "AccessControlList": true, "Protections": true, "AccessRules": true
                },
                "certificate": {
                    "id": "49df5ebf-0c9c-4d47-98ac-f41f355657ec",
                    "fingerprint": "101D7AAD5528D7ED9D49B00B5F65CBE6B6A2F525",
                    "issuer": "CN=Entrust Certification Authority - L1K,OU=(c) 2012 Entrust\\, Inc. - for authorized use only,OU=See www.entrust.net/legal-terms,O=Entrust\\, Inc.,C=US",
                    "validFrom": 1652297604000,
                    "validTo": 1685129604000,
                    "certificateChain": "CN=stage22.example.com,OU=SomeOrg,O=SomeOrg,L=Toronto,ST=Ontario,C=CA;CN=Entrust Certification Authority - L1K,OU=(c) 2012 Entrust\\, Inc. - for authorized use only,OU=See www.entrust.net/legal-terms,O=Entrust\\, Inc.,C=US;CN=Entrust Root Certification Authority - G2,OU=(c) 2009 Entrust\\, Inc. - for authorized use only,OU=See www.entrust.net/legal-terms,O=Entrust\\, Inc.,C=US",
                    "protectedDomains": "stage22.example.com;stage22.example.com;www.stage22.example.com",
                    "keySize": "2048",
                    "email": null,
                    "creationDate": 1652382934565,
                    "applications": [{
                        "applicationUUID": "204a5f13-edcb-4856-9509-2c6d42ba7c2e",
                        "applicationName": "rad-ist-0003-svc-oen-0000"
                    }],
                    "nextLocks": [],
                    "previousLocks": [],
                    "certificateType": "REGULAR",
                    "certificateKind": "server",
                    "whiteLabelConfiguration": null,
                    "customerAccount": null,
                    "synchronized": true,
                    "caCertificate": false
                },
                "mtlsCertificate": null,
                "geoBlocking": {
                    "excludedIps": [],
                    "countries": ["AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"],
                    "geoBlockingMode": "BLOCK_AND_REPORT"
                },
                "geoBlockingPolicy": null,
                "alconMetric": "ROUND_ROBIN",
                "alconAccessLogConfiguration": {
                    "enabled": false,
                    "format": "$x_rdwr_ip_value - $remote_user [$time_local] $server_addr $server_port \"$http_host\" \"$request\" $status $body_bytes_sent \"$http_referrer\" \"$http_user_agent\""
                },
                "advancedRules": {
                    "rulesLimit": 3, "redirectRules": [], "securityRules": [{
                        "id": 103,
                        "order": 1,
                        "name": "Allow Webgate",
                        "enabled": true,
                        "readOnly": false,
                        "description": "",
                        "lastChanged": 1660592802180,
                        "trigger": {
                            "conditions": [{
                                "conditionType": "URI", "operator": "STARTS", "urlValue": "/obrar.cgi"
                            }], "operator": "AND"
                        },
                        "action": {
                            "type": "BYPASS"
                        }
                    }], "deliveryRules": [{
                        "id": 102,
                        "order": 1,
                        "name": "Radware Auth Header",
                        "enabled": true,
                        "readOnly": false,
                        "description": "Add header for backend to verify request originated with Radware.",
                        "lastChanged": 1660575363585,
                        "trigger": {
                            "conditions": [{
                                "conditionType": "IP", "operator": "CONTAINS", "ips": ["0.0.0.0/0"]
                            }], "operator": "AND"
                        },
                        "action": {
                            "type": "REWRITE_HEADER",
                            "headerName": "Radware-Auth",
                            "toHeader": "e1290619-543f-4e36-a9e0-b926284988b3",
                            "addIfMissing": true
                        }
                    }], "responseDeliveryRules": [], "index": 103
                },
                "attackersFeed": {
                    "excludedIps": [], "attackersFeedMode": "DISABLE"
                },
                "jsonParsing": {
                    "jsonParsingMode": "ACTIVE", "excludedUris": []
                },
                "rateLimit": {
                    "rateLimitSiteWide": {
                        "id": "1a05953d-d2b3-4f25-b9ed-97f118649638",
                        "enable": false,
                        "durationType": "MIN",
                        "blockingPeriod": 1,
                        "threshold": 500
                    }, "rateLimitMode": "DISABLE", "rateLimitRules": [], "rateLimitExcludes": []
                },
                "alconPopConfigurationContexts": [{
                    "popName": "YYZ", "disabled": false
                }, {
                    "popName": "ASH_YYZ", "disabled": false
                }],
                "applicationServices": [{
                    "id": "80bab34d-af23-4cc9-b97a-8a74f4954c8d",
                    "frontPort": 443,
                    "backPort": 443,
                    "type": "HTTPS",
                    "description": null,
                    "enabled": true
                }],
                "healthChecks": [{
                    "id": "921d054b-39f0-42af-b292-8d68231864e9",
                    "type": "TCP",
                    "port": 443,
                    "hostname": null,
                    "url": null,
                    "responseCode": null
                }],
                "redirect": {
                    "id": "e68d0771-fe7a-4b8e-8fef-ee1e53a27447", "targetPort": 443, "responseCode": 302
                },
                "readOnly": false,
                "ntlmEnabled": false,
                "multiPorts": false,
                "multiPortsLimit": null,
                "ipServiceLevel": "default",
                "ddosSslApplicationSettings": {
                    "ddosSslEnabled": false, "ddosSslIp": null, "ddosSslBgpCommunity": null
                },
                "tunableParameters": {
                    "tunableHttpParameters": {
                        "clientHeaderBufferSize": "1k",
                        "largeClientHeaderBuffer": {
                            "number": 4, "size": "8k"
                        },
                        "clientBodyBufferSize": "4k",
                        "clientBodyTimeout": "10s",
                        "clientHeaderTimeout": "10s",
                        "clientMaxBodySize": "0",
                        "proxyBuffering": true,
                        "proxyConnectTimeout": "60s",
                        "proxyReadTimeout": "600s",
                        "proxySendTimeout": "60s",
                        "tunableHttpUpstreamParameters": {
                            "keepAlive": 128, "keepAliveTimeout": "600s", "keepAliveRequests": 1000
                        },
                        "keepAliveTimeout": "600s",
                        "keepAliveRequests": 1000
                    }, "tunableStreamParameters": {
                        "preReadBufferSize": "16k", "preReadTimeout": "30s", "proxyProtocolTimeout": "30s"
                    }
                },
                "cdnConfiguration": {
                    "enabled": false, "bypassed": false, "domainName": null, "lastChanged": null, "behaviors": {
                        "lastChanged": null, "values": [{
                            "precedence": 0,
                            "pathPattern": "Default (*)",
                            "cachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
                            "compression": true,
                            "default": true
                        }]
                    }, "invalidations": {
                        "values": []
                    }, "distribution": null
                },
                "cdnEnabled": false,
                "mtlsEnabled": false,
                "geoBlockingReportingEnabled": true,
                "aclReportingEnabled": true,
                "rateLimitingReportingEnabled": true,
                "attackersFeedReportingEnabled": true,
                "clientCertificatePassConfiguration": {
                    "enabled": false, "header": ""
                },
                "applicationAssetType": "IN_LINE",
                "oopApiKey": null,
                "mtlsConfiguration": {
                    "config": {
                        "enable": false, "fingerprint": null, "applicationServices": [], "origin_server_parameters": {
                            "pass_origin_server": false, "header_prefix": null, "suffix_list": [{
                                "enable": false, "suffix_type": "Full client certificate"
                            }, {
                                "enable": false, "suffix_type": "Fingerprint"
                            }, {
                                "enable": false, "suffix_type": "Common name"
                            }, {
                                "enable": false, "suffix_type": "Serial number"
                            }]
                        }
                    }, "bypass": {
                        "bypass": []
                    }, "applicationId": "204a5f13-edcb-4856-9509-2c6d42ba7c2e"
                },
                "accessLogsEnabled": false,
                "sourceBlockingEnabled": false,
                "sharedObjectsEnabled": true,
                "alconL7Config": {
                    "enable": false, "globalRateLimit": 0
                },
                "apiProtection": {
                    "status": "DISABLE",
                    "hostname": {
                        "useDefault": true, "hostname": ""
                    },
                    "basePaths": [],
                    "endpoints": [],
                    "openApiFileStatus": "NO_FILE",
                    "apiDiscovery": false,
                    "startedBy": null,
                    "discoveryFileAvailable": false,
                    "mergePolicyDto": {
                        "uploadFilePolicy": {
                            "policy": "OVERWRITE_ALL", "excludeDeleted": false, "overwriteManual": true
                        }, "discoveryFilePolicy": {
                            "policy": "APPEND_NEW", "excludeDeleted": true
                        }
                    },
                    "caseSensitive": true,
                    "preflight": false
                },
                "cspApplicationConfig": null,
                "customDeployment": false
            }, {
                "id": "2da0251a-22b0-401f-b808-4dd144b4e1f3",
                "name": "rad-ist-0003-svc-kiute-0000",
                "deploymentStatus": "PROTECTING",
                "isCustomDeployment": false,
                "frontend": "alcon",
                "hstsEnabled": true,
                "http2Enabled": true,
                "ipv6Enabled": false,
                "ssrfEnabled": true,
                "awBypassEnabled": false,
                "antibotEnabled": true,
                "geoBlockingEnabled": true,
                "workflowName": "someist0003svc.rad_ist_0003_svc_kiute_0000",
                "hstsAge": 31536000,
                "mux": true,
                "gzipCompressionPolicy": {
                    "gzipProxied": "OFF", "gzipVaryEnable": false
                },
                "bigFileConfiguration": {
                    "fileSize": 1048576, "enabled": false
                },
                "monitoringStatus": "MONITORING_AND_ALERT",
                "azureDdosEnabled": false,
                "advancedRulesEnabled": true,
                "advancedRulesReportingEnabled": true,
                "apiProtectionEnabled": false,
                "apiDiscoveryEnabled": false,
                "apiProtectionRefinementEnabled": false,
                "apiProtectionCaseSensitivePreflightEnabled": false,
                "showArecord": false,
                "showCnameRecord": true,
                "showOrigins": true,
                "generalInfo": {
                    "ownerName": "Bob McDonald",
                    "ownerEmail": "bob.mcdonald@ontario.ca",
                    "externalID": "EXT_ID3",
                    "description": "SOME MCKB SOMESYS PPE"
                },
                "originLatencyEnabled": false,
                "attackersFeedEnabled": false,
                "internalConfiguration": {
                    "wafInternalConfiguration": {
                        "tunnelConfiguration": {
                            "tunnels": ["someist0003svc_rad_ist_0003_svc_kiute_0000_HTTPS", "someist0003svc_rad_ist_0003_svc_kiute_0000_HTTP"]
                        }
                    }, "ddosInternalConfiguration": null
                },
                "featuresData": {
                    "wafFeatureData": {
                        "dns": {
                            "dnsRecords": [{
                                "type": "A", "value": "N/A"
                            }, {
                                "type": "CNAME", "value": "2da0251a22b0401fb8084dd144b4e1f3.1.radaremock.netcloud.net"
                            }]
                        }, "oopDns": null, "operationMode": {
                            "mode": "LOAD_BALANCE", "failoverMode": null, "loadBalanceMode": {
                                "serverAddresses": [{
                                    "addressType": "IP", "address": "209.3.2.1"
                                }], "loadBalanceMetric": "ROUND_ROBIN", "protocol": null
                            }
                        }, "mainDomain": {
                            "mainDomain": "stage.example.com"
                        }, "ipRange": ["209.3.2.55"], "sourceIpHeader": null, "accessRules": {
                            "accessRules": []
                        }, "accessControlList": {
                            "accessControlListItems": [],
                            "defaultOperation": "PERMIT",
                            "mode": "ENABLE",
                            "reported": false
                        }, "securityPolicy": {
                            "protectionMode": "IMMEDIATE", "technology": "BASIC"
                        }, "region": "CANADA_1", "blockPage": {
                            "url": null
                        }, "protectionConfiguration": {
                            "allowedFileExtensionProtection": {
                                "protectionStatus": "ACTIVE", "allowList": {
                                    "allowListItems": [{
                                        "uri": "/", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.woff", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.jpg", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.xml", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.htm", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.csv", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.gif", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.eot", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.xsl", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.pdf", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.pptx", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.xml", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "/", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.js", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.do", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.doc", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.asp", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.swf", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.bmp", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.jsp", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.axd", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.mp4", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.no-extension", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.svg", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.wmv", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.asp", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.aspx", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.no-extension", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.php", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.ppt", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.php", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.mp3", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.tif", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.aspx", "method": "HEAD", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.flv", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.png", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.shtml", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.ico", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.jsp", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.zip", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "/obrar.cgi", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.woff2", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.docx", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.html", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.jpeg", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.css", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.json", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.xlsx", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.aspx", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.xls", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.ttf", "method": "GET", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.json", "method": "POST", "acceptable": true, "regex": false
                                    }, {
                                        "uri": "*.ashx", "method": "GET", "acceptable": true, "regex": false
                                    }]
                                }
                            }, "knownAttackTypesProtection": {
                                "protectionStatus": "PASSIVE"
                            }, "httpProtocolComplianceProtection": {
                                "protectionStatus": "ACTIVE"
                            }, "ddosProtection": {
                                "protectionStatus": "ACTIVE"
                            }, "ipReputationProtection": {
                                "protectionStatus": "ACTIVE"
                            }, "vulnerabilityProtection": {
                                "protectionStatus": "ACTIVE", "vulnerabilityList": {
                                    "vulnerabilityItems": [{
                                        "ruleId": "9229",
                                        "pattern": "+++++++",
                                        "details": "Fuzzer: HTTP GET Request Invalid URI (Encoded)"
                                    }, {
                                        "ruleId": "6904",
                                        "pattern": "N/A",
                                        "details": "Four subsequent opening parentheses, this may be an attempt to execute code on the server."
                                    }, {
                                        "ruleId": "9806",
                                        "pattern": "<svg",
                                        "details": "Blocking of Cross Site Scripting (XSS)."
                                    }, {
                                        "ruleId": "9407",
                                        "pattern": " - Copy.",
                                        "details": "File names that contain ' - Copy.' are possible backup files, and might contain internal scripts or data"
                                    }, {
                                        "ruleId": "10487",
                                        "pattern": "%25[0-9a-f][0-9a-f]",
                                        "details": "Double Encoding was detected"
                                    }, {
                                        "ruleId": "10468",
                                        "pattern": "N/A",
                                        "details": "PHPMailer Remote Code Execution CVE-2016-10033"
                                    }, {
                                        "ruleId": "9359",
                                        "pattern": "/libs/",
                                        "details": "Attempt to access a sensitive location"
                                    }, {
                                        "ruleId": "11444",
                                        "pattern": "c:\\users",
                                        "details": "Attempt to access a sensitive location on windows OS"
                                    }]
                                }
                            }, "databaseProtection": {
                                "protectionStatus": "ACTIVE", "databaseProtectionList": {
                                    "databaseProtectionItems": [{
                                        "page": "/obrar.cgi",
                                        "parameter": "cookie",
                                        "ruleIds": ["ATAORN"],
                                        "regex": false,
                                        "discardAllRules": false
                                    }, {
                                        "page": "All Pages",
                                        "parameter": ".*[P|p]assword|.*[P|p]asswrd|.*[P|p]wd",
                                        "ruleIds": ["FSPA01", "ATPANP", "FSPA02"],
                                        "regex": true,
                                        "discardAllRules": false
                                    }, {
                                        "page": "All Pages",
                                        "parameter": "state",
                                        "ruleIds": ["S3STPR"],
                                        "regex": false,
                                        "discardAllRules": false
                                    }, {
                                        "page": "All Pages",
                                        "parameter": "schoolNameRadiobuttonList",
                                        "ruleIds": ["FSPA01"],
                                        "regex": false,
                                        "discardAllRules": false
                                    }]
                                }
                            }, "antibotProtection": {
                                "protectionStatus": "ACTIVE",
                                "enable": false,
                                "customCaptchaPage": null,
                                "whitelistedIpList": null,
                                "badBotResponse": null,
                                "legitimateBotResponse": null,
                                "siteExternalId": 0
                            }, "ssrfProtection": {
                                "protectionStatus": "DISABLE", "ssrfProtectionLists": {
                                    "ssrfProtectionTrustedHosts": [], "ssrfProtectionExcludedURIs": []
                                }
                            }
                        }
                    }, "ddosFeatureData": {
                        "dpipeAssetId": null, "dpPolicyName": null
                    }
                },
                "creationDate": 1639408804806,
                "compressionEnabled": true,
                "xrdwripAllowed": false,
                "rateLimitEnabled": false,
                "rateLimitMaxRules": 5,
                "cspEnabled": false,
                "applicationSecuritySettings": {
                    "cipherSuite": {
                        "name": "High",
                        "ciphers": ["ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES256-GCM-SHA384", "DHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256"],
                        "defaultSet": true,
                        "systemSet": true
                    }, "useDefaultCipherSuite": true, "securityProtocolSet": {
                        "ssl30": false,
                        "tls10": false,
                        "tls11": false,
                        "tls12": true,
                        "tls13": true,
                        "defaultSet": false
                    }, "useDefaultProtocolSet": false
                },
                "ipSourceAffinitySettings": {
                    "ipAffinityEnabled": false
                },
                "ipPersistencySettings": {
                    "ipPersistencyEnabled": false
                },
                "featureStates": {
                    "AccessControlList": true, "Protections": true, "AccessRules": true
                },
                "certificate": {
                    "id": "9dd98667-a077-433c-b32f-8eb1d86aef9d",
                    "fingerprint": "331C056F4512073F9613AAED42BBD37714F4AE1D",
                    "issuer": "CN=Entrust Certification Authority - L1K,OU=(c) 2012 Entrust\\, Inc. - for authorized use only,OU=See www.entrust.net/legal-terms,O=Entrust\\, Inc.,C=US",
                    "validFrom": 1652297759000,
                    "validTo": 1685129759000,
                    "certificateChain": "CN=stage.example.com,OU=SomeOrg,O=SomeOrg,L=Toronto,ST=Ontario,C=CA;CN=Entrust Certification Authority - L1K,OU=(c) 2012 Entrust\\, Inc. - for authorized use only,OU=See www.entrust.net/legal-terms,O=Entrust\\, Inc.,C=US;CN=Entrust Root Certification Authority - G2,OU=(c) 2009 Entrust\\, Inc. - for authorized use only,OU=See www.entrust.net/legal-terms,O=Entrust\\, Inc.,C=US",
                    "protectedDomains": "stage.example.com;stage.example.com;www.stage.example.com",
                    "keySize": "2048",
                    "email": null,
                    "creationDate": 1652382509063,
                    "applications": [{
                        "applicationUUID": "2da0251a-22b0-401f-b808-4dd144b4e1f3",
                        "applicationName": "rad-ist-0003-svc-kiute-0000"
                    }],
                    "nextLocks": [],
                    "previousLocks": [],
                    "certificateType": "REGULAR",
                    "certificateKind": "server",
                    "whiteLabelConfiguration": null,
                    "customerAccount": null,
                    "synchronized": true,
                    "caCertificate": false
                },
                "mtlsCertificate": null,
                "geoBlocking": {
                    "excludedIps": [],
                    "countries": ["AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"],
                    "geoBlockingMode": "BLOCK_AND_REPORT"
                },
                "geoBlockingPolicy": null,
                "alconMetric": "ROUND_ROBIN",
                "alconAccessLogConfiguration": {
                    "enabled": false,
                    "format": "$x_rdwr_ip_value - $remote_user [$time_local] $server_addr $server_port \"$http_host\" \"$request\" $status $body_bytes_sent \"$http_referrer\" \"$http_user_agent\""
                },
                "advancedRules": {
                    "rulesLimit": 3, "redirectRules": [], "securityRules": [], "deliveryRules": [{
                        "id": 101,
                        "order": 1,
                        "name": "Radware Auth Header",
                        "enabled": true,
                        "readOnly": false,
                        "description": "Add header for backend to verify request originated with Radware.",
                        "lastChanged": 1660917662378,
                        "trigger": {
                            "conditions": [{
                                "conditionType": "IP", "operator": "CONTAINS", "ips": ["0.0.0.0/0"]
                            }], "operator": "AND"
                        },
                        "action": {
                            "type": "REWRITE_HEADER",
                            "headerName": "Radware-Auth",
                            "toHeader": "e1290619-543f-4e36-a9e0-b926284988b3",
                            "addIfMissing": true
                        }
                    }], "responseDeliveryRules": [], "index": 101
                },
                "attackersFeed": {
                    "excludedIps": [], "attackersFeedMode": "DISABLE"
                },
                "jsonParsing": {
                    "jsonParsingMode": "ACTIVE", "excludedUris": []
                },
                "rateLimit": {
                    "rateLimitSiteWide": {
                        "id": "28af714c-747f-4671-b64c-d4988bb4105c",
                        "enable": false,
                        "durationType": "MIN",
                        "blockingPeriod": 1,
                        "threshold": 500
                    }, "rateLimitMode": "DISABLE", "rateLimitRules": [], "rateLimitExcludes": []
                },
                "alconPopConfigurationContexts": [{
                    "popName": "YYZ", "disabled": false
                }, {
                    "popName": "ASH_YYZ", "disabled": false
                }],
                "applicationServices": [{
                    "id": "41b97a28-2bf2-455a-918d-e51a5ee970da",
                    "frontPort": 443,
                    "backPort": 443,
                    "type": "HTTPS",
                    "description": null,
                    "enabled": true
                }],
                "healthChecks": [{
                    "id": "85eb56e6-0acd-408c-b0e4-7909d671d511",
                    "type": "TCP",
                    "port": 443,
                    "hostname": null,
                    "url": null,
                    "responseCode": null
                }],
                "redirect": null,
                "readOnly": false,
                "ntlmEnabled": false,
                "multiPorts": false,
                "multiPortsLimit": null,
                "ipServiceLevel": "default",
                "ddosSslApplicationSettings": {
                    "ddosSslEnabled": false, "ddosSslIp": null, "ddosSslBgpCommunity": null
                },
                "tunableParameters": {
                    "tunableHttpParameters": {
                        "clientHeaderBufferSize": "1k",
                        "largeClientHeaderBuffer": {
                            "number": 4, "size": "8k"
                        },
                        "clientBodyBufferSize": "4k",
                        "clientBodyTimeout": "10s",
                        "clientHeaderTimeout": "10s",
                        "clientMaxBodySize": "0",
                        "proxyBuffering": true,
                        "proxyConnectTimeout": "60s",
                        "proxyReadTimeout": "600s",
                        "proxySendTimeout": "60s",
                        "tunableHttpUpstreamParameters": {
                            "keepAlive": 128, "keepAliveTimeout": "600s", "keepAliveRequests": 1000
                        },
                        "keepAliveTimeout": "600s",
                        "keepAliveRequests": 1000
                    }, "tunableStreamParameters": {
                        "preReadBufferSize": "16k", "preReadTimeout": "30s", "proxyProtocolTimeout": "30s"
                    }
                },
                "cdnConfiguration": {
                    "enabled": false, "bypassed": false, "domainName": null, "lastChanged": null, "behaviors": {
                        "lastChanged": null, "values": [{
                            "precedence": 0,
                            "pathPattern": "Default (*)",
                            "cachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
                            "compression": true,
                            "default": true
                        }]
                    }, "invalidations": {
                        "values": []
                    }, "distribution": null
                },
                "cdnEnabled": false,
                "mtlsEnabled": false,
                "geoBlockingReportingEnabled": true,
                "aclReportingEnabled": true,
                "rateLimitingReportingEnabled": true,
                "attackersFeedReportingEnabled": true,
                "clientCertificatePassConfiguration": {
                    "enabled": false, "header": ""
                },
                "applicationAssetType": "IN_LINE",
                "oopApiKey": null,
                "mtlsConfiguration": {
                    "config": {
                        "enable": false, "fingerprint": null, "applicationServices": [], "origin_server_parameters": {
                            "pass_origin_server": false, "header_prefix": null, "suffix_list": [{
                                "enable": false, "suffix_type": "Full client certificate"
                            }, {
                                "enable": false, "suffix_type": "Fingerprint"
                            }, {
                                "enable": false, "suffix_type": "Common name"
                            }, {
                                "enable": false, "suffix_type": "Serial number"
                            }]
                        }
                    }, "bypass": {
                        "bypass": []
                    }, "applicationId": "2da0251a-22b0-401f-b808-4dd144b4e1f3"
                },
                "accessLogsEnabled": false,
                "sourceBlockingEnabled": false,
                "sharedObjectsEnabled": true,
                "alconL7Config": {
                    "enable": false, "globalRateLimit": 0
                },
                "apiProtection": {
                    "status": "DISABLE",
                    "hostname": {
                        "useDefault": true, "hostname": ""
                    },
                    "basePaths": [],
                    "endpoints": [],
                    "openApiFileStatus": "NO_FILE",
                    "apiDiscovery": false,
                    "startedBy": null,
                    "discoveryFileAvailable": false,
                    "mergePolicyDto": {
                        "uploadFilePolicy": {
                            "policy": "OVERWRITE_ALL", "excludeDeleted": false, "overwriteManual": true
                        }, "discoveryFilePolicy": {
                            "policy": "APPEND_NEW", "excludeDeleted": true
                        }
                    },
                    "caseSensitive": true,
                    "preflight": false
                },
                "cspApplicationConfig": null,
                "customDeployment": false
            }]
        }
    }
}

export default RadwareJsonService
