import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  FormControl,
  FormHelperText,
  styled,
  IconButton,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon, Close as CloseIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface DocumentosValuador {
  cartaColegio: File | null;
  cedulaPostgrado: File | null;
  cedulaProfesional: File | null;
  codigoEtica: File | null;
  comprobanteDomicilio: File | null;
  constanciaFiscal: File | null;
  curp: File | null;
  avaluos: File | null;
  formatoF2: File | null;
  curriculum: File | null;
  tituloEspecialidad: File | null;
  tituloProfesional: File | null;
  fotografia: File | null;
  constanciaAACE: File | null;
  constanciasCursos: File | null;
}

const FormNewValuador: React.FC = () => {
  const [documentos, setDocumentos] = useState<DocumentosValuador>({
    cartaColegio: null,
    cedulaPostgrado: null,
    cedulaProfesional: null,
    codigoEtica: null,
    comprobanteDomicilio: null,
    constanciaFiscal: null,
    curp: null,
    avaluos: null,
    formatoF2: null,
    curriculum: null,
    tituloEspecialidad: null,
    tituloProfesional: null,
    fotografia: null,
    constanciaAACE: null,
    constanciasCursos: null,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, campo: keyof DocumentosValuador) => {
    if (event.target.files && event.target.files[0]) {
      setDocumentos(prev => ({
        ...prev,
        [campo]: event.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const documentosFaltantes = Object.entries(documentos)
      .filter(([, file]) => !file)
      .map(([key]) => key);

    if (documentosFaltantes.length > 0) {
      Swal.fire({
        title: 'Error',
        text: 'Faltan documentos por cargar',
        icon: 'error',
      });
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(documentos).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });

      const response = await fetch('http://localhost:3000/api/valuadores/documentos', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Documentos guardados correctamente',
          icon: 'success',
        });
        setDocumentos({
          cartaColegio: null,
          cedulaPostgrado: null,
          cedulaProfesional: null,
          codigoEtica: null,
          comprobanteDomicilio: null,
          constanciaFiscal: null,
          curp: null,
          avaluos: null,
          formatoF2: null,
          curriculum: null,
          tituloEspecialidad: null,
          tituloProfesional: null,
          fotografia: null,
          constanciaAACE: null,
          constanciasCursos: null,
        });
      } else {
        throw new Error('Error al guardar documentos');
      }
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'Error al guardar los documentos',
        icon: 'error',
      });
    }
  };

  const handleDeleteFile = (campo: keyof DocumentosValuador) => {
    setDocumentos(prev => ({
      ...prev,
      [campo]: null
    }));
  };

  const documentosList = [
    { key: 'cartaColegio', label: 'Carta de colegio' },
    { key: 'cedulaPostgrado', label: 'Cédula Post-grado' },
    { key: 'cedulaProfesional', label: 'Cédula Profesional' },
    { key: 'codigoEtica', label: 'Código de ética' },
    { key: 'comprobanteDomicilio', label: 'Comprobante de domicilio' },
    { key: 'constanciaFiscal', label: 'Constancia Fiscal' },
    { key: 'curp', label: 'C.U.R.P' },
    { key: 'avaluos', label: 'Avalúos' },
    { key: 'formatoF2', label: 'Formato F2' },
    { key: 'curriculum', label: 'Curriculum' },
    { key: 'tituloEspecialidad', label: 'Titulo especialidad' },
    { key: 'tituloProfesional', label: 'Título profesional' },
    { key: 'fotografia', label: 'Fotografía' },
    { key: 'constanciaAACE', label: 'Constancia curso AACE' },
    { key: 'constanciasCursos', label: 'Constancias y/o diplomas de cursos' },
  ];

  return (
    <Box
      sx={{
        width: '100vw',
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
        <Typography variant="h5" component="h2" gutterBottom align="center">
          Registro de nuevo ingreso para Valuador Profesional
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom align="center">
          Ingresa los archivos solicitados
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 3,
            }}>
              {documentosList.map((doc) => (
                <FormControl key={doc.key}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                  }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                      minHeight: '40px',
                      width: '100%',
                      position: 'relative',
                    }}>
                      <FormHelperText sx={{ 
                        textAlign: 'center',
                        fontSize: '0.875rem',
                        color: 'text.primary',
                        fontWeight: documentos[doc.key as keyof DocumentosValuador] ? 'bold' : 'normal',
                        m: 0,
                        flex: 1,
                      }}>
                        {documentos[doc.key as keyof DocumentosValuador]
                          ? documentos[doc.key as keyof DocumentosValuador]!.name
                          : 'Ningún archivo seleccionado'}
                      </FormHelperText>
                      {documentos[doc.key as keyof DocumentosValuador] && (
                        <IconButton 
                          size="small"
                          onClick={() => handleDeleteFile(doc.key as keyof DocumentosValuador)}
                          sx={{
                            position: 'absolute',
                            right: -8,
                            top: -8,
                            bgcolor: 'error.main',
                            color: 'white',
                            '&:hover': {
                              bgcolor: 'error.dark',
                            },
                            width: 24,
                            height: 24,
                          }}
                        >
                          <CloseIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      )}
                    </Box>
                    <Button
                      component="label"
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      sx={{ 
                        width: '100%',
                        height: '56px',
                        textAlign: 'center',
                        whiteSpace: 'normal',
                        lineHeight: 1.2,
                      }}
                    >
                      {doc.label}
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => handleFileChange(e, doc.key as keyof DocumentosValuador)}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </Button>
                  </Box>
                </FormControl>
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Guardar
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default FormNewValuador; 