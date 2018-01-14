// Compt for copying as a FormPage
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Rx from 'rxjs'
import moment from 'moment'
import uuidv4 from 'uuid/v4'
import { withRouter } from 'react-router-dom'
import {
  ActivityIndicator,
	Card,
  InputItem,
  Input,
  TextArea,
  List,
  Button,
} from 'antd-mobile'
import {uploadToFirebase} from '../../api/firebase/firebase_storage'


class FormPage extends Component {

	constructor() {
		super()
		this.state = {
      name: '',
      email: '',
      phone: '',
      images: [],
      description: '',
      loading: false,
      error_messages: [],
      list_stuffs: [],
      submitted: false,
		}
	}


  uploadPhoto(acceptedFiles, rejectedFiles) {
		console.log(acceptedFiles)
		this.setState({
			images: acceptedFiles
		})
  }

  componentDidMount() {
    // exit keyboard on press enter
    document.getElementById('email').addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        document.getElementById('phone').blur()
      }
    })
  }


  submitRequest() {
    const requestId = uuidv4()
    console.log(requestId)
    if (this.state.name == '' || this.state.email == '' || this.state.phone == '' || this.state.description == ''){
      alert("Please fill in the blanks")
    } else {
      uploadToFirebase(this.state.images,requestId)
      .then((results)=>{
        console.log(results)
        this.state.list_stuffs.push(results)
        this.state.submitted = true
        console.log(this.state.list_stuffs)
      })
    }
  }

	render() {
		return (
			<div id='FormPage' style={comStyles().container}>
      <p style={{fontFamily: 'Bangers', fontSize: '8rem', fontWeight: 'bold', color: 'white', margin: '8px', paddingTop: '10px'}}>FiXiT</p>
          <img style={{height: '300px', width: '300px', padding: '50px'}}src='http://www.repairmadi.com/images/repair_icon.png'/>
          <div style={comStyles().entrance}>
            <List>
              <List.Item>
                <InputItem
                  id='name'
                  value={this.state.name}
                  onChange={(v) => this.setState({ name: v })}
                  placeholder='Name'
                  style={comStyles().inputtext} />
              </List.Item>
            </List>
            <br/><br/>
            <List>
              <List.Item>
                <InputItem
                  id='phone'
                  type='number'
                  value={this.state.phone}
                  onChange={(v) => this.setState({ phone: v })}
                  placeholder='Phone'
                  style={comStyles().inputtext} />
              </List.Item>
            </List>
            <br/><br/>
            <List>
              <List.Item>
                <InputItem
                  id='email'
                  value={this.state.email}
                  onChange={(v) => this.setState({ email: v })}
                  placeholder=' Email'
                  style={comStyles().inputtext} />
              </List.Item>
            </List>
            <br/><br/>
            <List>
              <List.Item>
                <InputItem
                  id='description'
                  value={this.state.description}
                  onChange={(v) => this.setState({ description: v })}
                  placeholder='Description'
                  style={comStyles().inputtext} />
              </List.Item>
            </List>
            <br/><br/>
            <List>
              <Dropzone style={comStyles().dragndrop} onDrop={(acceptedFiles, rejectedFiles) => this.uploadPhoto(acceptedFiles, rejectedFiles, 'cover_photo')} multiple={true}>
                {
                  this.state.images.length > 0
                  ?
                  <div style= {{fontSize: '40px', color: 'grey' }}>{ this.state.images.length } Images</div>
                  :
                  <div style= {{fontSize: '40px', color: 'grey' }}>Drag and Drop</div>
                }
              </Dropzone>
            </List>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <Button onClick={()=>this.submitRequest()} fullWidth type='primary' inline size='large' style={comStyles().enter_button}>Enter</Button>
          </div>
			  </div>
		)
  }
}

// defines the types of variables in this.props
FormPage.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
FormPage.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(FormPage)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {

	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {

	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		container: {
      display: 'flex',
      flexDirection: 'column',
			alignItems: 'center',
			minHeight: '80vh',
			minWidth: '100vw',
			background: 'linear-gradient(269deg, #0bacbd, #1a76c1)',
      backgroundSize: 'cover',
			fontFamily: `'Lato', sans-serif`,
		},
    entrance: {
      display: 'flex',
      margin: '200px',
      flexDirection: 'column',
      width: '80%',
    },
    inputtext: {
      fontSize: '3rem',
      margin: '25px auto',
      width: '100%',
      height: '50px',
      padding: '20px',
    },
    dragndrop: {
      display: 'flex',
      flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			minHeight: '25vh',
			minWidth: '25vw',
			background: '#e0ffff',
      backgroundSize: 'cover',
			fontFamily: `'Lato', sans-serif`,
    },
    enter_button: {
      fontSize: '3rem',
      padding: '20px',
      width: '100%',
      height: '100px',
      display: 'flex',
      flexDirection: 'column',
			alignItems: 'center',
    }
	}
}
