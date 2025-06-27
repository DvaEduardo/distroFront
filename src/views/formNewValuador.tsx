import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
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
  Chip,
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

interface FileInput {
  nameFile: string;
  typeFile: string;
  typeUser: number;
  expiration: string;
  urlFile: string;
  joined: boolean;
  approved: boolean;
}

interface DocumentosValuador {
  [key: string]: File | null;
}

const USER_TYPES = {
  VALUADOR: 1,
  CONTROLADOR: 2,
} as const;

const USER_TYPE_LABELS = {
  [USER_TYPES.VALUADOR]: 'Valuador',
  [USER_TYPES.CONTROLADOR]: 'Controlador',
} as const;

const FormNewValuador: React.FC = () => {
  const { typeUser, userID } = useParams<{
    typeUser: string;
    userID: string;
  }>();

  // Imprimir userID por ahora
  console.log('User ID:', userID);

  const filesInput: FileInput[] = [
    {
      nameFile: "Carta de colegio",
      typeFile: "",
      typeUser: 1,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    },
    {
      nameFile: "Cédula Post-grado",
      typeFile: "",
      typeUser: 1,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    },
    {
      nameFile: "Cédula Profesional",
      typeFile: "",
      typeUser: 1,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    },
    {
      nameFile: "Código de ética",
      typeFile: "",
      typeUser: 1,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    },
    {
      nameFile: "Comprobante de domicilio",
      typeFile: "",
      typeUser: 1,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    },
    {
      nameFile: "Constancia Fiscal",
      typeFile: "",
      typeUser: 1,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    },
    {
      nameFile: "CURP",
      typeFile: "",
      typeUser: 1,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    },
    {
      nameFile: "Avalúos",
      typeFile: "",
      typeUser: 1,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    },
    {
      nameFile: "Formato F2",
      typeFile: "",
      typeUser: 1,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    },
    {
      nameFile: "Curriculum",
      typeFile: "",
      typeUser: 1,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    },
    {
      nameFile: "Titulo especialidad",
      typeFile: "",
      typeUser: 1,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    },
    {
      nameFile: "Título profesional",
      typeFile: "",
      typeUser: 1,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    },
    {
      nameFile: "Fotografía",
      typeFile: "",
      typeUser: 1,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    },
    {
      nameFile: "Constancia curso AACE",
      typeFile: "",
      typeUser: 1,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    },
    {
      nameFile: "Constancias y/o diplomas de cursos",
      typeFile: "",
      typeUser: 1,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    },
    {
      nameFile: "Nuevo archivo",
      typeFile: "",
      typeUser: 2,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    },
    {
      nameFile: "Nuevo archivo2",
      typeFile: "",
      typeUser: 2,
      expiration: "2025-12-01 18:04:52.790",
      urlFile: "",
      joined: false,
      approved: false
    }
  ];

  // Filtrar archivos por typeUser de la URL
  const filteredFiles = useMemo(() => {
    const currentTypeUser = parseInt(typeUser || '1');
    return filesInput.filter(file => file.typeUser === currentTypeUser);
  }, [typeUser]);

  // Crear estado dinámico basado en los archivos filtrados
  const initialDocumentos = useMemo(() => {
    const docs: DocumentosValuador = {};
    filteredFiles.forEach((file) => {
      const originalIndex = filesInput.findIndex(f => f.nameFile === file.nameFile);
      docs[`file_${originalIndex}`] = null;
    });
    return docs;
  }, [filteredFiles]);

  const [documentos, setDocumentos] = useState<DocumentosValuador>(initialDocumentos);

  // Actualizar documentos cuando cambian los archivos filtrados
  React.useEffect(() => {
    setDocumentos(initialDocumentos);
  }, [initialDocumentos]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileKey: string) => {
    if (event.target.files && event.target.files[0]) {
      setDocumentos(prev => ({
        ...prev,
        [fileKey]: event.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const documentosFaltantes = Object.entries(documentos)
      .filter(([, file]) => !file)
      .map(([key]) => {
        const index = parseInt(key.split('_')[1]);
        return filesInput[index]?.nameFile || key;
      });

    if (documentosFaltantes.length > 0) {
      Swal.fire({
        title: 'Error',
        text: `Faltan documentos por cargar: ${documentosFaltantes.join(', ')}`,
        icon: 'error',
      });
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(documentos).forEach(([key, file]) => {
        if (file) {
          const index = parseInt(key.split('_')[1]);
          const fileInput = filesInput[index];
          formData.append(fileInput?.nameFile || key, file);
        }
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
        setDocumentos(initialDocumentos);
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

  const handleDeleteFile = (fileKey: string) => {
    setDocumentos(prev => ({
      ...prev,
      [fileKey]: null
    }));
  };

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
        
        {/* Mostrar información del usuario */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          <Chip 
            label={`Tipo: ${USER_TYPE_LABELS[parseInt(typeUser || '1') as keyof typeof USER_TYPE_LABELS]}`}
            color={parseInt(typeUser || '1') === USER_TYPES.VALUADOR ? 'primary' : 'secondary'}
          />
          <Chip 
            label={`ID Usuario: ${userID || 'No especificado'}`}
            variant="outlined"
          />
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 3,
            }}>
              {filteredFiles.map((file) => {
                const originalIndex = filesInput.findIndex(f => f.nameFile === file.nameFile);
                const fileKey = `file_${originalIndex}`;
                const selectedFile = documentos[fileKey];
                
                return (
                  <FormControl key={fileKey}>
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
                          fontWeight: selectedFile ? 'bold' : 'normal',
                          m: 0,
                          flex: 1,
                        }}>
                          {selectedFile
                            ? selectedFile.name
                            : 'Ningún archivo seleccionado'}
                        </FormHelperText>
                        {selectedFile && (
                          <IconButton 
                            size="small"
                            onClick={() => handleDeleteFile(fileKey)}
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
                        {file.nameFile}
                        <VisuallyHiddenInput
                          type="file"
                          onChange={(e) => handleFileChange(e, fileKey)}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </Button>
                    </Box>
                  </FormControl>
                );
              })}
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