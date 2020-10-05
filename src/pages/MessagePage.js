import React from "react";
import NewMessage from "../components/NewMessage/NewMessage";
import InfiniteScroll from "react-infinite-scroller";
import { userIsAuthenticated } from "../redux/HOCs";
import MessageList from "../components/messageList/MessageList";
import DataService from "../DataService";
import Menu from "../components/menu/Menu";


class MessagePage extends React.Component {
  constructor(props) {
    super(props)
    this.client = new DataService()
    this.state = { messages: [] }
  }
  componentDidMount() {
    this.client.getMessages().then(response => {
      console.log(response.data.messages)
      this.setState({ messages: response.data.messages })
    })
  }


  render() {
    return (
      <div className="MessagePage">
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <NewMessage isAuthenticated={this.props.isAuthenticated} />
        <h2>New Message</h2>
        <MessageList messages={this.state.messages} />
        {/* <div style="height: 700px;overflow:auto"> */}
        <InfiniteScroll
          loadMore={this.state.messages} //write a function with aanother get request added on to array of msg offset increases
          hasMore={true}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          {this.state.messages}
        </InfiniteScroll>
        {/* </div> */}
      </div>
    );

  }
}
export default userIsAuthenticated(MessagePage);
