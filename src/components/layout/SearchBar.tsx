import * as yup from 'yup'

import Form from 'components/forms/Form'
import { SearchIcon } from '@heroicons/react/outline'
import SearchPreview from './SearchPreview'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

export default function SearchBar() {
  const { register, handleSubmit, watch } = useForm({
    resolver: yupResolver(yup.object({ search: yup.string() }))
  })
  const searchValue = watch('search')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={() => null}
      className="relative flex-1"
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <input
          {...register('search')}
          className="w-full px-12 py-2 text-sm text-gray-700 transition-colors bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-600"
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          autoComplete="off"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none dark:text-gray-500">
          <SearchIcon aria-hidden="true" />
        </div>
      </div>
      {searchValue && (
        <SearchPreview isOpen={isOpen} searchValue={searchValue} />
      )}
    </Form>
  )
}
