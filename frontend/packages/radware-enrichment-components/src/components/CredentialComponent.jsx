import React, { useContext, useEffect, useState } from 'react';
import ControlGroup from '@splunk/react-ui/ControlGroup';
import Card from '@splunk/react-ui/Card';
import Text from '@splunk/react-ui/Text';
import Button from '@splunk/react-ui/Button';
import Table from '@splunk/react-ui/Table';
import { StyledCard } from './ComponentStyles';
import Plus from '@splunk/react-icons/Plus';
import Pencil from '@splunk/react-icons/Pencil';
import Save from '@splunk/react-icons/Save';
import WaitSpinner from '@splunk/react-ui/WaitSpinner';
import Trash from '@splunk/react-icons/Trash';
import { TOAST_TYPES } from '@splunk/react-toast-notifications/ToastConstants';
import Modal from '@splunk/react-ui/Modal';
import { RadwareEnrichmentContext } from '../RadwareEnrichmentContext';
import { isEqual } from 'lodash';
import { Typography } from '@splunk/react-ui/Typography';

const newCred = {
    credential_name: '',
    username: '',
    password: '',
    tenant_id: '',
    password_confirm: '',
    state: 'create',
};

const CredentialComponent = ({ credentials, handleCredentialsUpdate }) => {
    const { handleError, configService } = useContext(RadwareEnrichmentContext);
    const [creds, setCreds] = useState(credentials);
    const [editingCredential, setEditingCredential] = useState('');
    const [deletingCredential, setDeletingCredential] = useState('');
    const [updating, setUpdating] = useState(false);

    const getCred = () => {
        if (editingCredential === 'create') {
            return newCred;
        }
        return { ...creds[editingCredential], credential_name: creds[editingCredential].name };
    };

    useEffect(() => {
        setCreds(credentials);
    }, [credentials]);

    const addCredential = () => {
        setEditingCredential('create');
    };

    const handleUpdate = (credentials) => {
        setEditingCredential('');
        setCreds(credentials);
        handleCredentialsUpdate(credentials);
    };

    const getCredentialRows = () => {
        if (Object.keys(creds).length === 0) {
            return (
                <Table.Row>
                    <Table.Cell colSpan={3} className={'credential-spinner-container'}>
                        <Typography as="h4">
                            No Radware CWAF credentials found - Click the + to add a new credential
                        </Typography>
                    </Table.Cell>
                </Table.Row>
            );
        }
        return Object.keys(creds).map((cred, _) => {
            if (creds[cred].username === '') {
                return null;
            }
            return (
                <Table.Row key={'credrow' + cred}>
                    <Table.Cell>{creds[cred].name}</Table.Cell>
                    <Table.Cell>{creds[cred].username}</Table.Cell>
                    <Table.Cell>{creds[cred].tenant_id}</Table.Cell>
                    <Table.Cell>
                        <div>
                            <Button
                                label="Edit"
                                appearance="flat"
                                icon={<Pencil screenReaderText={null} />}
                                disabled={editingCredential !== ''}
                                onClick={() => setEditingCredential(cred)}
                            />
                            <Button
                                appearance={'primary'}
                                icon={<Trash screenReaderText={null} />}
                                onClick={() => {
                                    setDeletingCredential(cred);
                                }}
                                data-test-id={`delete-${creds[cred].name}-button`}
                            />
                        </div>
                        <Modal
                            open={deletingCredential === cred}
                            data-test-id="delete-credential-modal"
                        >
                            <Modal.Header title="Delete Credential" />
                            <Modal.Body>
                                <p>Are you sure you want to delete this credential:</p>
                                <p>Name: {creds[cred].name}</p>
                                <p>Username: {creds[cred].username}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                {updating ? (
                                    <WaitSpinner size="small" />
                                ) : (
                                    <div>
                                        <Button
                                            label={'Delete'}
                                            onClick={() => {
                                                deleteCredential(cred);
                                            }}
                                            data-test-id={`confirm-delete-credential-${creds[cred].name}-button`}
                                        />
                                        <Button
                                            label={'Cancel'}
                                            onClick={() => {
                                                setDeletingCredential('');
                                            }}
                                        />
                                    </div>
                                )}
                            </Modal.Footer>
                        </Modal>
                    </Table.Cell>
                </Table.Row>
            );
        });
    };

    const deleteCredential = (index) => {
        setUpdating(true);
        configService
            .deleteCredential(index)
            .then((credentials) => {
                handleCredentialsUpdate(credentials);
                setDeletingCredential('');
                setUpdating(false);
            })
            .catch((err) => {
                handleError(err, 'Error While Deleting Credentials');
                setDeletingCredential('');
                setUpdating(false);
            });
    };

    return (
        <StyledCard>
            <Card className={'setup-card'}>
                <Card.Header title="Current Radware Credentials" />
                <Card.Body>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                            <Table.HeadCell>Tenant ID</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>{getCredentialRows()}</Table.Body>
                    </Table>
                    <Button
                        label="Add New Credential"
                        appearance="secondary"
                        icon={<Plus screenReaderText={null} />}
                        disabled={editingCredential !== ''}
                        onClick={addCredential}
                        data-test-id={'add-new-credential-button'}
                    />
                </Card.Body>
            </Card>
            {editingCredential !== '' ? (
                <CredentialForm
                    cred={getCred()}
                    handleCancel={() => setEditingCredential('')}
                    handleCredentialsUpdate={handleUpdate}
                    credentialIndex={editingCredential}
                />
            ) : null}
        </StyledCard>
    );
};

