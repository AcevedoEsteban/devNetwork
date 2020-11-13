import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../action/profile';
import Spinner from '../layout/Spinner';
// eslint-disable-next-line import/no-named-as-default
import DashboardActions from './DashboardActions';

const Dashboard = ({
  //  eslint-disable-next-line
  getCurrentProfile,
  //  eslint-disable-next-line
  auth: { user },
  //  eslint-disable-next-line
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
