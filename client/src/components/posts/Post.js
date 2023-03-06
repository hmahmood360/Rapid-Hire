import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, Link } from 'react-router-dom'
import {Spinner} from '../layout/Spinner'
import PostItem from './PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import {connect} from 'react-redux'
import { getPost } from '../../actions/post'

const Post = ({getPost, post:{loading, post}}) => {
    const {id} = useParams()
    useEffect(() => {
        getPost(id)
    },[getPost])
  return (
    loading || post === null ? <Spinner /> : <Fragment>
        <Link to={'/Posts'} className='btn btn-dark' >Back to Posts</Link>
        <PostItem post={post} showActions={false} /> 
        <CommentForm postId={post._id} />
        {post.comments.map((comment)=> (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
            )) }
    </Fragment>
  )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})

export default connect( mapStateToProps, {getPost} )(Post)