import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { Amplify } from 'aws-amplify'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'eu-north-1_siuObXbwj',
      userPoolClientId: '4f7tqfc6d0341fjjbs1v0jduu',
      loginWith: {
        oauth: {
          domain: 'eu-north-1siuobxbwj.auth.eu-north-1.amazoncognito.com',
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: ['http://localhost:5173', 'https://master.d30rkla99zsa00.amplifyapp.com'],
          redirectSignOut: ['http://localhost:5173', 'https://master.d30rkla99zsa00.amplifyapp.com'],
          responseType: 'code'
        }
      }
    }
  }
})


const app = createApp(App)
app.use(router)
app.mount('#app')