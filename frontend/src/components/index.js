import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class IndexPage extends Component {

  render() {
    return (
      <header className="site-header">
        <div className="container">
          <div className="site-header-large-bg"><span></span></div>
          <div className="site-header-inner">
            <div className="brand header-brand">
              <h3 className="m-0">
                <Link style={{ textDecoration: 'none' }} to="/">
                  {"DISASTER VIBES"}
                </Link>
              </h3>
              <h5 className="m-0">
                <Link style={{ textDecoration: 'none' }} to="/insured">
                  {"INSURED"}
                </Link>
              </h5>
              <div/>
              <h5 className="m-0">
                <Link style={{ textDecoration: 'none' }} to="/insurer">
                  {"INSURER"}
                </Link>
              </h5>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default IndexPage;