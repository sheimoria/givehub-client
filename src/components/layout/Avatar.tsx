import { HeaderFragment, useLogOutMutation } from 'generated/graphql'
import { Menu, Transition } from '@headlessui/react'

import { Fragment } from 'react'
import Link from 'next/link'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import Picture from 'components/Picture'

export default function Avatar({ me }: { me: HeaderFragment }) {
  const apolloClient = useApolloClient()
  const [logOut] = useLogOutMutation()
  const router = useRouter()
  async function handleLogOut() {
    await logOut()
    await apolloClient.resetStore()
    router.replace('/')
  }

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button className="p-0 bg-transparent border-none focus:outline-none hover:translate-y-0 active:translate-y-0 hover:bg-transparent hover:border-none">
            <span className="sr-only">Open user menu</span>
            <Picture pictureId={me.profile?.displayPicture} size={9} />
          </Menu.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 z-10 flex flex-col py-2.5 mt-3 truncate origin-top-right bg-white bordered rounded-md shadow-md focus:outline-none dark:bg-gray-800"
            >
              <Menu.Item>
                {({ active }) => (
                  <h6 className="px-5 py-2.5">
                    {me.profile?.firstName} {me.profile?.lastName}
                  </h6>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href={{ pathname: '/user', query: { userId: me.id } }}>
                    <a className="px-5 py-2.5 font-normal hover:bg-gray-100 dark:hover:bg-gray-700">
                      My Profile
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href={{ pathname: '/charities' }}>
                    <a className="px-5 py-2.5 font-normal hover:bg-gray-100 dark:hover:bg-gray-700">
                      My Charities
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className="px-5 py-2.5 font-normal hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={handleLogOut}
                  >
                    Log Out
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
