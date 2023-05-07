import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteApplication } from "../../actions/job";
import { Link } from "react-router-dom";

const AppliedJobs = ({ jobs, deleteApplication, user }) => {
  let status;
  jobs.map((job) =>
    job.applicants.map((applicant) =>
      applicant.user === user ? (status = applicant.approvedStatus) : null
    )
  );
  console.log(status);
  return (
    <Fragment>
      <h2 className="mt-2">Applied Jobs</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th className="hide-sm">Company</th>
            <th className="hide-sm">Type</th>
            <th className="hide-sm">Location</th>
            <th></th>
            <th></th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs ? (
            jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td className="hide-sm"> {job.company.name} </td>
                <td className="hide-sm"> {job.type} </td>
                <td className="hide-sm"> {job.location} </td>
                <td>
                  <Link className="btn btn-primary" to={`/job/${job._id}`}>
                    <p>View Job</p>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => deleteApplication(job._id)}
                    className="btn btn-danger"
                  >
                    Revoke
                  </button>
                </td>
                <td>
                  {job.applicants.map((applicant) =>
                    applicant.user === user ? applicant.approvedStatus : null
                  )}
                </td>
              </tr>
            ))
          ) : (
            <p>You haven't applied to any job</p>
          )}
        </tbody>
      </table>
    </Fragment>
  );
};

AppliedJobs.propTypes = {
  jobs: PropTypes.array.isRequired,
  deleteApplication: PropTypes.func.isRequired,
};

export default connect(null, { deleteApplication })(AppliedJobs);
