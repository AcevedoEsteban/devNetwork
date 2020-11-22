import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../action/profile';
import ProfileTop from './ProfileTop';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <>
      <h5>hello delete me soon</h5>
      <h5>hello delete me soon</h5>
      <h5>hello delete me soon</h5>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          {' '}
          <Link to="../profiles" className="btn btn-light">
            {' '}
            back to profiles
          </Link>{' '}
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="../edit-profile" className="btn btn-dark">
                edit profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
          </div>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);

// Profile.propTypes = {
//     getProfileById: PropTypes.func.isRequired,
//     profile: PropTypes.object.isRequired,
//     auth: PropTypes.object.isRequired,
//   };
//   const mapStateToProps = (state) => ({
//     profile: state.profile,
//     auth: state.auth,
//   });
