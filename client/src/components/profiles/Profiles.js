/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../action/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {' '}
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4> no profiles found...</h4>
            )}{' '}
          </div>
        </>
      )}
    </>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);

// const mapStateToProps = (state) => ({
//     profile: state.profile,
//   });

/* eslint-disable react/prop-types */

// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

// const ProfileItem = ({
//   profile: { user: _id, name, avatar },
//   status,
//   company,
//   location,
//   skills,
// }) => {
//   useEffect(() => {});

//   return (
//     <div className="profile" bg-light>
//       <img src={avatar} alt="" className="round-img" />
//       <div>
//         <h2>{name}</h2>
//         <p>
//           {status}
//           {company && <span> at {company}</span>}
//         </p>
//         <p className="my-1">{location && <span> at {location} </span>} </p>
//         <Link to={`/profile/${_id}`} className="btn btn-primary">
//           View Profile
//         </Link>
//       </div>
//       <ul>
//         {skills.slice(0, 4).map((skill, index) => (
//           <li key={index} className="text-primary">
//             <i className="fas fa-check" />
//             {skill}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// ProfileItem.propTypes = {
//   profile: PropTypes.object.isRequired,
// };

// export default ProfileItem;
