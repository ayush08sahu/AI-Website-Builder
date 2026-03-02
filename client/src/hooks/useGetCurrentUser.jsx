import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function useGetCurrentUser() {
    const dispatch = useDispatch()
  useEffect(() => {
    const getCurrentUser = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/me`, { withCredentials: true })
            console.log(result)
            dispatch(setUserData(result.data))
        } catch (error) {
            console.log(error)
        }
    }
    getCurrentUser()
  }, [])
}

export default useGetCurrentUser