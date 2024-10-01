import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField, InputAdornment, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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

const CodigosPromocionalesPage = () => {
  const { theme } = useTheme();
  const styles = tableStyles(theme);

  const [codigos, setCodigos] = useState([]);
  const [filteredCodigos, setFilteredCodigos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentCodigo, setCurrentCodigo] = useState({ codigo: '', valor: '', fecha_inicio: '', fecha_cierre: '', estado: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [codigoIdToDelete, setCodigoIdToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchCodigos();
  }, []);

  useEffect(() => {
    const filtered = codigos.filter((codigo) =>
      codigo.codigo.toLowerCase().includes(searchText.toLowerCase()) ||
      codigo.descripcion.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCodigos(filtered);
  }, [searchText, codigos]);

  const fetchCodigos = async () => {
    setIsLoading(true);
    try {
      const response = await clienteAxios.get('/codigos-promocionales/');
      setCodigos(response.data);
      setFilteredCodigos(response.data);
    } catch (error) {
      console.error('Error al obtener los códigos', error);
      setAlertMessage('Error al obtener los códigos');
      setAlertType('error');
      setOpenAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (codigo = null) => {
    if (codigo) {
      setModalTitle('Editar Código');
      setCurrentCodigo(codigo);
      setIsEditing(true);
    } else {
      setModalTitle('Crear Nuevo Código');
      setCurrentCodigo({ codigo: '', valor: '', fecha_inicio: '', fecha_cierre: '', estado: '' });
      setIsEditing(false);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const requiredFields = ['codigo', 'valor', 'fecha_inicio', 'fecha_cierre', 'estado'];

  const validateFields = () => {
    for (const field of requiredFields) {
      if (!currentCodigo[field]) {
        setAlertMessage(`El campo ${field} es requerido.`);
        setAlertType('error');
        setOpenAlert(true);
        return false;
      }
    }
    return true;
  };

  const handleSaveCodigo = async () => {
    if (!validateFields()) {
        return;
    }

    // Verifica si el código ya existe
    const existingCodigo = codigos.find(codigo => codigo.codigo === currentCodigo.codigo);
    if (!isEditing && existingCodigo) {
        setAlertMessage('El código ya existe.');
        setAlertType('error');
        setOpenAlert(true);
        return;
    }

    try {
        if (isEditing) {
            await clienteAxios.put(`/codigos-promocionales/${currentCodigo.id}`, currentCodigo);
            setAlertMessage('Código actualizado exitosamente');
        } else {
            await clienteAxios.post('/codigos-promocionales/crear', currentCodigo);
            setAlertMessage('Código creado exitosamente');
        }
        setAlertType('success');
        setOpenAlert(true);
        fetchCodigos();
        handleCloseModal();
    } catch (error) {
        setAlertMessage('Error al guardar el código');
        setAlertType('error');
        setOpenAlert(true);
    }
};



  const handleOpenDeleteModal = (id) => {
    setCodigoIdToDelete(id);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setCodigoIdToDelete(null);
  };

  const handleOpenViewModal = (codigo) => {
    setCurrentCodigo(codigo);
    setModalTitle('Detalles del Código');
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setCurrentCodigo(null);
  };

  const handleConfirmDelete = async () => {
    if (codigoIdToDelete) {
      try {
        await clienteAxios.delete(`/codigos-promocionales/${codigoIdToDelete}`);
        setAlertMessage('Código eliminado exitosamente');
        setAlertType('success');
        setOpenAlert(true);
        fetchCodigos();
      } catch (error) {
        setAlertMessage('Error al eliminar el código');
        setAlertType('error');
        setOpenAlert(true);
      } finally {
        handleCloseDeleteModal();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCodigo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const columns = [
    { field: 'id', headerName: '#', flex: 0.5 },
    { field: 'codigo', headerName: 'CÓDIGO', flex: 1 },
    { field: 'fecha_inicio_codigo_promocional', headerName: 'INICIO', flex: 1 },
    { field: 'fecha_cierre_codigo_promocional', headerName: 'CIERRE', flex: 1 },
    { field: 'estado', headerName: 'ESTADO', flex: 1,  renderCell: (params) => (
      <div style={{ textTransform: 'uppercase' }}>
        {params.value}
      </div>
    ),},
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
          <Typography variant='h4'>GESTIÓN CÓDIGOS</Typography>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item spacing={2}>
              <Button
                variant="contained"
                style={styles.button}
                onClick={() => handleOpenModal(null)}
                startIcon={<Add />}
              >
                Crear Código
              </Button>

              <Button
                variant="outlined"
                style={{ ...styles.button, marginLeft: 4 }}
                onClick={fetchCodigos}
                startIcon={<RefreshRounded />}
              >
                Refrescar
              </Button>
            </Grid>
            <Grid item>
              <TextField
                label="Buscar código"
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
              rows={filteredCodigos.slice(0, 50)}
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
            content="¿Estás seguro de que deseas eliminar este código?"
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
                  <Grid item xs={6}>
                    <TextField
                      label="Código"
                      name="codigo"
                      value={currentCodigo.codigo}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Valor"
                      name="valor"
                      value={currentCodigo.valor}
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
                        label="Fecha Inicio Codigo"
                        value={currentCodigo?.fecha ? dayjs(currentCodigo.fecha_inicio) : null}
                        onChange={(newValue) => handleInputChange({ target: { name: 'fecha_inicio', value: newValue } })}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />

                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6} >
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker
                        sx={styles.textField}
                        label="Fecha Cierre Codigo"
                        value={currentCodigo?.fecha ? dayjs(currentCodigo.fecha_cierre) : null}
                        onChange={(newValue) => handleInputChange({ target: { name: 'fecha_cierre', value: newValue } })}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth sx={styles.textField}>
                      <InputLabel>Estado</InputLabel>
                      <Select
                        value={currentCodigo?.estado || ''}
                        onChange={handleInputChange}
                        label="Estado"
                        name="estado"
                      >
                        <MenuItem value="disponible">Disponible</MenuItem>
                        <MenuItem value="no_disponible">No Disponible</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </>
            }
            actions={[
              { label: 'Cancelar', onClick: handleCloseModal, color: 'primary' },
              { label: isEditing ? 'Guardar Cambios' : 'Crear Código', onClick: handleSaveCodigo, color: 'primary' }
            ]}
            handleClose={handleCloseModal}
          />

          <Modal
            open={openViewModal}
            title={modalTitle}
            content={
              <>
                <div><strong>Codigo:</strong> {currentCodigo.codigo}</div>
                <div><strong>Valor:</strong> {currentCodigo.valor}</div>
                <div><strong>Fecha Inicio Codigo Promocional:</strong> {currentCodigo.fecha_inicio_codigo_promocional}</div>
                <div><strong>Fecha Cierre Codigo Promocional:</strong> {currentCodigo.fecha_cierre_codigo_promocional}</div>
                <div><strong>Estado:</strong> {currentCodigo.estado}</div>
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

export default CodigosPromocionalesPage;
