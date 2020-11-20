/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../action/profile';
import Experience from './Experience';
import Spinner from '../layout/Spinner';
import Education from './Education';
// eslint-disable-next-line import/no-named-as-default
import DashboardActions from './DashboardActions';

const Dashboard = ({
  //  eslint-disable-next-line
  getCurrentProfile,
  deleteAccount,
  //  eslint-disable-next-line
  auth: { user },
  //  eslint-disable-next-line
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary"> Dashboard</h1>
      <p className="lead">
        {/* eslint-disable-next-line react/prop-types */}
        <i className="fas fa-user" /> welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fa fa-user-minus">Delete my account</i>
            </button>
          </div>
        </>
      ) : (
        <>
          {' '}
          <p>you have not yet set up a profile please add some info </p>{' '}
          <Link to="/create-profile" className="btn btn-primary my-1">
            create profile
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.proptype = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