const CredentialForm = (props) => {
    const { cred, credentialIndex, handleCancel, handleCredentialsUpdate } = props;
    const { handleError, configService, createToast } = useContext(RadwareEnrichmentContext);
    const [thisCred, setThisCred] = useState({ ...cred, password_confirm: '' });
    const [loading, setLoading] = useState(false);

    const handleFieldChange = (field) => (e) => {
        setThisCred({ ...thisCred, [field]: e.target.value });
    };

    const cancel = () => {
        setThisCred(newCred);
        handleCancel();
    };

    const onClickPassword = () => {
        if (thisCred.password_set === '1') {
            setThisCred({ ...thisCred, password_set: '0', password: '' });
        }
    };

    const fieldErrors = (fieldName) => {
        switch (fieldName) {
            case 'password':
                if (thisCred.password_set === '1') {
                    return false;
                } else if (thisCred.password.length < 1) {
                    return true;
                }
                break;
            case 'password_confirm':
                if (thisCred.password_set === '1') {
                    return false;
                } else if (thisCred.password !== thisCred.password_confirm) {
                    return 'Passwords do not match';
                } else if (thisCred.password === thisCred.password_confirm) {
                    return false;
                }
                break;
            default:
                if (thisCred[fieldName] === undefined) {
                    console.log(fieldName);
                }
                if (thisCred[fieldName].length > 0) {
                    return false;
                } else {
                    return 'Field is required.';
                }
        }
    };

    const formValid = () => {
        let validatedFields = ['credential_name', 'password', 'password_confirm', 'username'];
        for (let field of validatedFields) {
            if (fieldErrors(field)) {
                return false;
            }
        }
        return true;
    };

    const submit = async () => {
        setLoading(true);
        configService
            .addOrUpdateCredential(thisCred, credentialIndex)
            .then((credentials) => {
                setLoading(false);
                let verb = credentialIndex === 'create' ? 'Added ' : 'Updated ';
                createToast({
                    type: TOAST_TYPES.INFO,
                    title: 'Success',
                    message: `${verb} credential ${thisCred.credential_name}`,
                    autoDismiss: true,
                });
                handleCredentialsUpdate(credentials);
            })
            .catch((err) => {
                console.log(err);
                handleError(err, 'Error while adding/updating credentials.');
                setLoading(false);
            });
    };

    const getSaveIcon = () => {
        if (loading) {
            return <WaitSpinner size="small" />;
        }
        return <Save screenReaderText={null} />;
    };

    return (
        <Card className={'setup-card'}>
            <Card.Header title={(thisCred.state === 'new' ? 'New' : 'Edit') + ' Credentials'} />
            <Card.Body>
                <ControlGroup label="Credential Name" error={fieldErrors('credential_name')}>
                    <Text
                        value={thisCred.credential_name}
                        onChange={handleFieldChange('credential_name')}
                        disabled={loading}
                        data-test-id={'credential-credential_name'}
                    />
                </ControlGroup>
                <ControlGroup label="Username" error={fieldErrors('username')}>
                    <Text
                        value={thisCred.username}
                        onChange={handleFieldChange('username')}
                        disabled={loading}
                        data-test-id={'credential-username'}
                    />
                </ControlGroup>
                <ControlGroup label="Password" error={fieldErrors('password')}>
                    <Text
                        type="password"
                        canClear
                        value={thisCred.password}
                        onChange={handleFieldChange('password')}
                        onClick={onClickPassword}
                        disabled={loading}
                        data-test-id={'credential-password'}
                    />
                </ControlGroup>
                {thisCred.password_set !== '1' ? (
                    <ControlGroup label="Confirm Password" error={fieldErrors('password_confirm')}>
                        <Text
                            type="password"
                            value={thisCred.password_confirm}
                            onChange={handleFieldChange('password_confirm')}
                            disabled={loading}
                            data-test-id={'credential-password_confirm'}
                        />
                    </ControlGroup>
                ) : null}
                <ControlGroup
                    label="Tenant ID"
                    help="Tenant ID will be fetched on save if left blank."
                >
                    <Text
                        value={thisCred.tenant_id}
                        onChange={handleFieldChange('tenant_id')}
                        disabled={loading}
                    />
                </ControlGroup>
                <ControlGroup label="">
                    <Button
                        label="Save"
                        disabled={
                            !formValid() || isEqual(thisCred, { ...cred, password_confirm: '' })
                        }
                        icon={getSaveIcon()}
                        appearance="primary"
                        onClick={submit}
                        data-test-id={'credential-save-button'}
                    />
                    <Button label="Cancel" appearance="pill" onClick={cancel} />
                </ControlGroup>
            </Card.Body>
        </Card>
    );
};

export default CredentialComponent;
