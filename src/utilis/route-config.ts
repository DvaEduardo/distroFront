import React from "react";
import Login from "../views/login";
import RedireccionarALanding from "./RedireccionarALanding";

const route = [
    //Sistema
    { path: '/', element: React.createElement(Login), exact: true },
    { path: '*', element: React.createElement(RedireccionarALanding), exact: false },
  ];
  
  export default route;