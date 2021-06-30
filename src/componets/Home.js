import React, {useState, useContext, useEffect} from 'react';
import {GlobalContext} from "../context/GlobalState";
import {Heading} from './Heading';
import {ProductList} from './ProductList';
import {Pagination} from './Pagination'
import {USER_PER_PAGE} from "../utils/constants";
import Checkbox from '@material-ui/core/Checkbox';
import {makeStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        position:"fixed",
    },
    filterList:{
        maxWidth:200,
    },
    productList:{
        maxWidth:800,
    },
    pagination:{
        justifyContent:"center"
    },
}));

export const Home = () => {
    const classes = useStyles();
    const {products, defaultProduct, typeFilter, companyFilter} = useContext(GlobalContext);
    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const res = products;
            setLoading(false);
            setProductList(res);

            setTotalPages(Math.ceil(res.length / USER_PER_PAGE));
        };
        fetchProducts();
    }, [products]);
    // setTotalPages(Math.ceil(products.length / USER_PER_PAGE));
    const handleClick = num => {
        setPage(num);
    }

    const type = [...new Set(defaultProduct.map(item => item.type))];

    console.log(type.sort());

    const company = [...new Set(defaultProduct.map(item => item.brand))];
    company.sort();


    const [checkedStateType, setCheckedStateType] = useState(
        new Array(type.length).fill(true)
    );
    const [checkedStateCompany, setCheckedStateCompany] = useState(
        new Array(company.length).fill(true)
    );

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedStateType.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedStateType(updatedCheckedState);
        const typeSet = new Set();
        updatedCheckedState.map((checked, index) => {
            checked ? typeSet.add(type[index]) : typeSet.delete(type[index]);
        });
        console.log(updatedCheckedState);
        console.log(typeSet);
        typeFilter(typeSet);
    }
    const handleOnChangeCompany = (position) => {
        const updatedCheckedState = checkedStateCompany.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedStateCompany(updatedCheckedState);
        const companySet = new Set();
        updatedCheckedState.map((checked, index) => {
            checked ? companySet.add(company[index]) : companySet.delete(company[index]);
        });
        console.log(updatedCheckedState);
        console.log(companySet);
        companyFilter(companySet);
    }




    return (
        <div>
            <div className={classes.root}>
                <div>

                    <FormGroup >
                        <p>Type</p>
                        { type.map((type, index) => {
                            return (
                                <div>
                                    <Checkbox
                                        id={`custom-checkbox-${index}`}
                                        name={type}
                                        value={type}
                                        checked={checkedStateType[index]}
                                        onChange={() => handleOnChange(index)}
                                        inputProps={{'aria-label': 'primary checkbox'}}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{type}</label>
                                </div>
                            );
                        })}
                    </FormGroup>
                    <FormGroup  >
                        <p>Brand</p>
                        {company.map((company, index) => {
                            return (
                                <div>
                                    <Checkbox
                                        inputProps={{'aria-label': 'primary checkbox'}}
                                        id={`custom-checkbox-${index}`}
                                        name={company}
                                        value={company}
                                        checked={checkedStateCompany[index]}
                                        onChange={() => handleOnChangeCompany(index)}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{company}</label>
                                </div>
                            );
                        })}
                    </FormGroup>
                </div>

            </div>

            {loading ? <p>Loading...</p> : <>
                <div >
                    <ProductList productList={products} page={page}/>
                </div>
                <Pagination totalPages={totalPages} activePage={page} handleClick={handleClick}/>
            </>}

        </div>
    )
}
