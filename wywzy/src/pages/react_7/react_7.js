/* 
请写一个满足以下要求的confirm方法组件：

（1）能在任意组件(示例如下)的componentDidMount生命周期中挂载，并返回一个promise；

（2）能通过该promise返回的结果判断confirm组件是否成功挂载。

async componentDidMount(){
    let res = await confirm("确定删除吗")
    if(res) {
        console.log("是")
    } else {
        console.log("否")
    }
}
 */

import React from 'react';
import ReactDOM from 'react-dom';

function confirm(msg){   
    return new Promise((resolve, reject)=>{
        let success = ()=>{
            console.log('success')
            resolve('success')            
        }
        let cancel = ()=>{
            console.log('cancel')
            reject('cancel')
            ReactDOM.unmountComponentAtNode(dom);
        }
        let confirmDom = (
            <div>
                { msg }
                <div>
                    <button onClick={ cancel }>取消</button>
                    <button onClick={ success }>确定</button>
                </div>
            </div>
        )
        let dom = document.createElement('div')
        document.body.appendChild(dom)
        ReactDOM.render(confirmDom, dom);       
        resolve('mount')
    })
}


class React_7 extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    async ConfirmLoaded(){              
        let res = await confirm('确定删除吗')
        console.log(res)
        if(res){
            console.log('是')
        }else{
            console.log('否')
        }        
    }
    componentDidMount(){
        this.ConfirmLoaded()
    }
    render(){
        return(
            <div>               
                React_7
            </div>
        )
    }
}
export default React_7


