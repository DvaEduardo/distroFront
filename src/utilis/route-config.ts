import React from "react";
import Login from "../views/login";
import RedireccionarALanding from "./RedireccionarALanding";
import TableDocuments from "../views/tableUsers";
import TableFiles from "../views/tableFiles";
import CreateUser from "../views/formUsuarios";
import FormNewValuador from "../views/formNewValuador";
const route = [
  //Sistema
  { path: "/", element: React.createElement(Login), exact: true, icon: "LoginIcon", name: "Inicio", isVisible: true },
  {
    path: "/Crear/Usuario",
    element: React.createElement(CreateUser),
    exact: true,
    icon: "UserIcon",
    name: "Crear Usuario",
    isVisible: true
  },
  {
    path: "/Crear/Valuador",
    element: React.createElement(FormNewValuador),
    exact: true,
    icon: "ValuadorIcon",
    name: "Crear Valuador",
    isVisible: true
  },
  { path: "/archivos", element: React.createElement(TableFiles), exact: true, icon: "FilesIcon", name: "Archivos", isVisible: true },
  {
    path: "/valuadores",
    element: React.createElement(TableDocuments),
    exact: true,
    icon: "DocumentsIcon",
    name: "Valuadores",
    isVisible: true
  },
  {
    path: "*",
    element: React.createElement(RedireccionarALanding),
    exact: false,
    icon: "RedirectIcon",
    name: "Redireccionar",
    isVisible: false
  },
];

export default route;
