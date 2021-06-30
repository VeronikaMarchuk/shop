import React, {useState, useContext, useEffect} from 'react';
import {GlobalContext} from "../context/GlobalState";
// import {Link} from "react-router-dom";
import {USER_PER_PAGE} from "../utils/constants";
import {makeStyles} from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {purple} from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
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
        width: 128,
        height: 128,
        objectFit: "cover",
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    cards: {
        display: "flex",
        maxWidth: 800,
        flexWrap: "wrap",
    },
    content: {
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        maxWidth: 800,
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    sort: {
        display: "flex",
        maxWidth: 800,
        justifyContent: "space-between",
        marginTop: 15,
        marginBottom: 15,

    },
    sortList: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    items: {

        maxWidth: 800,
        justifyContent: "center",
        alignItems: "center",
    }
}));



export const ProductList = ({productList, page}) => {
    const classes = useStyles();
    const {products, defaultProduct, sortAsc, sortDsc, searchProduct} = useContext(GlobalContext);
    const startIndex = (page - 1) * USER_PER_PAGE;
    const selectedProducts = productList.slice(startIndex, startIndex + USER_PER_PAGE);
    const [name, setName] = useState(productList);

    const onChange = (e) => {
        setName(name);
        console.log(e.currentTarget.value);

        searchProduct(e.currentTarget.value);
    }



    const [sort, setSort] = useState(null);

    const sortedAsc = (e) => {
        sortAsc(products);
        setSort(true);
    }
    const sortedDsc = (e) => {
        sortDsc(products);
        setSort(false);
    }
    // const LinkBehavior = React.forwardRef((props, ref) => (
    //     <RouterLink ref={ref} to="/Product/" {...props} />
    // ));
    const MyComponents = {
        List: function List(props) {
            return (
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image} component={RouterLink}
                                            to={`/Product/${props.id}`}>
                                    <img className={classes.img} alt="complex" src={props.image}/>
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                            {props.name}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {props.company}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="secondary" component={RouterLink}
                                                to={`/Product/${props.id}`}>
                                            More
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">{props.cost} Br</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            )
        },
        Cards: function Cards(props) {
            return (
                <Card className={classes.cardWidth}>
                    <CardActionArea component={RouterLink} to={`/Product/${props.id}`}>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={props.image}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {props.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {props.company}
                            </Typography>
                            <Typography variant="body2" variant="h6" color="textPrimary" component="p">
                                {props.cost} Br
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button variant="outlined" color="secondary" component={RouterLink} to={`/Product/${props.id}`}>
                            More
                        </Button>
                    </CardActions>
                </Card>
            );
        }
    }
    const [viewItem, setViewItem] = useState(true);
    const list = (e) => {
        setViewItem(true);
    }
    const card = (e) => {
        setViewItem(false)
    }

    return (
        <div className={classes.content}>
            <Grid
                className={classes.paper}
                direction="column"
                justify="center"
                alignItems="center"
            >
                <div className={classes.items}>
                    <TextField id="outlined-secondary"
                               label="Search"
                               variant="outlined"
                               color="secondary" fullWidth='800' onChange={onChange}/>
                    <div className={classes.sort}>
                        <ButtonGroup variant="text" color="secondary">
                            <Button variant={!sort || sort == null ? 'text' : 'contained'} color="secondary"
                                    onClick={sortedAsc}><ArrowDropUpIcon fontSize={"small"}/></Button>
                            <Button variant={sort || sort == null ? 'text' : 'contained'}
                                    onClick={sortedDsc}><ArrowDropDownIcon/></Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button variant={!viewItem ? 'text' : 'contained'} color="secondary"
                                    onClick={list}><FormatListBulletedIcon/></Button>
                            <Button variant={viewItem ? 'text' : 'contained'} color="secondary"
                                    onClick={card}><DashboardOutlinedIcon/></Button>
                        </ButtonGroup>
                    </div>
                    <div className={viewItem ? classes.root : classes.cards}>
                        {selectedProducts.map(product => (
                            viewItem ?
                                <MyComponents.List name={product.name} company={product.brand} image={product.img}
                                                   cost={product.cost} id={product.id}/> :
                                <MyComponents.Cards name={product.name} description={product.description}
                                                    image={product.img} cost={product.cost}
                                                    id={product.id} company={product.brand}></MyComponents.Cards>
                        ))}
                    </div>
                </div>
            </Grid>
        </div>
    )
}
