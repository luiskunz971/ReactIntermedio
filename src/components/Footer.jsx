import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main', p: "2", marginTop:"auto" }}>
      <Typography variant="body2" color="white" align="center">
        Alumno: Luis Kunz <br/> Profesor: Enzo Derenzis <br />
        Curso de capacitación React intermedio Vates | Epam
      </Typography>
    </Box>
  );
}

export default Footer;