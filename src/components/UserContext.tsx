import React, { useContext, useReducer, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import firebase from 'lib/firebase'

import { fetchFromFirebase } from 'utils/fetcher'

type User = firebase.User | null

export interface Data {
  username: string
  checklist: string[][]
}

type UserData = { user: User | undefined } & Data

interface UserState {
  user: UserData
  loading: boolean
}

type UserAction =
  | {
      type: 'RECEIVE_USER'
      payload: User
    }
  | {
      type: 'RECEIVE_CONTEXT'
      payload: Data
    }
  | {
      type: 'LOADING_DONE'
    }
  | {
      type: 'LOADING_START'
    }

type userContext = UserState & { userDispatch: React.Dispatch<UserAction> }

const initialState: UserState = {
  user: {
    user: undefined,
    username: '',
    checklist: [],
  },
  loading: true,
}

const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'RECEIVE_USER':
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          user: action.payload,
        }),
      })
    case 'RECEIVE_CONTEXT':
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          username: action.payload.username,
          checklist: action.payload.checklist,
        }),
      })
    case 'LOADING_DONE':
      return Object.assign({}, state, {
        loading: false,
      })
    case 'LOADING_START':
      return Object.assign({}, state, {
        loading: true,
      })
    default:
      return state
  }
}

const UserStateContext = React.createContext<userContext>({
  ...initialState,
  userDispatch: null,
})

export const useUser = () => useContext(UserStateContext)

const userContextComp = ({ children }) => {
  const [userState, userDispatch] = useReducer<
    React.Reducer<UserState, UserAction>
  >(reducer, initialState)

  const router = useRouter()

  const [triggerFetch, setTriggerFetch] = useState<boolean>(false)

  useEffect(() => {
    if (userState.user.user) {
      fetchFromFirebase('checkUser', {
        displayName: userState.user.user.displayName,
      }).then((check) => {
        if (!check) return
        setTriggerFetch(!!userState.user.user)
      })
    }
  }, [userState.user.user])

  useEffect(() => {
    if (triggerFetch && userState.user.user) {
      const unsubscribe = firebase
        .firestore()
        .doc(`users/${userState.user.user.uid}`)
        .onSnapshot((doc) => {
          const data = doc.data() as Data
          userDispatch({ type: 'RECEIVE_CONTEXT', payload: data })
          userDispatch({ type: 'LOADING_DONE' })
        })
      return () => unsubscribe()
    }
  }, [triggerFetch, userState.user.user])

  useEffect(() => {}, [userState.user.user])

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user === null || user.emailVerified) {
        userDispatch({
          type: 'RECEIVE_USER',
          payload: user,
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (
      userState.user.user !== null &&
      userState.loading === false &&
      userState.user.username === ''
    ) {
      router.push('/setusername')
    }
  }, [userState, router.pathname])

  return (
    <UserStateContext.Provider value={{ ...userState, userDispatch }}>
      {children}
    </UserStateContext.Provider>
  )
}

export default userContextComp
