import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Home from "./views/home";
import route from "./utilis/route-config";
import "bootstrap/dist/css/bootstrap.min.css";
import { Drawer, List, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Typography, CssBaseline, ListItemButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { PersonAdd, Assignment, Folder, People, Home as HomeIcon, Error } from "@mui/icons-material";

const iconMap: { [key: string]: JSX.Element } = {
  UserIcon: <PersonAdd />,
  ValuadorIcon: <Assignment />,
  FilesIcon: <Folder />,
  DocumentsIcon: <People />,
  LoginIcon: <HomeIcon />,
  RedirectIcon: <Error />
};

function App() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <Router>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Distrito
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ display: 'block', textAlign: 'center', marginTop: '2rem' }}> Distrito </Typography>
          <Typography variant="button" gutterBottom sx={{ display: 'block', textAlign: 'center', margin: '1rem' }}> Grupo Inmoviliario del norte </Typography>
          <List>
            {route.filter(rout => rout.isVisible).map((rout) => (
              <NavLink
                key={rout.path}
                to={rout.path}
                onClick={handleDrawerClose}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {({ isActive }) => (
                  <ListItemButton selected={isActive}>
                    <ListItemIcon style={{ color: "primary.main" }}>{iconMap[rout.icon]}</ListItemIcon>
                    <ListItemText primary={rout.name} />
                  </ListItemButton>
                )}
              </NavLink>
            ))}
          </List>
        </Drawer>
        <Routes>
          {route.map((rout) => (
            <Route
              key={rout.path}
              path={rout.path}
              element={<Home content={rout.element} />}
            />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
