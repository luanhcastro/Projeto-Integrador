import React, { Component,  } from 'react';
import axios from 'axios'
import Main from '../template/Main';
import TextField from '@material-ui/core/TextField';



const headerProps = {
   icon: 'users',
   title: 'Usuários',
   subtitle: 'Cadastro de Usuários'
}

const baseUrl = 'http://localhost:3001/dono'
const initialState = {
   user: {
      name: '',
      idade: '',
      email: '',
      phone: '',
      CPF: '',
      address: '',
   },
   list: []
}

export default class UsersCrud extends Component {

   state = { ...initialState }
   clear() {
      this.setState({ user: initialState.user })
   }
   save() {
      const user = this.state.user
      const method = user.id ? 'put' : 'post'
      const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
      axios[method](url, user)
         .then(resp => {
            const list = this.getUpdatedList(resp.data)
            this.setState({ user: initialState.user, list })
         })
   }

   getUpdatedList(user) {
      const list = this.state.list.filter(u => u.id !== user.id)
      list.unshift(user)
      return list
   }

   updateField(event) {
      const user = { ...this.state.user }
      user[event.target.name] = event.target.value
      this.setState({ user })

   }

   renderForm() {
      return (
         <div className="from">
            <div className="row pt-3">
               <div className="col-8 col-md-4 ml-3">
                  <div className="form-group">
                     <TextField
                        id="outlined-multiline-static"
                        label="Nome"
                        name="name"
                        value={this.state.user.name}
                        onChange={e => this.updateField(e)}
                        multiline
                        fullWidth
                        rows={1}
                        rowsMax={1}
                        defaultValue="Default Value"
                        variant="outlined"
                        placeholder="Digite seu nome"
                     />
                  </div>
               </div>
               <div className="col-8 col-md-4">
                  <div className="form-group">
                     <TextField
                        id="date"
                        label="Data de nascimento"
                        type="date"
                        defaultValue="2002-01-01"
                        InputLabelProps={{
                           shrink: true,
                        }}
                     />
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-8 col-md-4 ml-3">
                  <div className="form-group">
                     <TextField
                        id="outlined-multiline-static"
                        label="CPF"
                        name="CPF"
                        value={this.state.user.CPF}
                        onChange={e => this.updateField(e)}
                        multiline
                        fullWidth
                        rows={1}
                        rowsMax={1}
                        defaultValue="Default Value"
                        variant="outlined"
                        placeholder="Digite seu CPF"
                     />
                  </div>
               </div>
               <div className="col-8 col-md-4">
                  <div className="form-group">
                     <TextField
                        id="outlined-multiline-static"
                        label="E-mail"
                        name="email"
                        value={this.state.user.email}
                        onChange={e => this.updateField(e)}
                        multiline
                        fullWidth
                        rows={1}
                        rowsMax={1}
                        defaultValue="Default Value"
                        variant="outlined"
                        placeholder="Digite seu E-mail"
                     />
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-8 col-md-4 ml-3">
                  <div className="form-group">
                     <TextField
                        id="outlined-multiline-static"
                        label="Endereço"
                        name="address"
                        value={this.state.user.address}
                        onChange={e => this.updateField(e)}
                        multiline
                        fullWidth
                        rows={1}
                        rowsMax={1}
                        defaultValue="Default Value"
                        variant="outlined"
                        placeholder="Digite seu endereço"
                     />
                  </div>
               </div>
               <div className="col-8 col-md-4">
                  <div className="form-group">
                     <TextField
                        id="outlined-multiline-static"
                        label="Telefone"
                        name="phone"
                        value={this.state.user.phone}
                        onChange={e => this.updateField(e)}
                        multiline
                        fullWidth
                        rows={1}
                        rowsMax={1}
                        defaultValue="Default Value"
                        variant="outlined"
                        placeholder="Digite seu telefone"
                     />
                  </div>
               </div>
            </div>

            <hr />
            <div className="row pr-3 pb-3">
               <div className="col-12 d-flex justify-content-end">
                  <button className="btn btn-primary"
                     onClick={e => this.save(e)}>
                     Salvar
                  </button>
                  <button className="btn btn-secondary ml-2"
                     onClick={e => this.clear(e)}>
                     Cancelar
                  </button>
                  
               </div>
            </div>
         </div>
      )
   }

   render() {
      return (
         <Main {...headerProps} >
            {this.renderForm()}
         </Main>
      )
   }
}