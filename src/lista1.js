import React, {Component} from 'react';
 


class Lista extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
            list: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
   handleChange = (event) => {
       this.setState({value: event.target.value})
  };
 
   handleSubmit = (event) => {
    if (this.state.value) {
        this.setState({list: this.state.list.concat(this.state.value)})
    }
 
    this.setState({value: ''});
 
    event.preventDefault();
  };

   lista = () => {
      return (
        <ul>
        {this.state.list.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      )
  }
 
  render() {
    return (
        <div>
            {this.lista()}
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.value} onChange={this.handleChange} />
            <button type="submit">Lisää listaan</button>
          </form>
        </div>
      );
  }
}
 
export default Lista;