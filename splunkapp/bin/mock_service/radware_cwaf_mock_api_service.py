#!/usr/bin/env python
#
# Mock service for Radware Cloud WAF API - used for testing and development

import json
import os
import pathlib

from radware_cwaf_api_service import RadwareService


class MockRadwareService(RadwareService):
    def __init__(self, credential, settings, radware_api_host="https://portal.radwarecloud.com",
                 radware_auth_endpoint="https://radware-public.okta.com", logger=None) -> None:
        super().__init__(credential, settings, radware_api_host, radware_auth_endpoint, logger)
        current = os.path.dirname(os.path.realpath(__file__))
        self.mock_data_path = pathlib.Path(current)
        self.radware_tenant_id = self.get_tenant_id()

    def login(self):
        return True

    def get_tenant_id(self):
        if self.radware_tenant_id:
            return self.radware_tenant_id
        else:
            self.radware_tenant_id = self.read_tenant_id()
            return self.radware_tenant_id

    def read_tenant_id(self):
        with open(self.mock_data_path / "users_me.json", "r") as f:
            return json.load(f)["tenantEntityId"]

    def get_applications(self):
        with open(self.mock_data_path / "applications.json", "r") as f:
            return json.load(f)["content"]
