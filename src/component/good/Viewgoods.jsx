// import React, { Component } from 'react'
// import AppBar from '@mui/material/AppBar';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Link as RouterLink } from 'react-router-dom';


// function Copyright() {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// // TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();


// // const handleDelete = (id) => {
// //     fetch(`http://localhost:8080/goods/${id}`, { method: 'DELETE' })
// //     .then(() => {
// //       // Виконайте потрібні дії після успішного видалення товару
// //       // Наприклад, оновлення списку товарів
// //       const updatedItems = items.filter(item => item.id !== id);
// //       setItems(updatedItems);
// //     })
// //     .catch(error => console.log(error));
// // };

// export default class Viewgoods extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             error: null,
//             isLoaded: false,
//             items: []
//         }
//     }

//     componentDidMount() {
//         fetch("http://localhost:8080/goods")
//             .then(res => res.json())
//             .then(
//                 (result) => {
//                     this.setState({
//                         isLoaded: true,
//                         items: result
//                     });
//                 },
//                 (error) => {
//                     this.setState({
//                         isLoaded: true,
//                         error
//                     });
//                 }
//             );
//     }

//     handleDelete = (id) => {
//         fetch(`http://localhost:8080/goods/${id}`, { method: 'DELETE' })
//             .then(() => {
//                 const updatedItems = this.state.items.filter(item => item.id !== id);
//                 this.setState({ items: updatedItems });
//             })
//             .catch(error => console.log(error));
//     };

//     render() {
//         const { error, isLoaded, items } = this.state
//         if (error) {
//             return <p>Error {error.message}</p>
//         } else if (!isLoaded) {
//             return <p>Loading...</p>
//         } else {
//             return (


//                 <ThemeProvider theme={defaultTheme} >
//                     <CssBaseline />
//                     <AppBar position="relative">
//                         <Toolbar>
//                             {/* <CameraIcon sx={{ mr: 2 }} /> */}
//                             <Typography variant="h6" color="inherit" noWrap>
//                                 Album layout
//                             </Typography>
//                         </Toolbar>
//                     </AppBar>
//                     <main>
//                         {/* Hero unit */}
//                         <Box
//                             sx={{
//                                 bgcolor: 'background.paper',
//                                 pt: 8,
//                                 pb: 6,
//                             }}
//                         >
//                             <Container maxWidth="sm">
//                                 <Typography
//                                     component="h1"
//                                     variant="h2"
//                                     align="center"
//                                     color="text.primary"
//                                     gutterBottom
//                                 >
//                                     Album layout
//                                 </Typography>
//                                 <Typography variant="h5" align="center" color="text.secondary" paragraph>
//                                     Something short and leading about the collection below—its contents,
//                                     the creator, etc. Make it short and sweet, but not too short so folks
//                                     don&apos;t simply skip over it entirely.
//                                 </Typography>
//                                 <Stack
//                                     sx={{ pt: 4 }}
//                                     direction="row"
//                                     spacing={2}
//                                     justifyContent="center"
//                                 >
//                                     <Button variant="contained">Main call to action</Button>
//                                     <Button variant="outlined">Secondary action</Button>
//                                 </Stack>
//                             </Container>
//                         </Box>
//                         <Container sx={{ py: 8 }} maxWidth="md">
//                             {/* End hero unit */}



//                             {/* <Grid container spacing={4}>
//                                 {items.map((item) => (
//                                     <Grid item key={item.id} xs={12} sm={6} md={4}>
//                                         <Card
//                                             sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
//                                         >
//                                             <CardMedia
//                                                 component="div"
//                                                 sx={{
//                                                     // 16:9
//                                                     pt: '56.25%',
//                                                     backgroundImage: `url(${item.photos.length > 0 ? item.photos[1].imageUrl : ''})`,
//                                                     backgroundSize: 'cover',
//                                                     backgroundPosition: 'center',
//                                                 }}
//                                             />



