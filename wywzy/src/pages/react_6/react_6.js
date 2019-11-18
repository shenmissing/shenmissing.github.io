import React,{ Component } from 'react';
import InputIsControll from '../../components/inputIsControll/inputIsControll'

class React_6 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: "受控"
        };
    }
    defalutVal = '非受控'
    inputChange(e){
        console.log('受控',e)
    }
    inputChange2(e){
        console.log('非受控',e)
    }
    render() {
        const { value } = this.state
        return (
            <div>

                <InputIsControll value={ value } onChange={ this.inputChange.bind(this) }/>
                <InputIsControll defaultValue={this.defalutVal} onChange={ this.inputChange2.bind(this) }/>
            </div>
        )
    }
}

export default React_6;

/* 
推荐使用受控组件，出错率低
非受控只作了解，出错率高
*/

