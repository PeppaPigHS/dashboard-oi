import React, { useState, useEffect, useRef, useCallback } from 'react'

import { Transition } from '@tailwindui/react'

import Link from 'next/link'

import firebase from 'lib/firebase'

import { useUser } from 'components/UserContext'

type authtype =
  | typeof firebase.auth.GoogleAuthProvider
  | typeof firebase.auth.FacebookAuthProvider
  | typeof firebase.auth.GithubAuthProvider

const loginWith = async (auth: authtype) => {
  const provider = new auth()
  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    return firebase.auth().signInWithPopup(provider)
  } catch (error) {}
}

const Movement = ({
  onClose,
  show,
  enter,
  enterFrom,
  enterTo,
  leave,
  leaveFrom,
  leaveTo,
  children,
}) => {
  const ref = useRef(null)
  const escapeListener = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose(false)
    }
  }, [])
  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (!(ref.current! as any).contains(e.target)) {
        onClose?.(false)
      }
    },
    [ref.current]
  )
  useEffect(() => {
    document.addEventListener('click', clickListener)
    document.addEventListener('keyup', escapeListener)
    return () => {
      document.removeEventListener('click', clickListener)
      document.removeEventListener('keyup', escapeListener)
    }
  }, [])
  return (
    <Transition
      show={show}
      enter={enter}
      enterFrom={enterFrom}
      enterTo={enterTo}
      leave={leave}
      leaveFrom={leaveFrom}
      leaveTo={leaveTo}
    >
      <div ref={ref}>{children}</div>
    </Transition>
  )
}

export const Nav = ({ page }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { user, userDispatch } = useUser()

  const { auth } = firebase

  return (
    <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <p className="text-lg font-bold">DashboardOI</p>
            </div>
            <div className="hidden sm:ml-6 sm:flex">
              <Link href="/">
                <a
                  className={`${
                    page == 'home'
                      ? 'border-teal-500 focus:border-teal-700 text-gray-900'
                      : 'border-transparent hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 text-gray-500'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out`}
                >
                  Home
                </a>
              </Link>
              <Link href="/checklist">
                <a
                  className={`${
                    page == 'checklist'
                      ? 'border-teal-500 focus:border-teal-700 text-gray-900'
                      : 'border-transparent hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 text-gray-500'
                  } ml-8 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out`}
                >
                  Checklist
                </a>
              </Link>
            </div>
          </div>
          {user.user ? (
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="ml-3 relative">
                <div>
                  <button
                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out items-center"
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.user.photoURL}
                    />
                    <span className="mx-4 text-md">{user.username}</span>
                  </button>
                </div>
                <Movement
                  onClose={setIsOpen}
                  show={isOpen}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                    <div
                      className="py-1 rounded-md bg-white shadow-xs"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <button
                        onClick={() => {
                          firebase
                            .auth()
                            .signOut()
                            .then(() => {
                              userDispatch({
                                type: 'LOADING_START',
                              })
                            })
                        }}
                        className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </Movement>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex sm:items-center">
              <div className="relative inline-block text-left">
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-600 shadow-sm hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition ease-in-out duration-150"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span>Login</span>
                  </button>
                </div>
                <Movement
                  onClose={setIsOpen}
                  show={isOpen}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
                    <div className="rounded-md bg-white shadow-xs">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button
                          onClick={() => loginWith(auth.GoogleAuthProvider)}
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 inline-flex items-center w-full"
                          role="menuitem"
                        >
                          <svg
                            className="h-4 w-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 488 512"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span>Login With Google</span>
                        </button>
                        <button
                          onClick={() => loginWith(auth.FacebookAuthProvider)}
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 inline-flex items-center w-full"
                          role="menuitem"
                        >
                          <svg
                            className="h-4 w-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span>Login With Facebook</span>
                        </button>
                        <button
                          onClick={() => loginWith(auth.GithubAuthProvider)}
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 inline-flex items-center w-full"
                          role="menuitem"
                        >
                          <svg
                            className="h-4 w-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 496 512"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span>Login With Github</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Movement>
              </div>
            </div>
          )}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Main menu"
              aria-expanded="false"
            >
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3">
          <Link href="/">
            <a
              href="#"
              className={`${
                page == 'home'
                  ? 'border-teal-500 text-teal-700 bg-teal-50 focus:text-teal-800 focus:bg-teal-100 focus:border-teal-700'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300'
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out`}
            >
              Home
            </a>
          </Link>
          <Link href="/checklist">
            <a
              href="#"
              className={`${
                page == 'checklist'
                  ? 'border-teal-500 text-teal-700 bg-teal-50 focus:text-teal-800 focus:bg-teal-100 focus:border-teal-700'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300'
              } mt-1 block pl-3 pr-4 py-2 border-l-4 text-base font-medium focus:outline-none transition duration-150 ease-in-out`}
            >
              Checklist
            </a>
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user.user ? (
            <React.Fragment>
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.user.photoURL}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-6 text-gray-800">
                    {user.username}
                  </div>
                  <div className="text-sm font-medium leading-5 text-gray-500">
                    {user.user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <a
                  href="#"
                  onClick={() => {
                    firebase
                      .auth()
                      .signOut()
                      .then(() => {
                        userDispatch({
                          type: 'LOADING_START',
                        })
                      })
                  }}
                  className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
                >
                  Sign out
                </a>
              </div>
            </React.Fragment>
          ) : (
            <div className="flex flex-col">
              <a
                onClick={() => loginWith(auth.GoogleAuthProvider)}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out inline-flex items-center"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill-rule="evenodd"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Login With Google
              </a>
              <a
                onClick={() => loginWith(auth.FacebookAuthProvider)}
                className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out inline-flex items-center"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill-rule="evenodd"
                    d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>Login With Facebook</span>
              </a>
              <a
                onClick={() => loginWith(auth.GithubAuthProvider)}
                className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out inline-flex items-center"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill-rule="evenodd"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>Login With Github</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