//                                             <CardMedia
//                                                 component="div"
//                                                 sx={{
//                                                     // 16:9
//                                                     pt: '56.25%',
//                                                 }}
//                                                 image="https://source.unsplash.com/random?wallpapers"
//                                             />
//                                             <CardContent sx={{ flexGrow: 1 }}>
//                                                 <Typography gutterBottom variant="h5" component="h2">
//                                                     {item.name}
//                                                 </Typography>
//                                                 <Typography>
//                                                     {item.short_discription}
//                                                 </Typography>
//                                             </CardContent>
//                                             <CardActions>
//                                                 <Button size="small">View</Button>
//                                                 <Button size="small">Edit</Button>
//                                                 <Button size="small" onClick={() => this.handleDelete(item.id)}>Delete</Button>
//                                             </CardActions>
//                                         </Card>
//                                     </Grid>
//                                 ))}
//                             </Grid> */}


//                             <Grid container spacing={4}>
//                                 {items.map((item) => (
//                                     <Grid item key={item.id} xs={12} sm={6} md={4}>
//                                         <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                                             {item.photosGoods && item.photosGoods.length > 0 ? (
//                                                 <CardMedia
//                                                     component="div"
//                                                     sx={{
//                                                         // 16:9
//                                                         pt: '56.25%',
//                                                         backgroundImage: `url(${item.photosGoods[0].path})`,
//                                                         backgroundSize: 'cover',
//                                                         backgroundPosition: 'center',
//                                                     }}
//                                                 />
//                                             ) : (
//                                                 <CardMedia
//                                                     component="div"
//                                                     sx={{
//                                                         // 16:9
//                                                         pt: '56.25%',
//                                                         backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)', // Зображення за замовчуванням
//                                                         backgroundSize: 'cover',
//                                                         backgroundPosition: 'center',
//                                                     }}
//                                                 />
//                                             )}
//                                             <CardContent sx={{ flexGrow: 1 }}>
//                                                 <Typography gutterBottom variant="h5" component="h2">
//                                                     {item.name}
//                                                     <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                                                     </Card>
//                                                 </Typography>
//                                                 <Typography>{item.short_discription}</Typography>
//                                             </CardContent>
//                                             <CardActions>
//                                                 {/* <Button size="small">View</Button> */}
//                                                 <Button size="small" component={RouterLink} to={`/viewonegood/${item.id}`}>View</Button>
//                                                 <Button size="small" component={RouterLink} to={`/addphotosgood/${item.id}`}>Add Photos</Button>
//                                                 <Button size="small">Edit</Button>
//                                                 <Button size="small" onClick={() => this.handleDelete(item.id)}>Delete</Button>
//                                             </CardActions>
//                                         </Card>
//                                     </Grid>
//                                 ))}
//                             </Grid>

//                         </Container>
//                     </main>
//                     {/* Footer */}
//                     <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer" >
//                         <Typography variant="h6" align="center" gutterBottom>
//                             Footer
//                         </Typography>
//                         <Typography
//                             variant="subtitle1"
//                             align="center"
//                             color="text.secondary"
//                             component="p"
//                         >
//                             Something here to give the footer a purpose!
//                         </Typography>
//                         <Copyright />
//                     </Box >
//                     {/* End footer */}
//                 </ThemeProvider >
//             );
//         }
//     }
// }

////////////////////////////////////////////////////////////////////////////

// import React, { Component } from 'react'
// import AppBar from '@mui/material/AppBar';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
// import { createTheme, ThemeProvider } from '@mui/material/styles';


// function Copyright() {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// // TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();


// // const handleDelete = (id) => {
// //     fetch(`http://localhost:8080/goods/${id}`, { method: 'DELETE' })
// //     .then(() => {
// //       // Виконайте потрібні дії після успішного видалення товару
// //       // Наприклад, оновлення списку товарів
// //       const updatedItems = items.filter(item => item.id !== id);
// //       setItems(updatedItems);
// //     })
// //     .catch(error => console.log(error));
// // };

// export default class Viewgoods extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             error: null,
//             isLoaded: false,
//             items: []
//         }
//     }

//     componentDidMount() {
//         fetch("http://localhost:8080/goods")
//             .then(res => res.json())
//             .then(
//                 (result) => {
//                     this.setState({
//                         isLoaded: true,
//                         items: result
//                     });
//                 },
//                 (error) => {
//                     this.setState({
//                         isLoaded: true,
//                         error
//                     });
//                 }
//             );
//     }

