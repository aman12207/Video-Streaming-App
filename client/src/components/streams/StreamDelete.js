import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream,deleteStream } from '../../actions';
import history from '../../history';
import Modal from '../Modal';

class StreamDelete extends React.Component{
  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id);
  }
  handleClick=()=>{
    this.props.deleteStream(this.props.match.params.id);
  }
  renderActions = ()=>{
    return <div>
      <button onClick={this.handleClick} className='ui button negative'>Delete</button>
      <Link to="/" className='ui button'>Cancel</Link>
    </div>
  }
  renderContent= () =>{
    if(!this.props.stream)
      return "Are you sure u want to delete this stream"
    else
     return `Are you sure u want to delete this stream with title : ${this.props.stream.title}`
  }
  render()
  {
    return <Modal 
      title="Delete Stream"
      content= {this.renderContent()}
      actions={this.renderActions()}
      onDismiss={() => history.push('/')}
    />
  }
};

const mapStateToProps= (state,ownProps) =>{
  return {
    stream : state.streams[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps,{fetchStream,deleteStream})(StreamDelete);
