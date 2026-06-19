const awsExports = {
  Auth: {
    Cognito: {
      userPoolId: 'eu-north-1_mgs2HLGmB',
      userPoolClientId: '4b84ifbrjq93gmmjh84b41kg40',
      loginWith: {
        oauth: {
          domain: 'eu-north-1mgs2hlgmb.auth.eu-north-1.amazoncognito.com',
          scopes: ['openid', 'email'],
          redirectSignIn: ['http://localhost:5173', 'https://master.d30rkla99zsa00.amplifyapp.com'],
          redirectSignOut: ['http://localhost:5173', 'https://master.d30rkla99zsa00.amplifyapp.com'],
          responseType: 'code'
        }
      }
    }
  }
}

export default awsExports