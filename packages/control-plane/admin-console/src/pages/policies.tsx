import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  Edit as EditIcon, 
  ExpandMore as ExpandMoreIcon,
  Security as SecurityIcon,
  DevicesOther as DevicesIcon,
  People as PeopleIcon,
  Apps as AppsIcon,
  AddCircleOutline as AddCircleOutlineIcon
} from '@mui/icons-material';
import Layout from '@/components/Layout';

// Mock data for policies
const mockPolicies: Policy[] = [
  {
    id: 1,
    name: 'Default Security Policy',
    description: 'Default security policy for all devices',
    status: 'Active',
    appliesTo: 'All Devices',
    createdBy: 'admin@example.com',
    createdAt: '2025-03-01T10:00:00Z',
    updatedAt: '2025-03-30T15:30:00Z',
    requirements: {
      deviceSecurity: {
        diskEncryption: true,
        firewallEnabled: true,
        antivirusEnabled: true,
        screenLockEnabled: true,
        minOsVersion: {
          windows: '10.0.19044',
          macos: '12.0.0',
          ios: '16.0.0',
          android: '13.0.0'
        }
      },
      authentication: {
        mfaRequired: true,
        passwordComplexity: 'High',
        passwordExpiryDays: 90,
        failedLoginAttempts: 5
      },
      networkSecurity: {
        vpnRequired: false,
        restrictedNetworks: ['public-wifi'],
        allowedCountries: ['US', 'CA', 'UK', 'JP', 'AU']
      }
    }
  },
  {
    id: 2,
    name: 'Engineering Team Policy',
    description: 'Enhanced security policy for engineering team',
    status: 'Active',
    appliesTo: 'Engineering Team',
    createdBy: 'security-lead@example.com',
    createdAt: '2025-03-10T09:15:00Z',
    updatedAt: '2025-03-28T11:45:00Z',
    requirements: {
      deviceSecurity: {
        diskEncryption: true,
        firewallEnabled: true,
        antivirusEnabled: true,
        screenLockEnabled: true,
        minOsVersion: {
          windows: '10.0.19044',
          macos: '12.0.0',
          ios: '16.0.0',
          android: '13.0.0'
        }
      },
      authentication: {
        mfaRequired: true,
        passwordComplexity: 'Very High',
        passwordExpiryDays: 60,
        failedLoginAttempts: 3
      },
      networkSecurity: {
        vpnRequired: true,
        restrictedNetworks: ['public-wifi', 'hotel-wifi', 'airport-wifi'],
        allowedCountries: ['US', 'CA']
      }
    }
  },
  {
    id: 3,
    name: 'Executive Policy',
    description: 'Security policy for executive team members',
    status: 'Active',
    appliesTo: 'Executive Team',
    createdBy: 'ciso@example.com',
    createdAt: '2025-03-15T14:30:00Z',
    updatedAt: '2025-03-29T16:20:00Z',
    requirements: {
      deviceSecurity: {
        diskEncryption: true,
        firewallEnabled: true,
        antivirusEnabled: true,
        screenLockEnabled: true,
        minOsVersion: {
          windows: '10.0.19044',
          macos: '12.0.0',
          ios: '16.0.0',
          android: '13.0.0'
        }
      },
      authentication: {
        mfaRequired: true,
        passwordComplexity: 'Very High',
        passwordExpiryDays: 30,
        failedLoginAttempts: 3
      },
      networkSecurity: {
        vpnRequired: true,
        restrictedNetworks: ['public-wifi', 'hotel-wifi', 'airport-wifi', 'cafe-wifi'],
        allowedCountries: ['US']
      }
    }
  }
];

