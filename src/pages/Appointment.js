import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {IconButton } from "@mui/material";
import { Icon } from "@iconify/react";

import axios from 'axios';

class Appointment extends Component
{
    state = {
        appointment: [],
        loading: true,
    }
    async componentDidMount(){
        const res = await axios.get('http://localhost:8000/api/appointment');
        
        if (res.data.status === 200)
        {
            this.setState({
                appointment: res.data.appointment,
                loading: false,
            });
        }
    }

    render(){

        var appointment_table = "";
        if (this.state.loading)
        {
            appointment_table = <tr><td colSpan="6"> <h2>Loading...</h2> </td></tr>;
        }
        else 
        {
            appointment_table = 
            this.state.appointment.map( (item) => {
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.fname}</td>
                        <td>{item.lname}</td>
                        <td>{item.aptdate}</td>
                        <td>{item.apttime}</td>
                        <td>{item.aptpurpose}</td>
                        <td>{item.aptverify}</td>
                        <td>
                            <Link
                            to={"/edit-aptclinic"}
                            state={item}
                            className="btn btn-success btn-sm"
                            >
                            Verify
                            </Link>
                        </td>
                    </tr>
                );
            } )
        }

        return(
            <div>
                <div className='nav-square'>
                    <Link to='/appindex'>
                    <IconButton sx= {{ color: 'white', marginLeft: 5, marginTop: -2}}>
                        <Icon icon="eva:arrow-ios-back-fill" />
                    </IconButton>
                    </Link>
                    <text style={{marginLeft: 20, fontWeight:'bold', fontSize:35, fontFamily:'sans-serif', color:'white'}}>Clinic Appointments</text>
            </div>
           
                <div className="container">
                    <br/><br/>
                    <div className="card-header">     
                        <br></br>
                        <br></br>
                    </div>
                <div>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Appointment Date</th>
                                <th>Appointment Time</th>
                                <th>Appointment Purpose</th>
                                <th>Appointment Verification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointment_table}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        );
    }
}

export default Appointment;
