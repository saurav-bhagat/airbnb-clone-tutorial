import React from 'react';

class Hello extends React.Component {
    render() {
        return <div>Hello from { this.props.name } </div>;
    }
}

export default Hello;
