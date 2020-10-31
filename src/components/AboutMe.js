import React from 'react';

class AboutMe extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const date = localStorage.getItem('actualDate');
        if (date && Date.parse(date) > new Date()){
            this.setState({
                isLoading: false,
                name: localStorage.getItem('name'),
                height: localStorage.getItem('height'),
                birthYear: localStorage.getItem('birthYear'),
                gender: localStorage.getItem('gender'),
                mass: localStorage.getItem('mass'),
                hairColor: localStorage.getItem('hairColor'),
                skinColor: localStorage.getItem('skinColor'),
                eyeColor: localStorage.getItem('eyeColor')
            })
        }else {
            const actualDate = new Date();
            actualDate.setDate(actualDate.getDate()+30);
            fetch('https://sw-info-api.herokuapp.com/v1/peoples/1')
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        isLoading: false,
                        name: data.name,
                        height: data.height,
                        birthYear: data.birth_year,
                        gender: data.gender,
                        mass: data.mass,
                        hairColor: data.hair_color,
                        skinColor: data.skin_color,
                        eyeColor: data.eye_color
                    });
                    localStorage.setItem('name', data.name);
                    localStorage.setItem('height', data.height);
                    localStorage.setItem('birthYear', data.birth_year);
                    localStorage.setItem('gender', data.gender);
                    localStorage.setItem('mass', data.mass);
                    localStorage.setItem('hairColor', data.hair_color);
                    localStorage.setItem('skinColor', data.skin_color);
                    localStorage.setItem('eyeColor', data.eye_color);
                    localStorage.setItem('actualDate', actualDate.toLocaleString())
                })
        }


    }

    render() {
        if (this.state.isLoading){
            return(
                <p>Loading...</p>
            );
        }else {
            return (
                <div>
                    <p>name: {this.state.name}</p>
                    <p>height: {this.state.height}</p>
                    <p>birth year: {this.state.birthYear}</p>
                    <p>gender: {this.state.gender}</p>
                    <p>mass: {this.state.mass}</p>
                    <p>hair color: {this.state.hairColor}</p>
                    <p>skin color: {this.state.skinColor}</p>
                    <p>eye color: {this.state.eyeColor}</p>
                </div>
            );
        }
    }
};

export default AboutMe;