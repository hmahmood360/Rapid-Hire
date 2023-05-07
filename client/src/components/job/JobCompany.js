import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Spinner } from "../layout/Spinner";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getJobById, deleteJob } from "../../actions/job";
import Moment from "react-moment";
import "react-dropdown/style.css";

const JobCompany = ({ getJobById, deleteJob, job: { job, loading }, auth }) => {
  const statusOptions = ["Pending", "Approved", "Rejected"];
  const { id } = useParams();
  useEffect(() => {
    const fetchJobs = async () => {
      await getJobById(id);
    };
    fetchJobs();
  }, [getJobById, id]);

  const navigate = useNavigate();

  return (
    <div className="container">
      {job === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <button onClick={() => navigate(-1)} className="btn btn-light">
            <i className="fa fa-chevron-left" aria-hidden="true"></i> Back
          </button>
          {auth.isCompanyAuthenticated &&
            auth.loading === false &&
            auth.company._id === job.company._id && (
              <Link to={`/edit-job/${job._id}`} className="btn btn-dark ">
                Edit Job
              </Link>
            )}
          {auth.isCompanyAuthenticated &&
            auth.loading === false &&
            auth.company._id === job.company._id && (
              <button
                onClick={() => deleteJob(job._id)}
                className="btn btn-danger"
              >
                Delete Job
              </button>
            )}
          <div className="my-1 ">
            <div className="company-job bg-light">
              <h2 className="mb-1 text-primary medium">Job Details:</h2>
              <p className="mt">
                {" "}
                <strong>Title: </strong> {job.title}
              </p>
              <p className="mt">
                {" "}
                <strong>Location: </strong> {job.location}
              </p>
              <p className="mt">
                {" "}
                <strong>Qualification Required: </strong> {job.qualification}
              </p>
              <p className="mt">
                {" "}
                <strong>Description: </strong> {job.description}
              </p>
              <p className="mt">
                {" "}
                <strong>Job type: </strong> {job.type}
              </p>
              <p className="mt">
                {" "}
                <strong>Gender: </strong> {job.gender}
              </p>
              <p className="mt">
                {" "}
                <strong>Salary: </strong> {job.salaryFrom} - {job.salaryTo}{" "}
              </p>
              <p className="mt">
                {" "}
                <strong>Positions available: </strong> {job.positions}
              </p>
              <p className="mt">
                {" "}
                <strong>Posted on: </strong>{" "}
                <Moment format="DD/MM/YYYY"> {job.date} </Moment>
              </p>
            </div>
          </div>
          <div className="my-1">
            <div className="company-job bg-light">
              <h2 className="mb-1 text-primary medium">Job Applicants</h2>
              <table className="table">
                <tbody>
                  <tr>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Qualification</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Update Status</th>
                  </tr>
                  {job.applicants ? (
                    job.applicants.map((applicant) => (
                      <tr className="applicant" key={applicant._id}>
                        <td>
                          <img
                            src={applicant.avatar}
                            alt="avatar"
                            className="small-img"
                          />
                        </td>
                        <td>
                          {" "}
                          {applicant.name.charAt(0).toUpperCase() +
                            applicant.name.slice(1)}{" "}
                        </td>
                        <td className="hide-sm">
                          {" "}
                          {applicant.qualification && applicant.field ? (
                            applicant.qualification + " in " + applicant.field
                          ) : (
                            <span className="content-center">-</span>
                          )}{" "}
                        </td>
                        <td className="hide-sm">
                          {" "}
                          {applicant.location ? (
                            applicant.location
                          ) : (
                            <span className="content-center">-</span>
                          )}{" "}
                        </td>
                        <td className="hide-sm">
                          {" "}
                          {applicant.approvedStatus ? (
                            applicant.approvedStatus
                          ) : (
                            <span className="content-center">-</span>
                          )}{" "}
                        </td>
                        <td>
                          <Link
                            className="btn btn-primary"
                            to={`/profile/${applicant.user}`}
                          >
                            <p>View Profile</p>
                          </Link>
                        </td>
                        <td>
                          <select
                            name="status"
                            onChange={(e) => {
                              console.log(e.target.value);
                              console.log(applicant._id);
                              const requestOptions = {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  status: e.target.value,
                                  user: applicant.user,
                                }),
                              };
                              fetch(
                                `http://localhost:5000/api/jobs/jobstatus/${job._id}`,
                                requestOptions
                              )
                                .then((response) => response.json())
                                .then((responseJson) => {
                                  console.log(responseJson);
                                });
                            }}
                          >
                            <option></option>
                            {statusOptions.map((status) => {
                              return <option>{status}</option>;
                            })}
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>No user has applied for current job</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

JobCompany.propTypes = {
  getJobById: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
  auth: state.auth,
});

export default connect(mapStateToProps, { getJobById, deleteJob })(JobCompany);
