import React from 'react';
import _ from 'lodash';
import { getParamValues } from '../../utils/functions';
export default class RedirectPage extends React.Component {
  componentDidMount() {
    const { setExpiryTime, history, location } = this.props;
    try {
      if (_.isEmpty(location.hash)) {
        return history.push('/spotify-react-app/search');
      }
      const access_token = getParamValues(location.hash);
      const expiryTime = new Date().getTime() + access_token.expires_in * 1000;
      localStorage.setItem('params', JSON.stringify(access_token));
      localStorage.setItem('expiry_time', expiryTime);
      history.push('/spotify-react-app/search');
    } catch (error) {
      history.push('/spotify-react-app');
    }
  }
  render() {
    return null;
  }
}