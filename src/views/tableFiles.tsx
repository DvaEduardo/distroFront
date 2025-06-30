import React, { useState } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import Swal from "sweetalert2";

interface FileData {
  id: number;
  archivo: string;
  tipo: string;
  fechaCreacion: string;
  fechaCaducidad: string;
  estatusId: number;
  estatus: string;
}

function createData(
  id: number,
  archivo: string,
  tipo: string,
  fechaCreacion: string,
  fechaCaducidad: string,
  estatusId: number,
  estatus: string,
): FileData {
  return {
    id,
    archivo,
    tipo,
    fechaCreacion,
    fechaCaducidad,
    estatusId,
    estatus,
  };
}

const rows = [
  createData(
    1,
    "Comprobante de Domicilio.pdf",
    "PDF",
    "2024-04-14",
    "2024-04-31",
    1,
    "Por vencer"
  ),
  createData(
    2,
    "Identificación Oficial.jpg",
    "JPG",
    "2024-03-10",
    "2025-07-10",
    1,
    "Por vencer "
  ),
  createData(
    3,
    "Acta Constitutiva.pdf",
    "PDF",
    "2024-02-01",
    "2025-11-01",
    2,
    "Vigente"
  ),
];

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof FileData>(
  order: Order,
  orderBy: Key
): (a: FileData, b: FileData) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'archivo',
    numeric: false,
    disablePadding: false,
    label: 'Archivo',
  },
  {
    id: 'tipo',
    numeric: false,
    disablePadding: false,
    label: 'Tipo',
  },
  {
    id: 'fechaCreacion',
    numeric: false,
    disablePadding: false,
    label: 'Fecha Creación',
  },
  {
    id: 'fechaCaducidad',
    numeric: false,
    disablePadding: false,
    label: 'Fecha Caducidad',
  },
  // {
  //   id: 'estatusId',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Estatus ID',
  // },
  {
    id: 'estatus',
    numeric: false,
    disablePadding: false,
    label: 'Estatus',
  }
];

const getExpirationStyle = (fechaCaducidad: string) => {
  const today = new Date();
  const expirationDate = new Date(fechaCaducidad);
  const monthsDiff = (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);

  if (monthsDiff <= 1) {
    return {
      backgroundColor: '#dc3545', // rojo
      color: '#ffffff'
    };
  } else if (monthsDiff <= 3) {
    return {
      backgroundColor: '#ffc107', // amarillo
      color: '#ffffff'
    };
  } else {
    return {
      backgroundColor: '#28a745', // verde
      color: '#ffffff'
    };
  }
};

const TableFiles: React.FC = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof FileData>("id");
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(rows.map((n) => n.id));
    } else {
      setSelected([]);
    }
  };

  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];
    if (selectedIndex === -1) newSelected = newSelected.concat(selected, id);
    else if (selectedIndex >= 0)
      newSelected = newSelected.concat(selected.filter((n) => n !== id));
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) =>
    setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setRowsPerPage(parseInt(event.target.value, 10));

  const visibleRows = React.useMemo(
    () =>
      rows
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
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
      <Paper
        sx={{
          width: '100%',
          maxWidth: 1440,
          minHeight: 400,
          mx: 'auto',
          p: { xs: 1, sm: 3 },
          borderRadius: 4,
          boxShadow: '0 6px 32px rgba(105,24,17,0.10)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Toolbar sx={{ px: 0, mb: 2 }}>
          <Typography sx={{ flex: '1 1 100%', fontWeight: 700, fontSize: '1.4rem', color: '#691811' }} variant="h6" component="div">
            Archivos
          </Typography>
          <Tooltip title="Eliminar seleccionados">
            <IconButton
              onClick={() =>
                Swal.fire("Acción", "Eliminar seleccionados", "info")
              }
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer sx={{ 
          flex: 1,
          height: '100%',
          overflow: 'auto'
        }}>
          <Table className="table-moderna">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id}>{headCell.label}</TableCell>
                ))}
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleClick(row.id)}
                  role="checkbox"
                  selected={selected.includes(row.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selected.includes(row.id)}
                    />
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.archivo}</TableCell>
                  <TableCell>{row.tipo}</TableCell>
                  <TableCell>{row.fechaCreacion}</TableCell>
                  <TableCell sx={getExpirationStyle(row.fechaCaducidad)}>
                    {row.fechaCaducidad}
                  </TableCell>
                  {/* <TableCell>{row.estatusId}</TableCell> */}
                  <TableCell>{row.estatus}</TableCell>
                  <TableCell>
                    <Button className="btn-principal">
                      Descargar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default TableFiles; 