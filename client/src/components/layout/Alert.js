import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mapStatetToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStatetToProps)(Alert);
