import React,{ Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import React_6 from './pages/react_6/react_6'
import React_7 from './pages/react_7/react_7'
class App extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return(
            <Router>
                <Route path="/react_6" exact={ true } component={ React_6 } ></Route>
                <Route path="/react_7" exact={ true } component={ React_7 } ></Route>				
            </Router>
        )
    }
}

export default App;
