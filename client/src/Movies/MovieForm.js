import React from "react";
import axios from "axios";

class MovieForm extends React.Component {
constructor(props) {
    super(props)
    this.state = {
        id: this.props.match.params.id,
        title: '',
        director: '',
        metascore: 0,
        star: '',
        stars: []
    }
}

handChange = event => {
    this.setState({ [event.target.name]: event.target.value })
}

addStar = event => {
    this.setState(() => ({
        star: event.target.value,
        stars: [...this.state.stars, this.state.star]
    }))
}

editMovie = event => {
    event.preventDefault();

    axios.put(`http://localhost:5000/api/movies/${this.state.id}`, this.state)
    .then(response => {
        this.setState({
            title: '',
            director: '',
            metascore: 0,
            star: ''
        })
        this.props.history.push(`/movies/${this.state.id}`)
    })
    .catch(error => console.log(error))
}

render() {
    return (
        <div>
        <form onSubmit={this.editMovie}>
        <input type="text" name="title" onChange={this.handleChange} value={this.state.title} placeholder="title"/>
        <input type="text" name="director" onChange={this.handleChange} value={this.state.director} placeholder="director" />
        <input type="number" name="metascore" onChange={this.state.handleChange} value={this.state.metascore} />
        <input type="text" name="star" onChange={this.handleChange} value={this.state.star} placeholder="Add star" />
        <button onClick={this.addStar}>Add Star</button>
        <button type="submit">Submit Changes</button>
        </form>
        </div>
    )
}

}

export default MovieForm;