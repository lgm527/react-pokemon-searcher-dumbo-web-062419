import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = this.cleanState()
  }

  cleanState = () => ({
    name: '',
    hp: '',
    frontUrl: '',
    backUrl: ''
  })

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        stats: [
          {
            value: this.state.hp,
            name: 'hp'
          }
        ],
        sprites: {
          front: this.state.frontUrl,
          back: this.state.backUrl
        }
      })
    })
    .then(res => res.json())
    .then(poke => this.props.postPokemon(poke))
    this.setState = (this.cleanState())
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Name"
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            />
            <Form.Input
            fluid
            label="hp"
            placeholder="hp"
            name="hp"
            value={this.state.hp}
            onChange={this.handleChange}
            />
            <Form.Input
            fluid
            label="Front Image URL"
            placeholder="url"
            name="frontUrl"
            value={this.state.frontUrl}
            onChange={this.handleChange}
            />
            <Form.Input
            fluid
            label="Back Image URL"
            placeholder="url"
            name="backUrl"
            value={this.state.backUrl}
            onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
