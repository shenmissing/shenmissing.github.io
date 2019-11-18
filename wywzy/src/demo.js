
import React, { Component } from  'react'

let loading = (com)=>{    
    class LoadingComponent extends Component{
        constructor(props){
            super(props)
            this.state = {
                loading: false
            }
        }
        showLoading(){
            this.setState({
                loading: true
            })
        }
        hideLoading(){
            this.setState({
                loading: false
            })
        }
        render(){
            const { loading } = this.state 
            return(
                <div>
                    { loading ? ' loading...' : '' }
                    { super.render() }
                </div>            
            )
        }
    } 
    return LoadingComponent
}
/* 
@loading
class App

的意思相当于

let newApp = loading(App)
*/

@loading
class App extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.showLoading()
        setTimeout(()=>{
            this.hideLoading()
        },3000)
    }
    render(){
        return(            
            <div> 
                <p>app </p>
            </div>
        )
    }
} 


export default App
