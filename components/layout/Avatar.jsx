import { Menu, Transition } from '@headlessui/react'

import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useApolloClient } from '@apollo/client'
import useLogOutMutation from 'hooks/useLogOutMutation'
import { useRouter } from 'next/router'

export default function Avatar({ user }) {
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
          <Menu.Button className="p-0 bg-transparent rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-600">
            <span className="sr-only">Open user menu</span>
            <Image
              src="/avatar.svg"
              alt="Avatar"
              height={36}
              width={36}
              className="rounded-full"
            />
          </Menu.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 z-10 flex flex-col py-3 mt-3 truncate origin-top-right bg-white rounded-md shadow-md dark:bg-gray-800"
            >
              <Menu.Item>
                {({ active }) => (
                  <h6 className="px-6 py-3"> {user.username}</h6>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href={`/users/${user.id}`}>
                    <a className="px-6 py-3 font-normal hover:bg-gray-100 dark:hover:bg-gray-700">
                      My Profile
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => <p className="px-6 py-3">My Charities</p>}
              </Menu.Item>
              {user.adminCharities.map((charity) => (
                <Menu.Item key={charity.id}>
                  {({ active }) => (
                    <Link href={`/charities/${charity.id}`}>
                      <a className="py-3 pl-8 pr-6 font-normal hover:bg-gray-100 dark:hover:bg-gray-700">
                        {charity.name}
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              ))}
              <Menu.Item>
                {({ active }) => (
                  <Link href={`/charities/sign-up`}>
                    <a className="px-6 py-3 font-normal hover:bg-gray-100 dark:hover:bg-gray-700">
                      New charity
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
