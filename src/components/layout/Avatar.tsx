import { HeaderFragment, useLogOutMutation } from 'generated/graphql'
import { Menu, Transition } from '@headlessui/react'

import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'

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
          <Menu.Button className="bg-transparent border-none rounded-full shadow-sm w-9 h-9 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-rose-600">
            <span className="sr-only">Open user menu</span>
            <Image src="/avatar.svg" alt="Avatar" layout="fill" />
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
              className="absolute right-0 z-10 flex flex-col py-3 mt-3 truncate origin-top-right bg-white border border-gray-200 rounded-md shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <Menu.Item>
                {({ active }) => (
                  <h6 className="px-6 py-3">
                    {me.profile?.firstName} {me.profile?.lastName}
                  </h6>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href={{ pathname: '/user', query: { userId: me.id } }}>
                    <a className="px-6 py-3 font-normal hover:bg-gray-100 dark:hover:bg-gray-700">
                      My Profile
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href={{ pathname: '/charities' }}>
                    <a className="px-6 py-3 font-normal hover:bg-gray-100 dark:hover:bg-gray-700">
                      My Charities
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className="px-6 py-3 font-normal hover:bg-gray-100 dark:hover:bg-gray-700"
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
