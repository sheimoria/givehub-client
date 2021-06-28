import {
  ChatAltIcon,
  CodeIcon,
  DotsVerticalIcon,
  EyeIcon,
  FlagIcon,
  ShareIcon,
  StarIcon,
  ThumbUpIcon
} from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'

import Avatar from 'components/layout/Avatar'
import { Fragment } from 'react'
import classNames from 'utils/classNames'
import { usePostQuery } from 'hooks/graphql'

export default function Post({ id }) {
  const { data, loading, error } = usePostQuery(id)

  if (error) {
    return <article>{error.message}</article>
  }
  if (loading) {
    return <article className="bg-opacity-75 animate-pulse"></article>
  }
  if (data) {
    return (
      <article aria-labelledby={'post-title-' + data.post.title}>
        <div>
          <div className="flex space-x-3">
            <Avatar
              url={
                'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              }
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                <a
                  href={`/individuals/${data.post.creator.id}`}
                  className="hover:underline"
                >
                  {/* {data.post.author.firstName} {data.post.author.lastName} */}{' '}
                  {data.post.creator.username}
                </a>
              </p>
              <p className="text-sm text-gray-500">
                <a href={`/posts/${data.post.id}`} className="hover:underline">
                  <time>
                    {/* time attribute: dateTime={data.post.datetime} */}
                    {/* {data.post.date} at {data.post.time} */} June 21 at
                    12:00AM
                  </time>
                </a>
              </p>
            </div>
            <div className="flex self-center flex-shrink-0">
              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className="flex items-center p-2 -m-2 text-gray-400 rounded-full hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <DotsVerticalIcon
                          className="w-5 h-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

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
                        className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'flex px-4 py-2 text-sm'
                                )}
                              >
                                <StarIcon
                                  className="w-5 h-5 mr-3 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Add to favorites</span>
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'flex px-4 py-2 text-sm'
                                )}
                              >
                                <CodeIcon
                                  className="w-5 h-5 mr-3 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Embed</span>
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'flex px-4 py-2 text-sm'
                                )}
                              >
                                <FlagIcon
                                  className="w-5 h-5 mr-3 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Report content</span>
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
          <h2
            id={'post-title-' + data.post.id}
            className="mt-4 text-base font-medium text-gray-900"
          >
            {data.post.title}
          </h2>
        </div>
        <div
          className="mt-2 space-y-4 text-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: data.post.text }}
        />
        <div className="flex justify-between mt-6 space-x-8">
          <div className="flex space-x-6">
            <span className="inline-flex items-center text-sm">
              <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                <ThumbUpIcon className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">
                  {/* {data.post.likes} */}
                </span>
                <span className="sr-only">likes</span>
              </button>
            </span>
            <span className="inline-flex items-center text-sm">
              <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                <ChatAltIcon className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">
                  {/* {data.post.replies} */}
                </span>
                <span className="sr-only">replies</span>
              </button>
            </span>
            <span className="inline-flex items-center text-sm">
              <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                <EyeIcon className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">
                  {/* {data.post.views} */}
                </span>
                <span className="sr-only">views</span>
              </button>
            </span>
          </div>
          <div className="flex text-sm">
            <span className="inline-flex items-center text-sm">
              <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                <ShareIcon className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">Share</span>
              </button>
            </span>
          </div>
        </div>
      </article>
    )
  }
}
