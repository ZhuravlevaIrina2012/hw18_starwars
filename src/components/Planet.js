import React from 'react';

class Planet extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <option value={this.props.name}>{this.props.name}</option>
        );
    }
}

export default Planet;