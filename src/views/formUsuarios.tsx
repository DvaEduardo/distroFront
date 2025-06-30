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
        minHeight: '100vh',
        width: '100vw',
        background: '#f6f7fb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: '65px',
        py: 4,
        px: 1,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1440,
          mx: 'auto',
          p: { xs: 2, sm: 4 },
          background: '#fff',
          borderRadius: 4,
          boxShadow: '0 6px 32px rgba(105,24,17,0.10)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          border: 'none',
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#691811', fontWeight: 700 }}>
          Registro de Usuario
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            flexWrap: 'wrap',
            width: '100%',
          }}>
            <TextField
              required
              name="Nombre"
              label="Nombre"
              value={formData.Nombre}
              onChange={handleTextChange}
              variant="outlined"
              size="medium"
              InputProps={{ style: { height: 56 } }}
              sx={{
                background: '#fff',
                borderRadius: 2,
                flex: 2,
                minWidth: { xs: '100%', md: 150 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#691811',
                    borderWidth: 2,
                  },
                },
                '& label.Mui-focused': {
                  color: '#691811',
                },
              }}
            />
            <TextField
              required
              name="Apellidos"
              label="Apellidos"
              value={formData.Apellidos}
              onChange={handleTextChange}
              variant="outlined"
              size="medium"
              InputProps={{ style: { height: 56 } }}
              sx={{
                background: '#fff',
                borderRadius: 2,
                flex: 2,
                minWidth: { xs: '100%', md: 150 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#691811',
                    borderWidth: 2,
                  },
                },
                '& label.Mui-focused': {
                  color: '#691811',
                },
              }}
            />
            <TextField
              required
              name="Correo"
              label="Correo"
              type="email"
              value={formData.Correo}
              onChange={handleTextChange}
              variant="outlined"
              size="medium"
              InputProps={{ style: { height: 56 } }}
              sx={{
                background: '#fff',
                borderRadius: 2,
                flex: 2,
                minWidth: { xs: '100%', md: 150 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#691811',
                    borderWidth: 2,
                  },
                },
                '& label.Mui-focused': {
                  color: '#691811',
                },
              }}
            />
            <TextField
              required
              name="Contraseña"
              label="Contraseña"
              type="password"
              value={formData.Contraseña}
              onChange={handleTextChange}
              variant="outlined"
              size="medium"
              InputProps={{ style: { height: 56 } }}
              sx={{
                background: '#fff',
                borderRadius: 2,
                flex: 2,
                minWidth: { xs: '100%', md: 150 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#691811',
                    borderWidth: 2,
                  },
                },
                '& label.Mui-focused': {
                  color: '#691811',
                },
              }}
            />
            <FormControl
              variant="outlined"
              sx={{
                background: '#fff',
                borderRadius: 2,
                minWidth: { xs: '100%', md: 150 },
                flex: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#691811',
                    borderWidth: 2,
                  },
                },
                '& label.Mui-focused': {
                  color: '#691811',
                },
              }}
            >
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
            justifyContent: { xs: 'center', md: 'flex-end' },
            mt: { xs: 3, md: 2 },
          }}>
            <Button
              type="submit"
              className="btn-principal"
              sx={{ minWidth: '150px' }}
            >
              Registrar
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default FormUsuarios; 