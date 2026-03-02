import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'

function useGetCurrentUser() {
  useEffect(() => {
    const getCurrentUser = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/me`, { withCredentials: true })
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    getCurrentUser()
  }, [])
}

export default useGetCurrentUser