export default function Policies() {
  const [policies, setPolicies] = useState<Policy[]>(mockPolicies);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [expandedPolicy, setExpandedPolicy] = useState<number | false>(false);

  const handleOpenDialog = (mode: 'add' | 'edit', policy?: Policy) => {
    setDialogMode(mode);
    setSelectedPolicy(policy || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPolicy(null);
  };

  const handleSavePolicy = () => {
    // In a real application, this would send data to an API
    if (dialogMode === 'add') {
      // Add new policy logic
      console.log('Adding new policy');
    } else {
      // Edit policy logic
      console.log('Editing policy', selectedPolicy);
    }
    handleCloseDialog();
  };

  const handlePolicyExpand = (policyId: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPolicy(isExpanded ? policyId : false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  return (
    <Layout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Security Policies
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog('add')}
        >
          Add Policy
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        {policies.map((policy) => (
          <Accordion 
            key={policy.id} 
            expanded={expandedPolicy === policy.id}
            onChange={handlePolicyExpand(policy.id)}
            sx={{ mb: 2 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`policy-${policy.id}-content`}
              id={`policy-${policy.id}-header`}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SecurityIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="h6">{policy.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{policy.description}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip 
                    label={policy.status} 
                    color={policy.status === 'Active' ? 'success' : 'default'} 
                    size="small" 
                  />
                  <Typography variant="body2" color="text.secondary">
                    Applies to: {policy.appliesTo}
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <DevicesIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">Device Security</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="Disk Encryption" 
                          secondary={policy.requirements.deviceSecurity.diskEncryption ? 'Required' : 'Not Required'} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Firewall" 
                          secondary={policy.requirements.deviceSecurity.firewallEnabled ? 'Required' : 'Not Required'} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Antivirus" 
                          secondary={policy.requirements.deviceSecurity.antivirusEnabled ? 'Required' : 'Not Required'} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Screen Lock" 
                          secondary={policy.requirements.deviceSecurity.screenLockEnabled ? 'Required' : 'Not Required'} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Minimum OS Versions" 
                          secondary={
                            <>
                              Windows: {policy.requirements.deviceSecurity.minOsVersion.windows}<br />
                              macOS: {policy.requirements.deviceSecurity.minOsVersion.macos}<br />
                              iOS: {policy.requirements.deviceSecurity.minOsVersion.ios}<br />
                              Android: {policy.requirements.deviceSecurity.minOsVersion.android}
                            </>
                          } 
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">Authentication</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="Multi-Factor Authentication" 
                          secondary={policy.requirements.authentication.mfaRequired ? 'Required' : 'Not Required'} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Password Complexity" 
                          secondary={policy.requirements.authentication.passwordComplexity} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Password Expiry" 
                          secondary={`${policy.requirements.authentication.passwordExpiryDays} days`} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Failed Login Attempts" 
                          secondary={`Lock after ${policy.requirements.authentication.failedLoginAttempts} attempts`} 
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AppsIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">Network Security</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <List dense>
                      <ListItem>
                        <ListItemText 
                          primary="VPN Required" 
                          secondary={policy.requirements.networkSecurity.vpnRequired ? 'Yes' : 'No'} 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Restricted Networks" 
                          secondary={
                            policy.requirements.networkSecurity.restrictedNetworks.length > 0 
                              ? policy.requirements.networkSecurity.restrictedNetworks.join(', ')
                              : 'None'
                          } 
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Allowed Countries" 
                          secondary={
                            policy.requirements.networkSecurity.allowedCountries.length > 0 
                              ? policy.requirements.networkSecurity.allowedCountries.join(', ')
                              : 'All'
                          } 
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Last updated: {formatDate(policy.updatedAt)}
                    </Typography>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenDialog('edit', policy)}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      color="error" 
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Add/Edit Policy Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{dialogMode === 'add' ? 'Add New Policy' : 'Edit Policy'}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            {dialogMode === 'add' 
              ? 'Create a new security policy to protect endpoints.' 
              : 'Update the security policy settings.'}
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Policy Name"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={selectedPolicy?.name || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                rows={2}
                defaultValue={selectedPolicy?.description || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  label="Status"
                  defaultValue={selectedPolicy?.status || 'Active'}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="appliesTo"
                label="Applies To"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={selectedPolicy?.appliesTo || ''}
              />
            </Grid>
            
            {/* Device Security Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Device Security Requirements
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch 
                    defaultChecked={selectedPolicy?.requirements?.deviceSecurity?.diskEncryption || true} 
                  />
                }
                label="Require Disk Encryption"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch 
                    defaultChecked={selectedPolicy?.requirements?.deviceSecurity?.firewallEnabled || true} 
                  />
                }
                label="Require Firewall"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch 
                    defaultChecked={selectedPolicy?.requirements?.deviceSecurity?.antivirusEnabled || true} 
                  />
                }
                label="Require Antivirus"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch 
                    defaultChecked={selectedPolicy?.requirements?.deviceSecurity?.screenLockEnabled || true} 
                  />
                }
                label="Require Screen Lock"
              />
            </Grid>
            
            {/* Authentication Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Authentication Requirements
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch 
                    defaultChecked={selectedPolicy?.requirements?.authentication?.mfaRequired || true} 
                  />
                }
                label="Require Multi-Factor Authentication"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="password-complexity-label">Password Complexity</InputLabel>
                <Select
                  labelId="password-complexity-label"
                  id="passwordComplexity"
                  label="Password Complexity"
                  defaultValue={selectedPolicy?.requirements?.authentication?.passwordComplexity || 'High'}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Very High">Very High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {/* Network Security Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Network Security Requirements
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch 
                    defaultChecked={selectedPolicy?.requirements?.networkSecurity?.vpnRequired || false} 
                  />
                }
                label="Require VPN Connection"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSavePolicy} variant="contained">Save Policy</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}