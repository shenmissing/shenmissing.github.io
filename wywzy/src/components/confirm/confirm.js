import React from 'react'




class Confirm extends React.Component{
    constructor(props){
        super(props)
    }
    confirm(msg){
        console.log(111,msg)
        return new Promise((resolve)=>{
            resolve(msg)
        })              
    }
    render(h) {
        return(
            <div>11</div>
        )
    }
    
}

export default Confirm