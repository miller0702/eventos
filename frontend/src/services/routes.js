import EventosPage from '../components/Eventos/EventoPage';
import AsistentesPage from '../components/Asistentes/AsistentesPage';
import CodigosPromocionalesPage from '../components/CodigosPromocionales/CodigosPromocionalesPage';
import InscripcionesPage from '../components/Inscripciones/InscripcionesPage';
import UsuariosPage from '../components/Usuarios/UsuariosPage';
import Dashboard from '../components/Layout/Dashboard';

export const routes = [
  { text: 'Home', path: '/dashboard', component: Dashboard },
  { text: 'Eventos', path: '/eventos', component: EventosPage },
  { text: 'Asistentes', path: '/asistentes', component: AsistentesPage },
  { text: 'Promociones', path: '/promociones', component: CodigosPromocionalesPage },
  { text: 'Inscripciones', path: '/inscripciones', component: InscripcionesPage },
  { text: 'Usuarios', path: '/usuarios', component: UsuariosPage },
];
