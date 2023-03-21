import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const JobItem = ({
    job:{
        _id,
        company: { name},
        title,
        location,
        description,
        type,
        requiredSkills,
        date
    }
    }) => {
  return (
    <div className="job bg-light">
        <div>
            <h2>{title} - {type}</h2>
            <p>{name && name}</p>
            <p className="my-1"> {location && <span>{location} </span>} </p>
            <p className="my-1">{description}</p>
            <Link className='btn btn-primary' to={`/job/${_id}`} >
                <p>View Job</p>
            </Link>
        </div>
        <ul>
            <li>
                <h3 className='mt'>Required Skills:</h3>
            </li>
            {requiredSkills.slice(0,4).map((skill, index) => (
                <li key={index} className='text-primary' >
                    <i className="fas fa-check"></i>
                    {skill }
                </li>
            ))}
            <li className='mt-2' style={{display: 'flex'}} >
                <h4 className='mr'>Posted on: <Moment format='DD/MM/YYYY' >{date}</Moment></h4> 
            </li>
        </ul>
    </div>
  )
}

JobItem.propTypes = {
    job: PropTypes.object.isRequired
}

export default JobItem