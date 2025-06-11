import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Paper,
  SelectChangeEvent,
} from '@mui/material';
import Swal from 'sweetalert2';

interface FormData {
  Nombre: string;
  Apellidos: string;
  Correo: string;
  Contraseña: string;
  RolId: number;
  Activo: boolean;
}

const roles = [
  { id: 1, nombre: 'Admin' },
  { id: 2, nombre: 'Valuador' },
  { id: 3, nombre: 'Controlador' },
];

const FormUsuarios: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    Nombre: '',
    Apellidos: '',
    Correo: '',
    Contraseña: '',
    RolId: 1,
    Activo: true
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    setFormData(prev => ({
      ...prev,
      RolId: e.target.value as number
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Usuario creado correctamente',
          icon: 'success',
        });
        // Limpiar formulario
        setFormData({
          Nombre: '',
          Apellidos: '',
          Correo: '',
          Contraseña: '',
          RolId: 1,
          Activo: true
        });
      } else {
        throw new Error('Error al crear usuario');
      }
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'Error al crear el usuario',
        icon: 'error',
      });
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        pt: 2,
        px: 2,
      }}
    >
      <Paper
        sx={{
          width: '100%',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Registro de Usuario
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'row',
              gap: 2,
              flexWrap: 'nowrap',
              '& .MuiFormControl-root': {
                minWidth: '150px',
                flex: 1,
              }
            }}>
              <TextField
                required
                name="Nombre"
                label="Nombre"
                value={formData.Nombre}
                onChange={handleTextChange}
              />

              <TextField
                required
                name="Apellidos"
                label="Apellidos"
                value={formData.Apellidos}
                onChange={handleTextChange}
              />

              <TextField
                required
                name="Correo"
                label="Correo"
                type="email"
                value={formData.Correo}
                onChange={handleTextChange}
              />

              <TextField
                required
                name="Contraseña"
                label="Contraseña"
                type="password"
                value={formData.Contraseña}
                onChange={handleTextChange}
              />

              <FormControl>
                <InputLabel>Rol</InputLabel>
                <Select
                  name="RolId"
                  value={formData.RolId}
                  onChange={handleSelectChange}
                  label="Rol"
                >
                  {roles.map((rol) => (
                    <MenuItem key={rol.id} value={rol.id}>
                      {rol.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ 
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ minWidth: '150px' }}
              >
                Registrar
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default FormUsuarios; 