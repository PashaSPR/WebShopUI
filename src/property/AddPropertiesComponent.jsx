// import React, { Component } from 'react'
// import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


// export default class AddPropertiesComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: '',
//         };
//     }
//     handleClick = (e) => {
//         e.preventDefault();

//         fetch('http://localhost:8080/propertiesNameGoods', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ name: this.state.name }), // Відправляємо об'єкт з ім'ям властивості
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('New Properties added');
//                 console.log('Properties ID:', data.id); // Рядок для перевірки
//                 // Тут вам потрібно зробити редірект або навігацію на іншу сторінку
//                 this.setState({ name: '' }); // Очищення поля name
//             })
//             .catch(error => console.log(error));
//     };
//     render() {
//         return (
//             <div>
//                 <h1>Add Properties</h1>
//                 <form noValidate autoComplete="off">

//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
//                         <TextField
//                             required
//                             label="Property Name"
//                             value={this.state.name}
//                             onChange={(e) => this.setState({ name: e.target.value })}
//                             sx={{ width: '100%' }}
//                         />
//                         <InputLabel id="valueType-label">Value Type</InputLabel>

//                         <Select
//                             label="Value Type"
//                             labelId="valueType-label"
//                             id="valueType-select"
//                             // value={valueTypeId}
//                             // onChange={(e) => setValueTypeId(e.target.value)}
//                             sx={{ m: 1, minWidth: 120 }} // Встановлюємо ширину поля
//                             size="small"
//                         >
//                             {good.valueTypeList.map((valueType, index) => (
//                                 <MenuItem key={index} value={valueType}>
//                                     {valueType}
//                                 </MenuItem>
//                             ))}
//                         </Select>

//                         <Button variant="contained" color="success" onClick={this.handleClick}>
//                             Save Property
//                         </Button>
//                     </Box>

//                 </form>
//             </div>
//         );
//     }
// }



// /////////////////////////////2023.08.27//////////////////////////////////////////////////////////////
import React, { Component } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

export default class AddPropertiesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            valueTypeList: [], // Додайте поле для зберігання списку типів значень
            selectedValueType: '' // Додайте поле для зберігання обраного типу значення
        };
    }

    componentDidMount() {
        // Виконати запит до контролера для отримання списку типів значень
        fetch('http://localhost:8080/valuetypeproperties')
            .then(response => response.json())
            .then(data => {
                this.setState({ valueTypeList: data }); // Зберегти отриманий список в стані
            })
            .catch(error => console.log(error));
    }

    handleClick = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/propertiesNameGoods', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                valueType: this.state.selectedValueType // Додайте тип значення до об'єкта властивості
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('New Properties added');
                console.log('Properties ID:', data.id);
                this.setState({ name: '', selectedValueType: '' }); // Очищення полів після додавання
            })
            .catch(error => console.log(error));
    };


    render() {
        return (
            <div>
                <h1>Додати властивості товару</h1>
                <form noValidate autoComplete="off" style={{ paddingTop: '20px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
                        <TextField
                            required
                            label="Назва властивості"
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })}
                            sx={{ width: '100%' }}
                        />
                        {/* <InputLabel id="valueType-label">Value Type</InputLabel> */}
                        {/* <Select
                            label="Value Type"
                            labelId="valueType-label"
                            id="valueType-select"
                            // sx={{ m: 1, minWidth: 120 }}
                            size="small"
                            value={this.state.selectedValueType}
                            onChange={(e) => this.setState({ selectedValueType: e.target.value })}
                        >
                            {this.state.valueTypeList.map((valueType, index) => (
                                <MenuItem key={index} value={valueType}>
                                    {valueType}
                                </MenuItem>
                            ))}
                        </Select> */}


                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl required sx={{ width: '100%' }}>
                                    <InputLabel id="valueType-label">Тип значення</InputLabel>
                                    <Select
                                        label="Тип значення"
                                        labelId="valueType-label"
                                        id="valueType-select"
                                        value={this.state.selectedValueType}
                                        onChange={(e) => this.setState({ selectedValueType: e.target.value })}
                                        sx={{ width: '100%' }}
                                    >
                                        {this.state.valueTypeList.map((valueType, index) => (
                                            <MenuItem key={index} value={valueType}>
                                                {valueType}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" color="success" onClick={this.handleClick} style={{ height: '55px' }}>
                                    Зберегти властивість
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </div>
        );
    }
}
