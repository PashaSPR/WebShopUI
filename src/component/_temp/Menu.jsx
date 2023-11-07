
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Menu() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    {/* <CameraIcon sx={{ mr: 2 }} /> */}
                    <Typography variant="h6" color="inherit" noWrap>
                        Album layout
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Album layout
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Something short and leading about the collection below—its contents,
                            the creator, etc. Make it short and sweet, but not too short so folks
                            don&apos;t simply skip over it entirely.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained">Main call to action</Button>
                            <Button variant="outlined">Secondary action</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image="https://source.unsplash.com/random?wallpapers"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Heading
                                        </Typography>
                                        <Typography>
                                            This is a media card. You can use this section to describe the
                                            content.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">View</Button>
                                        <Button size="small">Edit</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}




// import React, { useState } from 'react'
// import { TextField, Button } from '@mui/material';

// const Menu = () => {
//     return (

//         <div class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-4 css-1tz8m30">
//             <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-6 MuiGrid-grid-md-4 css-1twzmnh">
//                 <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-ctmtb0">
//                     <div class="MuiCardMedia-root css-1w909y4" role="img" style="background-image:url(&quot;https://source.unsplash.com/random?wallpapers&quot;)">
//                     </div>
//                     <div class="MuiCardContent-root css-10ofaip">
//                         <h2 class="MuiTypography-root MuiTypography-h5 MuiTypography-gutterBottom css-t1nuxs">Heading</h2>
//                         <p class="MuiTypography-root MuiTypography-body1 css-9l3uo3">This is a media card. You can use this section to describe the content.</p>
//                     </div>
//                     <div class="MuiCardActions-root MuiCardActions-spacing css-3zukih">
//                         <button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall css-1rtnrqa" tabindex="0" type="button">View<span class="MuiTouchRipple-root css-w0pj6f"></span></button>
//                         <button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall css-1rtnrqa" tabindex="0" type="button">Edit<span class="MuiTouchRipple-root css-w0pj6f"></span></button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Menu




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react'
// import { TextField, Button } from '@mui/material';

// const Menu = () => {
//     const [name, setName] = useState('')
//     const [short_discription, setShortDiscription] = useState('')
//     const [subcategoryId, setSubcategoryId] = useState('')
//     const handleClick = (e) => {
//         e.preventDefault()
//         // const good = { name, shortDiscription }
//         const good ={name,short_discription,subcategoryId}
//         console.log(good)
//         fetch('http://localhost:8080/goods', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(good)
//         }).then(() => {
//             console.log("New good added")
//         })
//     }
//     return (
//         <div>
//             <h1>Menu</h1>
//             <h1>Add good</h1>
//             <form noValidate autoComplete='off'>
//                 <TextField required id="outlined-required" label="Name Good"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)} />
//                 <TextField required id="outlined-multiline-static" label="Short discription" multiline rows={4} fullWidth
//                     value={short_discription}
//                     onChange={(e) => setShortDiscription(e.target.value)} />
//                 <TextField id="outlined-number" label="Number" type="number" InputLabelProps={{ shrink: true, }}
//                 value={subcategoryId}
//                 onChange={(e) => setSubcategoryId(e.target.value)} />
//                 <Button variant="contained" color="success" onClick={handleClick}>  Save good</Button>
//             </form>
//             {name}
//             {short_discription}
//             {subcategoryId}
//         </div>



//     )
// }

// export default Menu

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useState } from 'react'
// import { Container, Paper, TextField, Button } from '@mui/material';
// import { makeStyles } from '@mui/material';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& > *': {
//             margin: theme.spacing(1),
//             width: '25ch',
//         }
//     }
// }))



// const Menu = () => {

//     const classes = useStyles()
//     const paperStyle = {
//         padding: '50px 20px',
//         width: 600,
//     }
//     const [name, setName] = useState('')
//     const [shortDiscription, setShortDiscription] = useState('')

//     return (
//         <Container>
//             <Paper elevation={3} style={paperStyle}>
//                 <form className={classes.root} noValidate autoComplete='off'>
//                     <h1>Add good</h1>
//                     <TextField required id="outlined-required" label="Name Good"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)} />
//                     <TextField required id="outlined-multiline-static" label="Short discription" multiline rows={4} fullWidth
//                         value={shortDiscription}
//                         onChange={(e) => setShortDiscription(e.target.value)} />
//                     <Button variant="contained" color="success">  Save good</Button>
//                 </form>
//             </Paper>
//         </Container>

//     )
// }

// export default Menu




// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// const Menu = () =>  {
//   return (
//     <Box
//       component="form"
//       sx={{
//         '& > :not(style)': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//       <TextField id="filled-basic" label="Filled" variant="filled" />
//       <TextField id="standard-basic" label="Standard" variant="standard" />
//     </Box>
//   );
// }
// export default Menu