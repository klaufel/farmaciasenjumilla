import React, { Component } from 'react';
//import pharmaciesJSON from './pharmacies.json';
import './App.css';

class Hello extends Component {
  render() {
    return (
      <h2>{this.props.title}</h2>
    )
  }
}

class Text extends Component {
  render() {

    const {
      number,
      objectWithInfo
    } = this.props;

    return (
      <div>
        <p>{number}</p>
        <p>{objectWithInfo.key2}</p>
      </div>
    )
  }
}

class Title extends Component {
  render() {
    return (
      <h1>{this.props.title}</h1>
    )
  }
}

Title.defaultProps = {
  title: 'Titulo por defecto'
}


class Contador extends Component {
  constructor(props) {
    super(props);

    this.state = { contador: this.props.contadorInicial };
    setInterval( () => {
      this.setState({ contador: this.state.contador + 1 })
    }, 1000)
  }
  render() {

    return <ContadorNumero numero={this.state.contador} />
  }
}

Contador.defaultProps = {
  contadorInicial: 1
}
class ContadorNumero extends Component {

  render () {
    console.log('ContadorNumero render()')
    return <span>{this.props.numero}</span>
  }

}

class App extends Component {

  render() {
    return (

      <div className="App">
        <Contador contadorInicial={10} />
        <Title text=""/>
        <Hello title="Hello!"/>
        <Text
          objectWithInfo={{ key: 'Valor 1', key2: 'Valor 2' }}
          text="Lorem ipsum dolor sit amet"
        />
      </div>
    )
  }
}


export default App;
