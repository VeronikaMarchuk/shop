import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        position:"fixed"
    },
    filterList:{
        maxWidth:200,
    },
    productList:{
        maxWidth:800,
    },
    pagination:{
        margin: 'auto',
        maxWidth:100,
    },
}));

export const Pagination = ({ totalPages, activePage, handleClick }) => {
    const classes = useStyles();
    const pages = [...Array(totalPages).keys()].map(num => num+1);
    console.log(activePage)
    return (
        <div className={classes.pagination}>
            <ButtonGroup>
            { pages.length<=1? '': pages.map(num => (
                <Button color='secondary'
                        variant={num==activePage?'contained' : 'text'}
                    key={num}
                    onClick={() => handleClick(num)}
                >{num}</Button>
            )) }
            </ButtonGroup>
        </div>
    )
}
