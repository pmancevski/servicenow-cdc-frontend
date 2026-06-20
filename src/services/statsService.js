import axios from 'axios'
import { fetchAuthSession } from 'aws-amplify/auth'

const API_URL = 'https://3nhftt97bb.execute-api.eu-north-1.amazonaws.com/prod'

export const fetchRealStats = async () => {
  try {
    const session = await fetchAuthSession()
    const token = session.tokens.accessToken.toString()
    
    console.log('Token:', token) // Check if token is fetched
    
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return JSON.parse(response.data.body)
  } catch (error) {
    console.error('Error fetching token or stats:', error)
    throw error
  }
}

export const fetchRandomStats = () => {
  return {
    total: Math.floor(Math.random() * 100) + 10,
    open: Math.floor(Math.random() * 20) + 1,
    resolved: Math.floor(Math.random() * 30) + 1
  }
}