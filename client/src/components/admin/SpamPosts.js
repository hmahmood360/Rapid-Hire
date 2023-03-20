import React , {Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const SpamPosts = ({posts}) => {
  return (
    <div>
      <h2 className="mt-3 text-primary">Posts Marked As Spam</h2>
      <table className="table mt-1">
        <thead>
          <tr>
              <th>Posted By</th>
              <th className="hide-sm">Post Text</th>
              <th className="hide-sm"></th>
              <th className="hide-sm"></th>
              <th className="hide-sm"></th>
          </tr>
        </thead>
        <tbody>
          {posts ? (
            posts.map((post) => (
              <tr key={post._id}>
                      <td className=""> {post.name} </td>
                      <td className="hide-sm"> {post.text.substring(0,30) + '...'} </td>
                      <td className="hide-sm">
                          <Link to={`/posts/${post.post}`} className="btn btn-light" >View Post</Link>
                      </td>
                      <td className="hide-sm">
                          <button className="btn btn-primary">Remove from spam</button>
                      </td>
                      <td className="hide-sm">
                          <button className="btn btn-danger">Delete Post</button>
                      </td>
                  </tr>
            ))
          ) : (
            <p>No Company has been marked spam</p>
          ) }
        </tbody>
      </table>
        
    </div>
  )
}

SpamPosts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default connect(null, {})(SpamPosts)