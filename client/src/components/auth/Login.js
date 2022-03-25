// eslint-disable-next-line
import React, {  useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// this action is a prop
import { login } from '../../action/auth';

const Login = ({ login, isAuthenticated }) => {
  // the fist is the state and the second in the array is the function to update the state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
    console.log('success');
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <h1 className="large text-primary">Sign in</h1>
      <p className="lead">
        <i className="fas fa-user" />
        sign into your Acount
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
            minLength="6"
          />
        </div>
        <div className="form-group" />
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Sign up</Link>
      </p>
    </>
  );
};
Login.prototype = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
