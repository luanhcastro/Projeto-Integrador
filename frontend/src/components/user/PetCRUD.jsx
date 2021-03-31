import React, { Component } from 'react';
import axios from 'axios'
import Main from '../template/Main';
//import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';


const headerProps = {
   icon: 'heart',
   title: 'Meus Pets',
   subtitle: 'Cadastro de Pets'
}

const baseUrl = 'http://localhost:3001/pets'
const initialState = {
   pets: {
      userId: '',
      petName: '',
      age: '',
      type: '',
      description: '',
      estado: '',
   },
   list: []
}

export default class PetsCrud extends Component {

   state = { ...initialState }
   clear() {
      this.setState({ pets: initialState.pets })
   }
   save() {
      console.log(this.state.pets)
      const pets = this.state.pets
      const method = pets.id ? 'put' : 'post'
      const url = pets.id ? `${baseUrl}/${pets.id}` : baseUrl
      axios[method](url, pets)
         .then(resp => {
            const list = this.getUpdatedList(resp.data)
            this.setState({ pets: initialState.pets, list })
         })
   }

   getUpdatedList(pets) {
      const list = this.state.list.filter(u => u.id !== pets.id)
      list.unshift(pets)
      return list
   }

   updateField(event) {
      const pets = { ...this.state.pets }
      pets[event.target.name] = event.target.value
      this.setState({ pets })
   }

   renderForm() {
      return (
         <div className="from">
            <div className="row pt-3">
               <div className="col-12 col-md-8 ml-3">
                  <TextField
                     id="outlined-multiline-static"
                     label="Nome"
                     name="petName"
                     value={this.state.pets.petName}
                     onChange={e => this.updateField(e)}
                     multiline
                     fullWidth
                     rows={1}
                     rowsMax={1}
                     defaultValue="Default Value"
                     variant="outlined"
                     placeholder="Digite o nome do seu bichinho..."
                  />
               </div>
            </div>
            <div className="row">
               <div className="col-12 col-md-3 ml-3">
                  <div className="form-group">
                     <FormControl style={{ width: '100%' }}>
                        <InputLabel>Tipo de animal</InputLabel>
                        <NativeSelect
                           value={this.state.pets.type}
                           onChange={e => this.updateField(e)}
                           inputProps={{
                              name: 'type',
                              id: 'age-native-helper',
                           }}
                        >
                           <option aria-label="None" value="" />
                           <option value="Cachorro">Cachorro</option>d
                           <option value="Cadela">Cadela</option>
                           <option value="Gato">Gato</option>
                           <option value="Gata">Gata</option>
                        </NativeSelect>
                        <FormHelperText>Selecione qual é o seu bichinho</FormHelperText>
                     </FormControl>
                  </div>
               </div>

               <div className="col-12 col-md-3">
                  <div className="form-group">
                     <FormControl style={{ width: '100%' }} >
                        <InputLabel>Idade do animal</InputLabel>
                        <NativeSelect
                           value={this.state.pets.age}
                           onChange={e => this.updateField(e)}
                           inputProps={{
                              name: 'age',
                              id: 'age-native-helper',
                           }}
                        >
                           <option aria-label="None" value="" />
                           <option value="menos de 1">menos de 1 ano</option>
                           <option value="menos de 1 a 1">menos de 1 ano a 1 ano</option>
                           <option value="1 a 2">1 a 2 anos</option>
                           <option value="2 a 3">2 a 3 anos</option>
                           <option value="3 a 4">3 a 4 anos</option>
                           <option value="4 a 5">4 a 5 anos</option>
                           <option value="5 a 6">5 a 6 anos</option>
                           <option value="6 a 7">6 a 7 anos</option>
                           <option value="7 a 8">7 a 8 anos</option>
                           <option value="8 a 9">8 a 9 anos</option>
                           <option value="9 a 10">9 a 10 anos</option>
                           <option value="10 a 11">10 a 11 anos</option>
                           <option value="11 a 12">1 a 12 anos</option>
                           <option value="12 a 13">12 a 13 anos</option>
                           <option value="13 a 14">13 a 14 anos</option>
                           <option value="14 a 15">14 a 15 anos</option>
                           <option value="15 a 16">15 a 16 anos</option>
                           <option value="16 a 17">16 a 17 anos</option>
                           <option value="17 a 18">17 a 18 anos</option>
                           <option value="18 a 19">18 a 19 anos</option>
                           <option value="19 a 20">19 a 20 anos</option>
                        </NativeSelect>
                        <FormHelperText>Selecione a idade do seu bichinho</FormHelperText>
                     </FormControl>
                  </div>
               </div>

               <div className="col-12 col-md-2">
                  <div className="form-group">
                     <FormControl style={{ width: '100%' }}>
                        <InputLabel>É castrado ?</InputLabel>
                        <NativeSelect
                           value={this.state.pets.estado}
                           onChange={e => this.updateField(e)}
                           inputProps={{
                              name: 'estado',
                              id: 'age-native-helper',
                           }}
                        >
                           <option aria-label="None" value="" />
                           <option value="Sim">Sim</option>
                           <option value="Não">Não</option>
                        </NativeSelect>
                     </FormControl>
                  </div>
               </div>

            </div>
            <div className="row pt-3">
               <div className="col-12 col-md-8 ml-3">
                  <div className="form-group">
                     <TextField
                        id="outlined-multiline-static"
                        label="Descrição"
                        name="description"
                        value={this.state.pets.description}
                        onChange={e => this.updateField(e)}
                        multiline
                        fullWidth
                        rows={4}
                        defaultValue="Default Value"
                        variant="outlined"
                        placeholder="Nos conte aqui um pouco mais sobre seu querido amigo..."
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