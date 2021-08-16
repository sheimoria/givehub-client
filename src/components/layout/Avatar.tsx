import { HeaderFragment, useLogOutMutation } from 'generated/graphql'
import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'
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
    <Menu as="div" className="relative -mb-2">
      {({ open }) => (
        <>
          <Menu.Button>
            <span className="sr-only">Open user menu</span>
            <div className="relative flex flex-none w-10 h-10 overflow-hidden rounded-full bordered">
              {me.profile?.displayPicture ? (
                <Image
                  src={`https://res.cloudinary.com/givehub/image/upload/v1627495464/${me.profile.displayPicture}`}
                  alt="Profile Picture"
                  layout="fill"
                />
              ) : (
                <Image src="/avatar.svg" alt="Picture" layout="fill" />
              )}
            </div>
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
              className="absolute right-0 z-10 flex flex-col py-2.5 mt-2 truncate origin-top-right bg-white rounded-md shadow focus:outline-none dark:bg-gray-800"
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
                    <a className="px-5 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                      My Profile
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href={{ pathname: '/charities' }}>
                    <a className="px-5 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                      My Charities
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className="px-5c cursor-pointer py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
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
