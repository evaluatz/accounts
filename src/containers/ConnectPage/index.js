/**
 *
 * ConnectPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// Utils
import auth from '../../utils/auth';
import request from '../../utils/request';


import './styles.css';

class ConnectPage extends React.Component {
  // We only use this lifecycle because it's only mounted once and the saga already handle
  // the redirections depending on the API response

  // NOTE: YOU can delete this container and do the logic in the HomePage formContainer
  // This implementation was just made for the sake of the example and to silmplify the logic
  componentDidMount() {
    console.log("Connect PAGE");
    const {
      match: { params: { provider } },
      location: { search },
    } = this.props;
    const requestURL = `https://db.evaluatz.herokuapp.com/auth/${provider}/callback${search}`;

    request(requestURL, { method: 'GET' })
      .then(response => {
        auth.setToken(response.jwt, true);
        auth.setUserInfo(response.user, true);

        const subdomain = localStorage.getItem("source") || null;
        const url = "https://" + subdomain + ".evaluatz.com";
        subdomain ?
        window.location.href = url:
        this.redirectUser('/');
      })
      .catch(err => {
        console.log(err.response.payload);
        this.redirectUser('/auth/login');
      });
  }

  redirectUser = path => {
    this.props.history.push(path);
  };

  render() {
    return (
      <div className="evaluatz_mask_load">
        <div className="evaluatz-logo-animated-wrapper">
          <div className="evaluatz-logo-animated">

          </div>
          <div className="evaluatz-logo-animated_E">
            E
      </div>
          <div className="evaluatz-logo-animated_V">
            V
      </div>
        </div>
      </div>
    );
  }
}

ConnectPage.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default ConnectPage;
