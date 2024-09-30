import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Modal from '../Modales/Modal';
import clienteAxios from '../../services/clienteAxios';
import { Add, Delete, Edit, LocalShippingRounded } from '@mui/icons-material';
import tableStyles from '../../styles/TableStyle';
import { useTheme } from '../../context/ThemeContext';
import CustomAlert from '../Alertas/Alert';
import Loader from '../../components/Loader/Loader';
import RefreshRounded from '@mui/icons-material/RefreshRounded';

const EventosPage = () => {
  const { theme } = useTheme();
  const styles = tableStyles(theme);
  
  // Estado del componente
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tipo, setTipo] = useState(currentEvent?.tipo || '');
  const [tipoPago, setTipoPago] = useState(currentEvent?.tipoPago || '');

  useEffect(() => {
    fetchEvents();
  }, []);

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
    setCurrentEvent(event || { nombre: '', descripcion: '' });
    setIsEditing(!!event);
    setModalTitle(event ? 'Editar Evento' : 'Crear Nuevo Evento');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveEvent = async () => {
    try {
      const endpoint = isEditing ? `/eventos/${currentEvent.id}` : '/eventos';
      const method = isEditing ? 'put' : 'post';
      
      await clienteAxios[method](endpoint, currentEvent);
      setAlertMessage(`Evento ${isEditing ? 'actualizado' : 'creado'} exitosamente`);
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
    setCurrentEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const columns = [
    { field: 'id', headerName: '#', flex: 0.5 },
    { field: 'titulo', headerName: 'TITULO', flex: 1 },
    { field: 'descripcion', headerName: 'DESCRIPCIÓN', flex: 2 },
    {
      field: 'actions',
      headerName: 'ACCIONES',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
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
      setTipoPago(''); // Reinicia el tipo de pago si no es "pago"
    }
  };

  return (
    <Grid container style={styles.pages}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Grid container justifyContent="space-between" alignItems="center">
            <Button
              variant="contained"
              style={styles.button}
              onClick={handleOpenModal}
              startIcon={<Add />}
            >
              Crear Evento
            </Button>
            <Button
              variant="outlined"
              style={styles.button}
              onClick={fetchEvents}
              startIcon={<RefreshRounded />}
            >
              Refrescar
            </Button>
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
            open={openModal}
            title={modalTitle}
            content={
              <Box>
                <TextField
                  label="Nombre del Evento"
                  name="nombre"
                  value={currentEvent?.nombre || ''}
                  onChange={handleInputChange}
                  fullWidth
                  sx={styles.textField}
                />
                <TextField
                  label="Descripción"
                  name="descripcion"
                  value={currentEvent?.descripcion || ''}
                  onChange={handleInputChange}
                  fullWidth
                  sx={styles.textField}
                  rows={4}
                />
                <TextField
                  label="Descripción"
                  name="descripcion"
                  value={currentEvent?.descripcion || ''}
                  onChange={handleInputChange}
                  fullWidth
                  sx={styles.textField}
                  rows={4}
                />
                <TextField
          label="Fecha"
          name="fecha"
          type="date"
          value={currentEvent?.fecha || ''}
          onChange={handleInputChange}
          fullWidth
          sx={styles.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth sx={styles.textField}>
          <InputLabel>Tipo</InputLabel>
          <Select
            value={tipo}
            onChange={handleTipoChange}
            label="Tipo"
            name="tipo"
          >
            <MenuItem value="pago">Pago</MenuItem>
            <MenuItem value="gratis">Gratis</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={styles.textField}>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={currentEvent?.categoria || ''}
            onChange={handleInputChange}
            label="Categoría"
            name="categoria"
          >
            <MenuItem value="Conferencia">Conferencia</MenuItem>
            <MenuItem value="Seminario">Seminario</MenuItem>
            <MenuItem value="Seminario">Entretenimietno</MenuItem>
          </Select>
        </FormControl>
        {tipo === 'pago' && (
          <FormControl fullWidth sx={styles.textField}>
            <InputLabel>Tipo de Pago</InputLabel>
            <Select
              value={tipoPago}
              onChange={(event) => setTipoPago(event.target.value)}
              label="Tipo de Pago"
              name="tipoPago"
            >
              <MenuItem value="vip">VIP</MenuItem>
              <MenuItem value="general">General</MenuItem>
            </Select>
          </FormControl>
        )}
              </Box>
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