//     handleDelete = (id) => {
//         fetch(`http://localhost:8080/goods/${id}`, { method: 'DELETE' })
//             .then(() => {
//                 const updatedItems = this.state.items.filter(item => item.id !== id);
//                 this.setState({ items: updatedItems });
//             })
//             .catch(error => console.log(error));
//     };

//     render() {
//         const { error, isLoaded, items } = this.state
//         if (error) {
//             return <p>Error {error.message}</p>
//         } else if (!isLoaded) {
//             return <p>Loading...</p>
//         } else {
//             return (


//                 <ThemeProvider theme={defaultTheme} >
//                     <CssBaseline />
//                     <AppBar position="relative">
//                         <Toolbar>
//                             {/* <CameraIcon sx={{ mr: 2 }} /> */}
//                             <Typography variant="h6" color="inherit" noWrap>
//                                 Album layout
//                             </Typography>
//                         </Toolbar>
//                     </AppBar>
//                     <main>
//                         {/* Hero unit */}
//                         <Box
//                             sx={{
//                                 bgcolor: 'background.paper',
//                                 pt: 8,
//                                 pb: 6,
//                             }}
//                         >
//                             <Container maxWidth="sm">
//                                 <Typography
//                                     component="h1"
//                                     variant="h2"
//                                     align="center"
//                                     color="text.primary"
//                                     gutterBottom
//                                 >
//                                     Album layout
//                                 </Typography>
//                                 <Typography variant="h5" align="center" color="text.secondary" paragraph>
//                                     Something short and leading about the collection below—its contents,
//                                     the creator, etc. Make it short and sweet, but not too short so folks
//                                     don&apos;t simply skip over it entirely.
//                                 </Typography>
//                                 <Stack
//                                     sx={{ pt: 4 }}
//                                     direction="row"
//                                     spacing={2}
//                                     justifyContent="center"
//                                 >
//                                     <Button variant="contained">Main call to action</Button>
//                                     <Button variant="outlined">Secondary action</Button>
//                                 </Stack>
//                             </Container>
//                         </Box>
//                         <Container sx={{ py: 8 }} maxWidth="md">
//                             {/* End hero unit */}



//                             <Grid container spacing={4}>
//                                 {items.map((item) => (
//                                     <Grid item key={item.id} xs={12} sm={6} md={4}>
//                                         <Card
//                                             sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
//                                         >
//                                             <CardMedia
//                                                 component="div"
//                                                 sx={{
//                                                     // 16:9
//                                                     pt: '56.25%',
//                                                 }}
//                                                 image="https://source.unsplash.com/random?wallpapers"
//                                             />
//                                             <CardContent sx={{ flexGrow: 1 }}>
//                                                 <Typography gutterBottom variant="h5" component="h2">
//                                                     {item.name}
//                                                 </Typography>
//                                                 <Typography>
//                                                     {item.short_discription}
//                                                 </Typography>
//                                             </CardContent>
//                                             <CardActions>
//                                                 <Button size="small">View</Button>
//                                                 <Button size="small">Edit</Button>
//                                                 <Button size="small" onClick={() => this.handleDelete(item.id)}>Delete</Button>
//                                             </CardActions>
//                                         </Card>
//                                     </Grid>
//                                 ))}
//                             </Grid>

//                         </Container>
//                     </main>
//                     {/* Footer */}
//                     <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer" >
//                         <Typography variant="h6" align="center" gutterBottom>
//                             Footer
//                         </Typography>
//                         <Typography
//                             variant="subtitle1"
//                             align="center"
//                             color="text.secondary"
//                             component="p"
//                         >
//                             Something here to give the footer a purpose!
//                         </Typography>
//                         <Copyright />
//                     </Box >
//                     {/* End footer */}
//                 </ThemeProvider >
//             );
//         }
//     }
// }





import React, { Component } from 'react';
import {
  AppBar, Button, Card, CardActions, CardContent, CardMedia, Container,
  CssBaseline, Grid, Toolbar, Typography, ThemeProvider, createTheme, ButtonGroup,
} from '@mui/material';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import MessageEmptyFieldModal from '../modal/MessageEmptyFieldModal';

