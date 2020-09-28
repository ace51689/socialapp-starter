import React from "react";
import Menu from "../components/menu/Menu";
import UsersPic from "../components/usersPic/UsersPic"
import { userIsAuthenticated } from "../redux/HOCs";
import DeleteUser from "../components/deleteUser/DeleteUser"

import cowboy3 from "../components/assets/images/cowboy3.png";
import cowboy4 from "../components/assets/images/cowboy4.png";
import cowgirl1 from "../components/assets/images/cowgirl1.png";
import UpdateUserForm from "../components/updateUserForm/UpdateUserForm";
import DataService from "../DataService";
import whoops from "../components/assets/images/whoops.png"


class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.client = new DataService()
    this.state = {
      data: {}
    }
  }

  getUserData() {
    return this.client.getUser().then(result => {
      this.setState({
        data: result.data.user
      })
    })
  }

  componentDidMount() {
    this.getUserData()
  }

  render() {
    const loginData = JSON.parse(localStorage.getItem('login')).result
    let displayName = 'loading'
    let about = 'loading'

    if (this.state.data.user) {
      displayName = this.state.data.user.displayName
      about = this.state.data.user.about
    }
    let src = whoops
    console.log(this.state.data)
    if (this.state.data.pictureLocation) {
      src = "http://socialapp-api.herokuapp.com" + this.state.data.pictureLocation
      console.log(src)
    }
    return (
      <div className="Profile">
        <Menu isAuthenticated={this.props.isAuthenticated} />

        <h2>User Profile</h2>
        <DeleteUser />

        <img className="cowboy3" src={cowboy3} alt="cowboy3" />
        <img className="cowboy4" src={cowboy4} alt="cowboy4" />
        <img className="cowgirl1" src={cowgirl1} alt="cowgirl1" />
        <h2>Profile</h2>
        <h4>Profile Photo: </h4>
        <img src={src} alt="profile pic" />
        <h4>Username: {loginData.username}</h4>
        <h4>Display Name: {displayName}</h4>
        <h4>About: {about}</h4>
        <hr />
        <UsersPic />
        <UpdateUserForm />
      </div>
    );
  }

}

export default userIsAuthenticated(Profile);
