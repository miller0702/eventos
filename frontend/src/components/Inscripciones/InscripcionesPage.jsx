import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField, InputAdornment, Grid, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
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

const InscripcionesPage = () => {
  const { theme } = useTheme();
  const styles = tableStyles(theme);

  const [inscripciones, setInscripciones] = useState([]);
  const [filteredInscripciones, setFilteredInscripciones] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentInscripciones, setcurrentInscripciones] = useState({
    id_cliente: '', id_evento: '', fecha_inscripcion: '', tipo_entrada: '', valor: '', categoria_evento: '', fecha_evento: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [inscripcionIdToDelete, setInscripcioneIdToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [asistentes, setAsistentes] = useState([]);
  const [codigos, setCodigosPromocionales] = useState([]);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetchInscripciones();
    fetchEventos();
    fetchAsistentes();
    fetchCodigos();
  }, []);

  useEffect(() => {
    const filtered = inscripciones.filter((inscripcion) =>
      inscripcion.nombres.toLowerCase().includes(searchText.toLowerCase()) ||
      inscripcion.email.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredInscripciones(filtered);
  }, [searchText, inscripciones]);

  const fetchEventos = async () => {
    try {
      const response = await clienteAxios.get('/eventos/');
      setEventos(response.data);
    } catch (error) {
      console.error('Error al obtener eventos', error);
    }
  };

  const fetchAsistentes = async () => {
    try {
      const response = await clienteAxios.get('/asistentes/');
      setAsistentes(response.data);
    } catch (error) {
      console.error('Error al obtener asistentes', error);
    }
  };

  const fetchCodigos = async () => {
    try {
      const response = await clienteAxios.get('/codigos-promocionales/');
      setCodigosPromocionales(response.data);
    } catch (error) {
      console.error('Error al obtener códigos promocionales', error);
    }
  };

  const fetchInscripciones = async () => {
    setIsLoading(true);
    try {
      const response = await clienteAxios.get('/inscripciones/');
      setInscripciones(response.data);
      setFilteredInscripciones(response.data);
    } catch (error) {
      console.error('Error al obtener los inscripciones', error);
      setAlertMessage('Error al obtener los inscripciones');
      setAlertType('error');
      setOpenAlert(true);
    } finally {
      setIsLoading(false);
    }
  };


  const handleOpenModal = (inscripcion = null) => {
    if (inscripcion) {
      setModalTitle('Editar Inscripciones');
      setcurrentInscripciones(inscripcion);
      setIsEditing(true);
    } else {
      setModalTitle('Crear Nuevo Inscripciones');
      setcurrentInscripciones({
        id_cliente: '', id_evento: '', fecha_inscripcion: '', tipo_entrada: '', valor: '', categoria_evento: '', fecha_evento: ''
      });
      setIsEditing(false);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const requiredFields = ['id_cliente', 'id_evento', 'fecha_inscripcion', 'tipo_entrada', 'valor', 'categoria_evento', 'fecha_evento', 'codigo_promocional'];

  const validateFields = () => {
    for (const field of requiredFields) {
      if (!currentInscripciones[field]) {
        setAlertMessage(`El campo ${field} es requerido.`);
        setAlertType('error');
        setOpenAlert(true);
        return false;
      }
    }
    return true;
  };


  const handleSaveInscripcione = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      if (isEditing) {
        await clienteAxios.put(`/inscripciones/${currentInscripciones.id}`, currentInscripciones);
        setAlertMessage('Inscripciones actualizado exitosamente');
      } else {
        await clienteAxios.post('/inscripciones/crear', currentInscripciones);
        setAlertMessage('Inscripciones creado exitosamente');
      }
      setAlertType('success');
      setOpenAlert(true);
      fetchInscripciones();
      handleCloseModal();
    } catch (error) {
      setAlertMessage('Error al guardar el inscripcion');
      setAlertType('error');
      setOpenAlert(true);
    }
  };

  const handleOpenDeleteModal = (id) => {
    setInscripcioneIdToDelete(id);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setInscripcioneIdToDelete(null);
  };

  const handleOpenViewModal = (inscripcion) => {
    setcurrentInscripciones(inscripcion);
    setModalTitle('Detalles del Inscripciones');
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setcurrentInscripciones(null);
  };

  const handleConfirmDelete = async () => {
    if (inscripcionIdToDelete) {
      try {
        await clienteAxios.delete(`/inscripciones/${inscripcionIdToDelete}`);
        setAlertMessage('Inscripciones eliminado exitosamente');
        setAlertType('success');
        setOpenAlert(true);
        fetchInscripciones();
      } catch (error) {
        setAlertMessage('Error al eliminar el inscripcion');
        setAlertType('error');
        setOpenAlert(true);
      } finally {
        handleCloseDeleteModal();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setcurrentInscripciones((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const columns = [
    { field: 'id', headerName: '#', flex: 0.5 },
    {
      field: 'nombreCompleto',
      headerName: 'NOMBRE',
      flex: 1,
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

          <Typography variant='h4'>GESTÓN INSCRIPCIONES</Typography>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item spacing={2}>
              <Button
                variant="contained"
                style={styles.button}
                onClick={() => handleOpenModal(null)}
                startIcon={<Add />}
              >
                Crear Inscripciones
              </Button>

              <Button
                variant="outlined"
                style={{ ...styles.button, marginLeft: 4 }}
                onClick={fetchInscripciones}
                startIcon={<RefreshRounded />}
              >
                Refrescar
              </Button>
            </Grid>
            <Grid item>
              <TextField
                label="Buscar inscripcion"
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
              rows={filteredInscripciones.slice(0, 50)}
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
            content="¿Estás seguro de que deseas eliminar este inscripcion?"
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
                    <FormControl fullWidth margin="normal" sx={styles.textField}>
                      <InputLabel id="select-cliente-label">Cliente</InputLabel>
                      <Select
                        labelId="select-cliente-label"
                        name="id_cliente"
                        value={currentInscripciones.id_cliente}
                        onChange={handleInputChange}
                      >
                        {asistentes.map((asistente) => (
                          <MenuItem key={asistente.id} value={asistente.id}>
                            {asistente.nombres}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth margin="normal" sx={styles.textField}>
                      <InputLabel id="select-evento-label">Evento</InputLabel>
                      <Select
                        labelId="select-evento-label"
                        name="id_evento"
                        value={currentInscripciones.id_evento}
                        onChange={handleInputChange}
                      >
                        {eventos.map((evento) => (
                          <MenuItem key={evento.id} value={evento.id}>
                            {evento.titulo}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth sx={styles.textField}>
                      <InputLabel>Tipo Entrada</InputLabel>
                      <Select
                        value={currentInscripciones?.tipo_entrada || ''}
                        onChange={handleInputChange}
                        label="Tipo Entrada"
                        name="tipo_entrada"
                      >
                        <MenuItem value="general">General</MenuItem>
                        <MenuItem value="vip">VIP</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Valor"
                      name="valor"
                      value={currentInscripciones.valor}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Código Promocional"
                      name="codigo_promocional"
                      value={currentInscripciones.codigo_promocional || ''}
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
                        value={currentInscripciones?.fecha ? dayjs(currentInscripciones.fecha_inscripcion) : null}
                        onChange={(newValue) => handleInputChange({ target: { name: 'fecha_inscripcion', value: newValue } })}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />

                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </>
            }
            actions={[
              { label: 'Cancelar', onClick: handleCloseModal, color: 'primary' },
              { label: isEditing ? 'Actualizar' : 'Crear', onClick: handleSaveInscripcione, color: 'primary' },
            ]}
            handleClose={handleCloseModal}
          />

          <Modal
            open={openViewModal}
            title={modalTitle}
            content={
              <>
                <div><strong>Nombres:</strong> {currentInscripciones.nombres}</div>
                <div><strong>Apellidos:</strong> {currentInscripciones.apellidos}</div>
                <div><strong>Email:</strong> {currentInscripciones.email}</div>
                <div><strong>Teléfono:</strong> {currentInscripciones.celular}</div>
                <div><strong>Fecha Nacimiento:</strong> {currentInscripciones.fecha_nacimiento}</div>
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

export default InscripcionesPage;