const defaultTheme = createTheme();

export default class Viewgoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      openDialog: false,
      dialogText: '',
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/goods')
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  handleDelete = (id) => {
    fetch(`http://localhost:8080/goods/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.ok) {
          // Видалення успішне, оновіть стан компонента
          const updatedItems = this.state.items.filter((item) => item.id !== id);
          this.setState({ items: updatedItems });
        } else {
          // Виникла помилка при видаленні, відобразіть повідомлення про помилку
          response.json().then((data) => {
            this.setState({
              dialogText: `Помилка при видаленні товару: ${data.message}`,
              openDialog: true,
            });
          });
        }
      })
      .catch((error) => {
        console.error('Помилка при видаленні товару:', error);
        this.setState({
          dialogText: 'Увага!!! :  ' + error.message,
          openDialog: true,
        });
      });
  };
  

  handleCloseDialog = () => {
    this.setState({ openDialog: false }); // Закриваємо діалогове вікно при натисканні кнопки "OK"
  };


  render() {
    const { error, isLoaded, items, openDialog, dialogText  } = this.state;
    // const [openDialog, setOpenDialog] = useState(false); // Стан для відображення діалогового вікна
    // const [dialogText, setDialogText] = useState('');

    if (error) {
      return <p>Error {error.message}</p>;
    } else if (!isLoaded) {
      return <p>Loading...</p>;
    } else {
      return (
        <ThemeProvider theme={defaultTheme}>
          {/* <CssBaseline />
          <AppBar position="relative">
            <Toolbar> */}
          {/* <CameraIcon sx={{ mr: 2 }} /> */}
          {/* <Typography variant="h6" color="inherit" noWrap>
                Album layout
              </Typography>
            </Toolbar>
          </AppBar> */}
          <main>
            {/* Hero unit */}
            {/* <Container sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }} maxWidth="sm">
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
                Something short and leading about the collection below—its contents, the creator,
                etc. Make it short and sweet, but not too short so folks don&apos;t simply skip
                over it entirely.
              </Typography>
              <Grid sx={{ pt: 4 }} container spacing={2} justifyContent="center">
                <Button variant="contained">Main call to action</Button>
                <Button variant="outlined">Secondary action</Button>
              </Grid>
            </Container> */}
            <Container sx={{ py: 8 }} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {items.map((item) => (


                  <Grid item key={item.id} xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div
                        style={{
                          // Збільшуємо розміри зображення на 10% вище і вставляємо його в центр
                          paddingTop: '75%', // Збільшуємо висоту до 75% (пропорція 4:3)
                          backgroundImage: `url(${item.photosGoodsDTOS && item.photosGoodsDTOS.length > 0 ? item.photosGoodsDTOS[0].path : 'https://source.unsplash.com/random?wallpapers'})`,
                          backgroundSize: 'contain', // Вмістити зображення в контейнер
                          backgroundRepeat: 'no-repeat', // Заборонити повторення фону
                          backgroundPosition: 'center', // Вирівняти зображення по центру
                        }}
                      />


                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.name}
                          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} />
                        </Typography>
                        <Typography>{item.short_discription}</Typography>
                      </CardContent>
                      <CardActions>
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                          <Button size="small" component={RouterLink} to={`/manager/view-one-good/${item.id}`}>
                            Вікдрити
                          </Button>
                          <Button size="small" component={RouterLink} to={`/manager/add-photo/${item.id}`}>
                            Фото
                          </Button>
                          <Button size="small" color="error" onClick={() => this.handleDelete(item.id)}>
                            Delete
                          </Button>
                        </ButtonGroup>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
            <MessageEmptyFieldModal open={openDialog} onClose={this.handleCloseDialog} dialogText={dialogText} />

          </main>
          {/* Footer */}
          <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
              Footer
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
              Something here to give the footer a purpose!
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              {'Copyright © '}
              <Link color="inherit" href="https://mui.com/">
                Your Website
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
          {/* End footer */}
        </ThemeProvider>
      );
    }
  }
}

