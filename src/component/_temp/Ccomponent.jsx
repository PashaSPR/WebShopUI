import React, { Component } from 'react'
import '../css/styleNew.css';
import Fcomponent from './Fcomponent';

export default class Ccomponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/goods")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          );
      }
    render() {
        const { error, isLoaded, items } = this.state
        if (error) {
            return <p>Error {error.message}</p>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.name}>
                            {item.name}
                            <p>{item.short_discription}</p>
                            <p>{item.descriptionsGoods}</p>
                            <p>{item.subcategoriesGoods.id}</p>
                            <p>{item.subcategoriesGoods.name}</p>
                            <p>{item.photosGoods}</p>
                            <p>{item.propertiesGoods}</p>
                        </li>
                    ))}
                </ul>
            )
        }
    }
}