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
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import Layout from '@/components/Layout';

// Mock data for devices
const mockDevices: Device[] = [
  {
    id: 1,
    name: 'MacBook Pro',
    user: 'john.doe@example.com',
    os: 'macOS 12.6',
    lastSeen: '2025-03-31T10:30:00Z',
    status: 'Compliant',
    ipAddress: '192.168.1.105',
    macAddress: '00:1B:44:11:3A:B7',
    serialNumber: 'C02F13KBMD6T',
  },
  {
    id: 2,
    name: 'Windows Laptop',
    user: 'jane.smith@example.com',
    os: 'Windows 11',
    lastSeen: '2025-03-31T11:15:00Z',
    status: 'Compliant',
    ipAddress: '192.168.1.106',
    macAddress: '00:1B:44:11:3A:B8',
    serialNumber: 'XYZ123456789',
  },
  {
    id: 3,
    name: 'Linux Workstation',
    user: 'bob.johnson@example.com',
    os: 'Ubuntu 22.04',
    lastSeen: '2025-03-31T09:45:00Z',
    status: 'Non-Compliant',
    ipAddress: '192.168.1.107',
    macAddress: '00:1B:44:11:3A:B9',
    serialNumber: 'LNX987654321',
  },
  {
    id: 4,
    name: 'iPhone 14',
    user: 'alice.wong@example.com',
    os: 'iOS 16.5',
    lastSeen: '2025-03-31T11:30:00Z',
    status: 'Compliant',
    ipAddress: '192.168.1.108',
    macAddress: '00:1B:44:11:3A:C0',
    serialNumber: 'IMEI123456789',
  },
  {
    id: 5,
    name: 'Android Phone',
    user: 'david.miller@example.com',
    os: 'Android 13',
    lastSeen: '2025-03-31T10:00:00Z',
    status: 'Non-Compliant',
    ipAddress: '192.168.1.109',
    macAddress: '00:1B:44:11:3A:C1',
    serialNumber: 'AND987654321',
  },
];

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');

  const handleOpenDialog = (mode: 'add' | 'edit', device?: Device) => {
    setDialogMode(mode);
    setSelectedDevice(device || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDevice(null);
  };

  const handleSaveDevice = () => {
    // In a real application, this would send data to an API
    if (dialogMode === 'add') {
      // Add new device logic
      console.log('Adding new device');
    } else {
      // Edit device logic
      console.log('Editing device', selectedDevice);
    }
    handleCloseDialog();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Device Name', flex: 1 },
    { field: 'user', headerName: 'User', flex: 1 },
    { field: 'os', headerName: 'OS', flex: 1 },
    {
      field: 'lastSeen',
      headerName: 'Last Seen',
      flex: 1,
      valueFormatter: (params: { value: any }) => {
        if (params.value) {
          return formatDate(params.value as string);
        }
        return '';
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value as string}
          color={params.value === 'Compliant' ? 'success' : 'error'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => handleOpenDialog('edit', params.row as Device)}
          >
            Edit
          </Button>
          <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Layout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Devices
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" startIcon={<RefreshIcon />}>
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog('add')}
          >
            Add Device
          </Button>
        </Box>
      </Box>

      <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={devices}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>

      {/* Add/Edit Device Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{dialogMode === 'add' ? 'Add New Device' : 'Edit Device'}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            {dialogMode === 'add'
              ? 'Enter the details for the new device.'
              : 'Update the device information.'}
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Device Name"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={selectedDevice?.name || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="user"
                label="User Email"
                type="email"
                fullWidth
                variant="outlined"
                defaultValue={selectedDevice?.user || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="os-label">Operating System</InputLabel>
                <Select
                  labelId="os-label"
                  id="os"
                  label="Operating System"
                  defaultValue={selectedDevice?.os || ''}
                >
                  <MenuItem value="macOS 12.6">macOS 12.6</MenuItem>
                  <MenuItem value="Windows 11">Windows 11</MenuItem>
                  <MenuItem value="Ubuntu 22.04">Ubuntu 22.04</MenuItem>
                  <MenuItem value="iOS 16.5">iOS 16.5</MenuItem>
                  <MenuItem value="Android 13">Android 13</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  label="Status"
                  defaultValue={selectedDevice?.status || 'Compliant'}
                >
                  <MenuItem value="Compliant">Compliant</MenuItem>
                  <MenuItem value="Non-Compliant">Non-Compliant</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="ipAddress"
                label="IP Address"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={selectedDevice?.ipAddress || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="macAddress"
                label="MAC Address"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={selectedDevice?.macAddress || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="serialNumber"
                label="Serial Number"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={selectedDevice?.serialNumber || ''}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveDevice} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
