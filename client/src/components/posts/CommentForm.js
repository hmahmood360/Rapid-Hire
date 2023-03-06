import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { addComment } from '../../actions/post'
import { connect } from 'react-redux'

const CommentForm = ({postId, addComment}) => {
    const [text, setText] = useState('')
    const handleSubmit = e => {
        e.preventDefault()
        addComment(postId,{text})
        setText('')
    }
  return (
    <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave a Comment...</h3>
        </div>
        <form onSubmit={e => handleSubmit(e)} className="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Say something..."
            required
            onChange={e => setText(e.target.value)}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
  )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null,{addComment})(CommentForm)