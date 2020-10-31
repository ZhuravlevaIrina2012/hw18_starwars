import React from 'react';
import styles from '../css_modules/buttonSubmit.module.css';
import Planet from "./Planet";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            planets: JSON.parse(localStorage.getItem('planets'))
        }
    }

    getPlanets = () => {
        const planets = [];
        fetch('https://sw-info-api.herokuapp.com/v1/planets')
            .then(response => response.json())
            .then(data => {
                for (let i of data) {
                    planets.push(i.name);
                }
                localStorage.setItem('planets', JSON.stringify(planets));
            });
        return planets;
    }

    componentDidMount() {
        const date = localStorage.getItem('actualDate');
        if (date && Date.parse(date) > new Date()) {
            this.setState({
                isLoading: false,
                planets: JSON.parse(localStorage.getItem('planets'))
            })
        } else {
            const actualDate = new Date();
            actualDate.setDate(actualDate.getDate() + 30);
            const newPlanets = this.getPlanets();
            localStorage.setItem('actualDatePlanets', actualDate.toLocaleString());
            this.setState({isLoading: false, planets: newPlanets});
        }
    }

    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>
        } else {
            return (
                <div className="container">
                    <form>
                        <label htmlFor="fname">First Name: </label>
                        <input type="text" className="fname" name="firstname" placeholder="Your name.."/>

                        <label htmlFor="lname">Last Name</label>
                        <input type="text" className="lname" name="lastname" placeholder="Your last name.."/>

                        <label htmlFor="planet">Planets: </label>
                        <select className="planet" name='planet'>
                            {this.state.planets.map((item, index) => <Planet key={index} name={item}/>)}
                        </select>

                        <label htmlFor="subject">Subject: </label>
                        <textarea className="subject" name='subject' placeholder="Write something.."/>

                        <button className={styles.butSubmit} type="submit">Submit</button>
                    </form>
                </div>
            );
        }
    }
}

export default Contact;