import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {
    empresas: [{}],
    empresa: {},
    user: {},
    nome: "",
    razaoSocial: "",
    email: "",
    cnpj: "",
    cidade: "",
    procurar:"",
    isempresa:false


  }




  componentDidMount() {


    axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    axios.get(`http://localhost:8090/empresas`)
      .then(res => {


        this.setState({ empresas: res.data });

      })


  }

  handleChange(event) {
    this.setState({ name: event.target.nome });
  }

  atualizarNome = (ev,nome) =>{
    nome=ev
    console.log(ev)

  }

  handleSubmit(event) {
    alert('Um nome foi enviado: ' + this.state.value);
    event.preventDefault();
  }

  onInputchange(event) {
    this.setState({
      nome: event.target.value
    });
  }

  salvar = () => {
    console.log("chegou em salvar")
    const body = {
      name: this.state.nome,
      razaoSocial: this.state.razaoSocial,
      email: this.state.email,
      cnpj: this.state.cnpj,
      cidade: this.state.cidade
    }
    const response = axios.post(`http://localhost:8090/empresas`, body)
  }
  procurar = (e) =>{
    var url = `http://localhost:8090/empresas/` + this.state.procurar
    console.log(url)
    const response = axios.get(url).then(res => {
      
        this.setState({ empresa: res.data , isempresa:true});
      })
      



  }

  editar = (key) => {
    var url = 'http://localhost:8090/empresas/' + key.id
    const response = axios.put(url, key)
    console.log(key.id)

  }
  deletar = (key) => {
    var url = 'http://localhost:8090/empresas/' + key.id
    const response = axios.delete(url, key)
    console.log(key.id)

  }


  render() {
    return (
      <div style={{ paddingLeft: 10 }} >
        <form className="demoForm">
          <h2>Cadastrar empresa</h2>

          <div className="form-group">
            <label htmlFor="text">Razão social</label>
            <input type="text" className="form-control"
              value={this.state.razaoSocial} onChange={(e) => this.setState({ razaoSocial: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="text">Nome</label>
            <input type="text" className="form-control"
              value={this.state.nome} onChange={(e) => this.setState({ nome: e.target.value })} />
          </div>

          <div className="form-group">
            <label htmlFor="text">CNPJ</label>
            <input type="text" className="form-control"
              value={this.state.cnpj} onChange={(e) => this.setState({ cnpj: e.target.value })} />
          </div>

          <div className="form-group">
            <label htmlFor="text">Cidade</label>
            <input type="text" className="form-control"
              value={this.state.cidade} onChange={(e) => this.setState({ cidade: e.target.value })} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control"
              value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
          </div>

          <button className="btn btn-primary" onClick={this.salvar} >
            Cadastrar
          </button>
        </form>



        <input style={{ marginTop: 50 }} placeholder="Buscar ID" type="text" value={this.state.procurar} onChange={(e) => this.setState({ procurar: e.target.value })} />

        <button type="submit"  onClick={this.procurar}>Procurar</button>
        {this.state.isempresa ?( <div>
          <table border="1" width="100%" >
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Razao Social</th>
              <th>Email</th>
              <th>CNPJ</th>
              <th>Cidade</th>
            </tr>

            <tr>
              <th>{this.state.empresa.id}</th>
              <th>{this.state.empresa.name}</th>
              <th>{this.state.empresa.razaoSocial}</th>
              <th>{this.state.empresa.email}</th>
              <th>{this.state.empresa.cnpj}</th>
              <th>{this.state.empresa.cidade}</th>
            
            </tr>
            
            </table>
          
          
          </div>) : <h1></h1>}

        <h1>Lista</h1>
        <div style={{ marginBottom: 50 }}>
          <table border="1" width="100%" >
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Razao Social</th>
              <th>Email</th>
              <th>CNPJ</th>
              <th>Cidade</th>

            </tr>

            {this.state.empresas.map((key) =>
              <tr>
                <th>
                  <input type="text" className="form-control"value={key.id}  />
                </th>
                <th>
                  <input type="text" className="form-control"value={key.name} onChange = {(e) => this.atualizarNome(e,key.name)} />
                </th>
                <th>
                  <input type="text" className="form-control"value={key.razaoSocial} />
                </th>
                <th>
                  <input type="text" className="form-control"value={key.email} />
                </th>
                <th>
                  <input type="text" className="form-control"value={key.cnpj} />
                </th>
                <th>
                  <input type="text" className="form-control"value={key.cidade} />
                </th>
                <th>
                <button onClick={() => this.editar(key)}>Editar</button>
                </th>
                <th>
                <button onClick={() => this.deletar(key)}>Deletar</button>
                </th>
              </tr>
            )}

          </table>

        </div>


      </div>
    )
  }
}

export default App;
