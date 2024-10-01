import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField, InputAdornment, Grid, Typography } from '@mui/material';
import Modal from '../Modales/Modal';
import clienteAxios from '../../services/clienteAxios';
import { Add, Delete, Edit, RemoveRedEye, Search } from '@mui/icons-material';
import tableStyles from '../../styles/TableStyle';
import { useTheme } from '../../context/ThemeContext';
import CustomAlert from '../Alertas/Alert';
import Loader from '../../components/Loader/Loader';
import RefreshRounded from '@mui/icons-material/RefreshRounded';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const AsistentesPage = () => {
  const { theme } = useTheme();
  const styles = tableStyles(theme);

  const [asistentes, setAsistentes] = useState([]);
  const [filteredAsistentes, setFilteredAsistentes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentAsistente, setCurrentAsistente] = useState({
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    email: '',
    celular: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [asistenteIdToDelete, setAsistenteIdToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchAsistentes();
  }, []);

  useEffect(() => {
    const filtered = asistentes.filter((asistente) =>
      asistente.nombres.toLowerCase().includes(searchText.toLowerCase()) ||
      asistente.email.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredAsistentes(filtered);
  }, [searchText, asistentes]);

  const fetchAsistentes = async () => {
    setIsLoading(true);
    try {
      const response = await clienteAxios.get('/asistentes/');
      setAsistentes(response.data);
      setFilteredAsistentes(response.data);
    } catch (error) {
      console.error('Error al obtener los asistentes', error);
      setAlertMessage('Error al obtener los asistentes');
      setAlertType('error');
      setOpenAlert(true);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleOpenModal = (asistente = null) => {
    if (asistente) {
      setModalTitle('Editar Asistente');
      setCurrentAsistente(asistente);
      setIsEditing(true);
    } else {
      setModalTitle('Crear Nuevo Asistente');
      setCurrentAsistente({
        nombres: '',
        apellidos: '',
        fecha_nacimiento: '',
        email: '',
        celular: '',
      });
      setIsEditing(false);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const requiredFields = ['nombres', 'apellidos', 'email', 'celular', 'fecha_nacimiento'];

  const validateFields = () => {
    for (const field of requiredFields) {
      if (!currentAsistente[field]) {
        setAlertMessage(`El campo ${field} es requerido.`);
        setAlertType('error');
        setOpenAlert(true);
        return false;
      }
    }
    return true;
  };

  const handleSaveAsistente = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      if (isEditing) {
        await clienteAxios.put(`/asistentes/${currentAsistente.id}`, currentAsistente);
        setAlertMessage('Asistente actualizado exitosamente');
      } else {
        await clienteAxios.post('/asistentes/crear', currentAsistente);
        setAlertMessage('Asistente creado exitosamente');
      }
      setAlertType('success');
      setOpenAlert(true);
      fetchAsistentes();
      handleCloseModal();
    } catch (error) {
      setAlertMessage('Error al guardar el asistente');
      setAlertType('error');
      setOpenAlert(true);
    }
  };

  const handleOpenDeleteModal = (id) => {
    setAsistenteIdToDelete(id);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setAsistenteIdToDelete(null);
  };

  const handleOpenViewModal = (asistente) => {
    setCurrentAsistente(asistente);
    setModalTitle('Detalles del Asistente');
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setCurrentAsistente(null);
  };

  const handleConfirmDelete = async () => {
    if (asistenteIdToDelete) {
      try {
        await clienteAxios.delete(`/asistentes/${asistenteIdToDelete}`);
        setAlertMessage('Asistente eliminado exitosamente');
        setAlertType('success');
        setOpenAlert(true);
        fetchAsistentes();
      } catch (error) {
        setAlertMessage('Error al eliminar el asistente');
        setAlertType('error');
        setOpenAlert(true);
      } finally {
        handleCloseDeleteModal();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAsistente((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const columns = [
    { field: 'id', headerName: '#', flex: 0.5 },
    {
      field: 'nombreCompleto',
      headerName: 'NOMBRE',
      flex: 2,
      renderCell: (params) => (
        <div style={{ textTransform: 'uppercase' }}>
          {`${params.row.nombres} ${params.row.apellidos}`}
        </div>
      ),
    },
    {
      field: 'email', headerName: 'EMAIL', flex: 1, renderCell: (params) => (
        <div style={{ textTransform: 'uppercase' }}>
          {params.value}
        </div>
      ),

    },
    {
      field: 'celular', headerName: 'TELÉFONO', flex: 1,
    },
    {
      field: 'fecha_nacimiento', headerName: 'FECHA NACIMIENTO', flex: 1,
    },
    {
      field: 'actions',
      headerName: 'ACCIONES',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleOpenViewModal(params.row)}>
            <RemoveRedEye color="primary" />
          </Button>
          <Button onClick={() => handleOpenModal(params.row)}>
            <Edit color='warning' />
          </Button>
          <Button onClick={() => handleOpenDeleteModal(params.row.id)}>
            <Delete color="error" />
          </Button>
        </>
      ),
    },
  ];

  return (

    <Grid container style={styles.pages}>
      
      {isLoading ? (
        <Loader />
      ) : (
        <>
        
    <Typography variant='h4'>GESTÓN ASISTENTES</Typography>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item spacing={2}>
              <Button
                variant="contained"
                style={styles.button}
                onClick={() => handleOpenModal(null)}
                startIcon={<Add />}
              >
                Crear Asistente
              </Button>

              <Button
                variant="outlined"
                style={{ ...styles.button, marginLeft: 4 }}
                onClick={fetchAsistentes}
                startIcon={<RefreshRounded />}
              >
                Refrescar
              </Button>
            </Grid>
            <Grid item>
              <TextField
                label="Buscar asistente"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                sx={{ ...styles.textField }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search style={styles.iconButton} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Box style={{ height: 600, width: '100%', marginTop: '20px' }}>
            <DataGrid
              rows={filteredAsistentes.slice(0, 50)}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 25]}
              disableSelectionOnClick
              pagination
              sx={styles.table}
            />
          </Box>

          <CustomAlert
            open={openAlert}
            handleClose={handleCloseAlert}
            message={alertMessage}
            severity={alertType}
          />

          <Modal
            open={openDeleteModal}
            title="Confirmar Eliminación"
            content="¿Estás seguro de que deseas eliminar este asistente?"
            actions={[
              { label: 'Cancelar', onClick: handleCloseDeleteModal, color: 'primary' },
              { label: 'Eliminar', onClick: handleConfirmDelete, color: 'error' }
            ]}
            handleClose={handleCloseDeleteModal}
          />

          <Modal
            open={openModal}
            title={modalTitle}
            content={
              <>
                <Grid container spacing={2}>
                  <Grid item xs={6} >
                    <TextField
                      label="Nombres"
                      name="nombres"
                      value={currentAsistente.nombres}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={6} >
                    <TextField
                      label="Apellidos"
                      name="apellidos"
                      value={currentAsistente.apellidos}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={6} >
                    <TextField
                      label="Email"
                      name="email"
                      type='email'
                      value={currentAsistente.email}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={6} >
                    <TextField
                      label="Teléfono"
                      name="celular"
                      value={currentAsistente.celular}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={6} >
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker
                        sx={styles.textField}
                        label="Fecha Nacimiento"
                        value={currentAsistente?.fecha ? dayjs(currentAsistente.fecha_nacimiento) : null}
                        onChange={(newValue) => handleInputChange({ target: { name: 'fecha_nacimiento', value: newValue } })}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />

                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </>
            }
            actions={[
              { label: 'Cancelar', onClick: handleCloseModal, color: 'primary' },
              { label: isEditing ? 'Actualizar' : 'Crear', onClick: handleSaveAsistente, color: 'primary' },
            ]}
            handleClose={handleCloseModal}
          />

          <Modal
            open={openViewModal}
            title={modalTitle}
            content={
              <>
                <div><strong>Nombres:</strong> {currentAsistente.nombres}</div>
                <div><strong>Apellidos:</strong> {currentAsistente.apellidos}</div>
                <div><strong>Email:</strong> {currentAsistente.email}</div>
                <div><strong>Teléfono:</strong> {currentAsistente.celular}</div>
                <div><strong>Fecha Nacimiento:</strong> {currentAsistente.fecha_nacimiento}</div>
              </>
            }
            actions={[
              { label: 'Cerrar', onClick: handleCloseViewModal, color: 'primary' },
            ]}
            handleClose={handleCloseViewModal}
          />
        </>
      )}
    </Grid>
  );
};

export default AsistentesPage;
