import React, { Component } from 'react';
import axios from "axios";

class App extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  }

  componentDidMount() {
    this.getDataFromDb();
    if (this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({intervalIsSet: interval});
    }
  }

  componentWillUnmount() {
	if (this.state.intervalIsSet) {
		clearInterval(this.state.intervalIsSet);
		this.setState({ intervalIsSet: null });
	}
  }

  getDataFromDb = () => {
  	fetch("http://localhost:3001/api/getData")
  		.then(data => data.json())
  		.then(res => this.setState({ data: res.data }))
  }

  putDataToDB = message => {
  	let currentIds = this.state.data.map(data => data.id);
  	let idToBeAdded = 0;
  	while (currentIds.includes(idToBeAdded)) {
  		++idToBeAdded;
  	}

  	axios.post("http://localhost:3001/api/putData", {
  		id: idToBeAdded,
  		message: message,
  	});
  };

  deleteFromDB = idToDelete => {
  	let objIdToDelete = null;
  	this.state.data.forEach(dat => {
  		if (dat.id === idToDelete) {
  			objIdToDelete = dat._id;
  		}
  	});

  	axios.delete("http://localhost:3001/api/deleteData", {
  		data: {
  			id: objIdToDelete,
  		}
  	});
  }

  updateDB = (idToUpdate, updateToApply) => {
  	let objIdToUpdate = null;
  	this.state.data.forEach(dat => {
  		if (dat.id === idToUpdate) {
  			objIdToUpdate = dat._id
  		}
  	});

  	axios.post("http://localhost:3001/api/updateData", {
  		id: objIdToUpdate,
  		update: { 
  			message: updateToApply 
  		}
  	});
  }



  render() {
  	const { data } = this.state;
    return (
		<h1>Show Tunes</h1>
    );
  }
}

export default App;
