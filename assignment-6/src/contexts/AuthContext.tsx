import {
  createContext,
  useReducer,
  // useEffect,
  useMemo,
  useCallback,
} from 'react'
import apiService from '../app/apiService'
// import { isValidToken } from '../utils/jwt'

interface IUser {
  id: number
  avatar: string
  email: string
  fullName: string
}

interface IState {
  isInitialized: boolean
  isAuthenticated: boolean
  user: IUser | null
}

interface IAuthAction {
  type: 'AUTH.INITIALIZE' | 'AUTH.LOGIN_SUCCESS' | 'AUTH.LOGOUT'
  payload: { isAuthenticated: boolean; user: IUser }
}

const initialState: IState = {
  isInitialized: false,
  isAuthenticated: false,
  user: {
    id: 1,
    avatar: '',
    email: '',
    fullName: '',
  },
}

const INITIALIZE = 'AUTH.INITIALIZE'
const LOGIN_SUCCESS = 'AUTH.LOGIN_SUCCESS'
const LOGOUT = 'AUTH.LOGOUT'

const reducer = (state: IState, action: IAuthAction) => {
  switch (action.type) {
    case INITIALIZE: {
      const { isAuthenticated, user } = action.payload
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      }
    }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    default:
      return state
  }
}

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    window.localStorage.setItem('accessToken', accessToken)
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  } else {
    window.localStorage.removeItem('accessToken')
    delete apiService.defaults.headers.common.Authorization
  }
}

const AuthContext = createContext({ ...initialState })

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // useEffect(() => {
  //   const initialize = async () => {
  //     try {
  //       const accessToken = window.localStorage.getItem('accessToken')

  //       if (accessToken && isValidToken(accessToken)) {
  //         setSession(accessToken)

  //         const response = await apiService.get('/users/me')
  //         const user = response.data.data

  //         dispatch({
  //           type: INITIALIZE,
  //           payload: { isAuthenticated: true, user },
  //         })
  //       } else {
  //         setSession('')

  //         dispatch({
  //           type: INITIALIZE,
  //           payload: {
  //             isAuthenticated: false,
  //             user: {
  //               id: 1,
  //               avatar: '',
  //               email: '',
  //               fullName: '',
  //             },
  //           },
  //         })
  //       }
  //     } catch (err) {
  //       console.error(err)

  //       setSession('')
  //       dispatch({
  //         type: INITIALIZE,
  //         payload: {
  //           isAuthenticated: false,
  //           user: {
  //             id: 1,
  //             avatar: '',
  //             email: '',
  //             fullName: '',
  //           },
  //         },
  //       })
  //     }
  //   }

  //   initialize()
  // }, [])

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        const response = await apiService.post('/auth/login', {
          email,
          password,
        })
        const { user, accessToken } = response.data.data

        setSession(accessToken)
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { isAuthenticated: true, user },
        })
        console.log('Login response:', response)
      } catch (error) {
        console.error('Login error:', error)
      }
    },
    [],
  )

  const logout = useCallback(async () => {
    setSession(null)
    dispatch({
      type: LOGOUT,
      payload: {
        isAuthenticated: false,
        user: {
          id: 1,
          avatar: '',
          email: '',
          fullName: '',
        },
      },
    })
  }, [])

  const contextValue = useMemo(
    () => ({
      ...state,
      login,
      logout,
    }),
    [login, logout, state],
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
