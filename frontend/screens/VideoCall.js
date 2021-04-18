import React from "react";
import axios from 'axios';

class VideoCall extends React.Component{



    state = {
        title:'',
        body:'',
        doctors:[]
    };

    componentDidMount() {
        this.getDoctorList()
    }

    getDoctorList = ()=>{
        axios.get('http://localhost:3000/api/allDoctors')
            .then((response)=>{
                const data = response.data;
                this.setState({doctors:data});
                console.log('Data');
            })
            .catch(() =>{
            alert('Error retrieving data!!');
        })
    }
}