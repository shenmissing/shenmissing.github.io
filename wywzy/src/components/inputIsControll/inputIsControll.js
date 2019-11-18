import React,{ Component } from 'react';
class InputIsControll extends Component{
    constructor(props) {
        super(props);
        this.state = {
            inputVal: ""            
        };
        this.inputRef = React.createRef();
    } 
    componentDidMount(){
        this.setState({
            inputVal: this.props.value || '',
        })
    }
    inputNotControlled(e){       
        this.setState({
            inputVal: e.target.value
        })
        this.props.onChange(e.target.value)
    }
    inputControlled(){
        this.props.onChange(this.inputRef.current.value)
    }
    render() {
        const { inputVal  } = this.state
        const { defaultValue } = this.props
        return (            
            defaultValue ?
            <input type="text" onChange={ this.inputControlled.bind(this) } defaultValue={ defaultValue } ref={ this.inputRef } />
            :
            <input type="text" onChange={ this.inputNotControlled.bind(this) } value={ inputVal }/>            
        );
    } 
}
export default InputIsControll