const awsExports = {
  Auth: {
    region: 'eu-north-1',
    userPoolId: 'eu-north-1_siuObXbwj',
    userPoolWebClientId: '4f7tqfc6d0341fjjbs1v0jduu',
    oauth: {
      domain: 'servicenow-cdc.auth.eu-north-1.amazoncognito.com',
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: 'http://localhost:5173',
      redirectSignOut: 'http://localhost:5173',
      responseType: 'code'
    }
  }
}

export default awsExports