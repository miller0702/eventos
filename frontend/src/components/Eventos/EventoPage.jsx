import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Modal from '../Modales/Modal';
import clienteAxios from '../../services/clienteAxios';
import { Add, Delete, Edit, LocalShippingRounded, RemoveRedEye, Search } from '@mui/icons-material';
import tableStyles from '../../styles/TableStyle';
import { useTheme } from '../../context/ThemeContext';
import CustomAlert from '../Alertas/Alert';
import Loader from '../../components/Loader/Loader';
import RefreshRounded from '@mui/icons-material/RefreshRounded';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const EventosPage = () => {
  const { theme } = useTheme();
  const styles = tableStyles(theme);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentEvent, setCurrentEvent] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    lugar: '',
    cupo_disponible: '',
    tipo: '',
    valor_base: '',
    fecha_apertura_inscripciones: '',
    fecha_cierre_inscripciones: '',
    categoria: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tipo, setTipo] = useState(currentEvent?.tipo || '');
  const [tipoPago, setTipoPago] = useState(currentEvent?.tipoPago || '');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) =>
      event.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
      event.descripcion.toLowerCase().includes(searchText.toLowerCase()) ||
      event.categoria.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchText, events]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await clienteAxios.get('/eventos/');
      setEvents(response.data);
      setFilteredEvents(response.data);
    } catch (error) {
      console.error('Error al obtener los eventos', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (event = null) => {
    if (event) {
      setModalTitle('Editar Evento');
      setCurrentEvent(event);
      setIsEditing(true);
    } else {
      setModalTitle('Crear Nuevo Evento');
      setCurrentEvent({
        titulo: '',
        descripcion: '',
        fecha: '',
        hora: '',
        lugar: '',
        cupo_disponible: '',
        tipo: '',
        valor_base: '',
        fecha_apertura_inscripciones: '',
        fecha_cierre_inscripciones: '',
        categoria: '',
      });
      setIsEditing(false);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const requiredFields = [
    'titulo',
    'descripcion',
    'fecha',
    'hora',
    'lugar',
    'cupo_disponible',
    'tipo',
    'valor_base',
    'fecha_apertura_inscripciones',
    'fecha_cierre_inscripciones',
    'categoria',
  ];

  const validateFields = () => {
    for (const field of requiredFields) {
      if (field === 'valor_base' && currentEvent.tipo === 'gratis' && currentEvent.valor_base === 0) {
        continue;
      }
      if (!currentEvent[field]) {
        setAlertMessage(`El campo ${field} es requerido.`);
        setAlertType('error');
        setOpenAlert(true);
        return false;
      }
    }
    return true;
  };

  const handleSaveEvent = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      if (isEditing) {
        await clienteAxios.put(`/eventos/${currentEvent.id}`, currentEvent);
        setAlertMessage('Evento actualizado exitosamente');
      } else {
        await clienteAxios.post('/eventos/crear', currentEvent);
        setAlertMessage('Evento creado exitosamente');
      }
      setAlertType('success');
      setOpenAlert(true);
      fetchEvents();
      handleCloseModal();
    } catch (error) {
      setAlertMessage('Error al guardar el evento');
      setAlertType('error');
      setOpenAlert(true);
    }
  };


  const handleOpenDeleteModal = (id) => {
    setEventIdToDelete(id);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setEventIdToDelete(null);
  };

  const handleOpenViewModal = (event) => {
    setCurrentEvent(event);
    setModalTitle('Detalles del Evento');
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setCurrentEvent(null);
  };

  const handleConfirmDelete = async () => {
    if (eventIdToDelete) {
      try {
        await clienteAxios.delete(`/eventos/${eventIdToDelete}`);
        setAlertMessage('Evento eliminado exitosamente');
        setAlertType('success');
        setOpenAlert(true);
        fetchEvents();
      } catch (error) {
        setAlertMessage('Error al eliminar el evento');
        setAlertType('error');
        setOpenAlert(true);
      } finally {
        handleCloseDeleteModal();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'fecha_apertura_inscripciones' || name === 'fecha_cierre_inscripciones') {
      const dateValue = dayjs(value).format('YYYY-MM-DD');
      setCurrentEvent((prev) => ({ ...prev, [name]: dateValue }));
    } else {
      setCurrentEvent((prev) => ({ ...prev, [name]: value }));
    }

    if (currentEvent.tipo === 'gratis') {
      updatedEvent.valor_base = 0;
    }
  };




  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const columns = [
    { field: 'id', headerName: '#', flex: 0.5 },
    {
      field: 'categoria', headerName: 'CATEGORIA', flex: 1, renderCell: (params) => (
        <div style={{ textTransform: 'uppercase' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'titulo', headerName: 'TITULO', flex: 1, renderCell: (params) => (
        <div style={{ textTransform: 'uppercase' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'descripcion', headerName: 'DESCRIPCIÓN', flex: 2, renderCell: (params) => (
        <div style={{ textTransform: 'uppercase' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cupo_disponible',
      headerName: 'CUPOS',
      flex: 1,
      renderCell: (params) => {
        const cuposValue = params.value;
        let color;

        if (cuposValue < 10) {
          color = 'red';
        } else if (cuposValue >= 10 && cuposValue <= 15) {
          color = 'orange';
        } else {
          color = 'green';
        }

        return (
          <Box style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: 4,
            width: '40px',
            height: '40px',
            backgroundColor: color,
            color: 'white',
            borderRadius: '5px',
          }}>
            {cuposValue}
          </Box>
        );
      },
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

  const handleTipoChange = (event) => {
    setTipo(event.target.value);
    if (event.target.value !== 'pago') {
      setTipoPago('');
    }
  };

  return (
    <Grid container style={styles.pages}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
        <Typography variant='h4'>GESTÓN EVENTOS</Typography>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item spacing={2}>
              <Button
                variant="contained"
                style={styles.button}
                onClick={() => handleOpenModal(null)}
                startIcon={<Add />}
              >
                Crear Evento
              </Button>

              <Button
                variant="outlined"
                style={{ ...styles.button, marginLeft: 4 }}
                onClick={fetchEvents}
                startIcon={<RefreshRounded />}
              >
                Refrescar
              </Button>
            </Grid>
            <Grid item>
              <TextField
                label="Buscar evento"
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
              rows={filteredEvents.slice(0, 50)}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 25]}
              disableSelectionOnClick
              pagination
              localeText={{
                MuiTablePagination: {
                  labelRowsPerPage: 'Filas por página:',
                  labelDisplayedRows: ({ from, to, count }) =>
                    `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
                },
                toolbarFilters: 'Filtros',
                filterPanelOperators: 'Operadores',
                filterPanelInputPlaceholder: 'Valor',
                filterPanelColumns: 'Columnas',
                filterOperatorContains: 'Contiene',
                filterOperatorEquals: 'Igual a',
                filterOperatorStartsWith: 'Empieza con',
                filterOperatorEndsWith: 'Termina con',
                filterOperatorIsEmpty: 'Está vacío',
                filterOperatorIsNotEmpty: 'No está vacío',
                filterOperatorIsAnyOf: 'Es cualquiera de',
                columnMenuLabel: 'Menú',
                columnMenuShowColumns: 'Mostrar columnas',
                columnMenuFilter: 'Filtro',
                columnMenuHideColumn: 'Ocultar',
                columnMenuUnsort: 'Quitar orden',
                columnMenuSortAsc: 'Orden ascendente',
                columnMenuSortDesc: 'Orden descendente',
                columnMenuManageColumns: 'Gestionar columnas',
              }}
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
            content="¿Estás seguro de que deseas eliminar este evento?"
            actions={[
              { label: 'Cancelar', onClick: handleCloseDeleteModal, color: 'primary' },
              { label: 'Eliminar', onClick: handleConfirmDelete, color: 'error' }
            ]}
            handleClose={handleCloseDeleteModal}
          />

          <Modal
            open={openViewModal}
            title={modalTitle}
            handleClose={handleCloseViewModal}
            content={
              currentEvent && (
                <Box>
                  <p><strong>Titulo:</strong> {currentEvent.titulo}</p>
                  <p><strong>Descripción:</strong> {currentEvent.descripcion}</p>
                  <p><strong>Fecha:</strong> {currentEvent.fecha}</p>
                  <p><strong>Hora:</strong> {currentEvent.hora}</p>
                  <p><strong>Lugar:</strong> {currentEvent.lugar}</p>
                  <p><strong>Cupo Disponible:</strong> {currentEvent.cupo_disponible}</p>
                  <p><strong>Valor Base:</strong> {currentEvent.valor_base}</p>
                  <p><strong>Fecha Apertura Inscripciones:</strong> {currentEvent.fecha_apertura_inscripciones}</p>
                  <p><strong>Fecha Cierre Inscripciones:</strong> {currentEvent.fecha_cierre_inscripciones}</p>
                  <p><strong>Categoria:</strong>{currentEvent.categoria}</p>
                </Box>
              )
            }
          />

          <Modal
            open={openModal}
            title={modalTitle}
            content={
              <>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Nombre del Evento"
                      name="titulo"
                      value={currentEvent?.titulo || ''}
                      onChange={handleInputChange}
                      fullWidth
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Descripción"
                      name="descripcion"
                      value={currentEvent?.descripcion || ''}
                      onChange={handleInputChange}
                      fullWidth
                      sx={styles.textField}
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={6} >
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker
                        sx={styles.textField}
                        label="Fecha"
                        value={currentEvent?.fecha ? dayjs(currentEvent.fecha) : null}
                        onChange={(newValue) => handleInputChange({ target: { name: 'fecha', value: newValue } })}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />

                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={styles.textField}
                        label="Hora"
                        value={currentEvent?.hora ? dayjs(currentEvent.hora) : null}
                        onChange={(newValue) => handleInputChange({ target: { name: 'hora', value: newValue } })}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />

                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Lugar"
                      name="lugar"
                      value={currentEvent?.lugar || ''}
                      onChange={handleInputChange}
                      fullWidth
                      sx={styles.textField}
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Cupos del Evento"
                      name="cupo_disponible"
                      type='number'
                      value={currentEvent?.cupo_disponible || ''}
                      onChange={handleInputChange}
                      fullWidth
                      sx={styles.textField}
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth sx={styles.textField}>
                      <InputLabel id="tipo-label">Tipo</InputLabel>
                      <Select
                        labelId="tipo-label"
                        name="tipo"
                        value={currentEvent?.tipo || ''}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="gratis">Gratis</MenuItem>
                        <MenuItem value="pago">Pago</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="valor_base"
                      label="Valor Base"
                      type="number"
                      fullWidth
                      value={currentEvent?.valor_base || (currentEvent?.tipo === 'gratis' ? 0 : '')}
                      onChange={handleInputChange}
                      disabled={currentEvent?.tipo === 'gratis'}
                      sx={styles.textField}
                    />
                  </Grid>

                  <Grid item xs={6} >
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker
                        label="Fecha Apertura Inscripciones"
                        sx={styles.textField}
                        value={currentEvent.fecha_apertura_inscripciones ? dayjs(currentEvent.fecha_apertura_inscripciones) : null}
                        onChange={(newValue) => {
                          setCurrentEvent((prev) => ({ ...prev, fecha_apertura_inscripciones: newValue ? newValue.format('YYYY-MM-DD') : '' }));
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />


                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6} >
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker
                        sx={styles.textField}
                        label="Fecha Cierre Inscripciones"
                        value={currentEvent.fecha_cierre_inscripciones ? dayjs(currentEvent.fecha_cierre_inscripciones) : null}
                        onChange={(newValue) => {
                          setCurrentEvent((prev) => ({ ...prev, fecha_cierre_inscripciones: newValue ? newValue.format('YYYY-MM-DD') : '' }));
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />

                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth sx={styles.textField}>
                      <InputLabel>Categoría</InputLabel>
                      <Select
                        value={currentEvent?.categoria || ''}
                        onChange={handleInputChange}
                        label="Categoría"
                        name="categoria"
                      >
                        <MenuItem value="conferencias">Conferencia</MenuItem>
                        <MenuItem value="seminarios">Seminario</MenuItem>
                        <MenuItem value="entretenimiento">Entretenimietno</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </>
            }
            actions={[
              { label: 'Guardar', onClick: handleSaveEvent, color: 'primary' },
              { label: 'Cancelar', onClick: handleCloseModal, color: 'error' }
            ]}
            handleClose={handleCloseModal}
          />
        </>
      )}
    </Grid>
  );
};

export default EventosPage;
