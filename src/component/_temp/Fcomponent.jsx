import React, { Component } from 'react'
import TextField from '@mui/material/TextField';

export default class Fcomponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Button pressed"
        }
    }

    render() {
        return (
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                />
                <button onClick={() => { this.props.updateData(this.state.name) }}>Press button</button>
            </div>
        )
    }
}
