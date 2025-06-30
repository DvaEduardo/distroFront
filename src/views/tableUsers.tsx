import React, { useState } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Switch,
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
  FormControlLabel,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import Swal from "sweetalert2";
import { Data } from "../utilis/interfaces/interfaceLogin";

function createData(
  id: number,
  usuario: string,
  email: string,
  archivo: string,
  type: string,
  estadoId: number,
  estado: string,
  creationDate: string,
  renewalDate: string,
): Data {
  return {
    id,
    usuario,
    email,
    archivo,
    type,
    estadoId,
    estado,
    creationDate,
    renewalDate,
  };
}

const rows = [
  createData(
    1,
    "Daniel Villanueva",
    "dvillanueva@gmail.com",
    "Comprobante de domicilio",
    "PDF",
    1,
    "Valido",
    "2024-06-01",
    "2025-06-01",
  ),
];

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: Record<Key, any>, b: Record<Key, any>) => number {
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
    id: 'usuario', 
    numeric: false,
    disablePadding: false,
    label: 'Usuario',
  },
  {
    id: 'email',
    numeric: false, 
    disablePadding: false,
    label: 'Email',
  },
  // {
  //   id: 'archivo',
  //   numeric: false,
  //   disablePadding: false, 
  //   label: 'Archivo',
  // },
  // {
  //   id: 'type',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Tipo',
  // },
  {
    id: 'estado',
    numeric: false,
    disablePadding: false,
    label: 'Estado',
  },
  {
    id: 'creationDate',
    numeric: false,
    disablePadding: false,
    label: 'Fecha de Creación',
  },
  {
    id: 'renewalDate', 
    numeric: false,
    disablePadding: false,
    label: 'Fecha de Renovación',
  }

];

const TableUsers: React.FC = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("usuario");
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
            Valuadores
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
          <Table className="table-moderna" size={dense ? "small" : "medium"}>
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
                  <TableCell>{row.usuario}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  {/* <TableCell>{row.archivo}</TableCell>
                  <TableCell>{row.type}</TableCell> */}
                  <TableCell>{row.estado}</TableCell>
                  <TableCell>{row.creationDate}</TableCell>
                  <TableCell>{row.renewalDate}</TableCell>
                  <TableCell>
                    <Button className="btn-principal">
                      ver archivos
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

export default TableUsers;
