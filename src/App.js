import './App.css';
import React, {useState, useContext} from 'react';
import {BrowserRouter as Router, Switch, Route} from  'react-router-dom';
import {Home} from "./componets/Home";
import {Product} from "./componets/Product";
import {GlobalContext, GlobalProvider} from "./context/GlobalState";
import { USER_PER_PAGE } from "./utils/constants";

import { Button } from '@material-ui/core';

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";


const StyledPaper = withStyles(theme => ({
    root: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:800,
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        // border: 0,
        // borderRadius: 3,
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        // color: 'white',
        // padding: '0 30px',
    }
}))(Paper);

function App() {

  return (
      // <StyledPaper >
      <div>
          <GlobalProvider>
              <Router>
                  <Switch>
                      <Route exact path="/" component={Home}/>
                      <Route path="/product/:id" component={Product}/>
                  </Switch>
              </Router>
          </GlobalProvider>
      </div>
       //</StyledPaper>
  );
}

export default App;

