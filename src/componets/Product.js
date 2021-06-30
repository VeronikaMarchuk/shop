import React, {useState, useContext, useEffect} from 'react';
import {GlobalContext} from "../context/GlobalState";
import {useHistory} from 'react-router-dom';
import {Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {purple} from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        height:'100vh',
        justifyContent:"center",
        alignItems:"center"
    },
    cardWidth: {
        maxWidth: 255,
        margin: 5,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 800,
    },
    image: {
        width: 400,
        height: 400,
        objectFit: "cover",
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    costColor:{
        color:'red'
    }
}));


export const Product = (props) => {
    const classes = useStyles();
    const {products} = useContext(GlobalContext);
    const currentProductId = props.match.params.id;

    const productId = currentProductId;
    const selectedProduct = products.find(product => product.id === Number(productId));

    return (
        <div>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image} component={RouterLink}
                                        to={`/Product/${props.id}`}>
                                <img className={classes.img} alt="complex" src={selectedProduct.img}/>
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        <h1>{selectedProduct.name}</h1>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {selectedProduct.brand}
                                    </Typography>
                                    <Typography variant="body1" color="textPrimary" className={classes.costColor}>
                                        {selectedProduct.cost} Br
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {selectedProduct.description}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="secondary" component={RouterLink}
                                            to="/">Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>

            {/*<RouterLink to="/">Cancel</RouterLink>*/}
        </div>
    )
}
