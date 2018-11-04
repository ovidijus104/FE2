import React from 'react';

export default class Nav extends React.Component {
    constructor() {
        super();
        this.state = {
            addClass: false,
        };
    }

    handleClick = () => {
        const { item : { id } , handleCategoriesClick } = this.props;
        handleCategoriesClick(id);
        this.setState({addClass: !this.state.addClass});
    };
    render() {
        const { item, activeItemId } = this.props;
        return (
            <a className={ activeItemId === item.id ? "active" : null } href="#"  onClick={ this.handleClick }>{item.name}</a>
        );
    }
}