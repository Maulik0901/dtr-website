import React, { Component }  from 'react';
import AdminDashboard from "../AdminDashboard";
import AdminLogin from "./adminLogin";

const AdminLanding = ({admin, loginData, logOutAdmin}) => {
    return (
        <div>
            {admin ? <AdminDashboard logOutAdmin={logOutAdmin} admin={admin.tokenUser}/> : <AdminLogin loginData={loginData}/>}
        </div>
    );
};

export default AdminLanding;