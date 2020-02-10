import React from "react"
import PropTypes from "prop-types"
import Keycloak from 'keycloak-js';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { keycloak: null, authenticated: false }
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json')
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated })
    })
  }

  getLayout() {
    let { getComponent, layoutSelectors } = this.props
    const layoutName = layoutSelectors.current()
    const Component = getComponent(layoutName, true)
    return Component ? Component : ()=> <h1> No layout defined for &quot;{layoutName}&quot; </h1>
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) {
        const Layout = this.getLayout()
        return (
          <Layout/>
        )
      } else return (<div>Unable to authenticate!</div>)
    } else {
      return (<div>Validating SignIn</div>)
    }
  }
}

App.propTypes = {
  getComponent: PropTypes.func.isRequired,
  layoutSelectors: PropTypes.object.isRequired,
}

App.defaultProps = {
}
