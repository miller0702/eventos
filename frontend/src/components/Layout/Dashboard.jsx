import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Bienvenido al Dashboard</Typography>
        <Typography color="textSecondary">Aquí puedes ver tus estadísticas.</Typography>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
