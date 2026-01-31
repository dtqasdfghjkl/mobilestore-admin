import React from "react";

const AuthContext = React.createContext({status: false, login: ()=>{}, logout:()=>{}});

export default AuthContext;