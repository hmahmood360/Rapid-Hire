import React from "react";
import { Link } from "react-router-dom";

export const DashboardActions = ({ id }) => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i>
        <p className="inline-block ml">Edit Profile</p>
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i>
        <p className="inline-block ml">Add Experience</p>
      </Link>
      <Link to="/add-education" className="btn btn-light ">
        <i className="fas fa-graduation-cap text-primary"></i>
        <p className="inline-block ml ">Add Education</p>
      </Link>
      <Link to="/edit-cv" className="btn btn-light ">
        <i className="fa fa-address-card text-primary"></i>
        <p className="inline-block ml ">CV Tool</p>
      </Link>
      <Link className="btn btn-primary " to={`/profile/${id}`}>
        <p>View Profile</p>
      </Link>
    </div>
  );
};
