import * as yup from 'yup'

import Form from 'components/Forms/Form'
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
      className="relative flex-1 p-0 bg-transparent border-none shadow-none dark:bg-transparent"
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <input
          {...register('search')}
          className="w-full pl-10 bg-white rounded-full shadow-sm dark:bg-gray-800"
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon aria-hidden="true" />
        </div>
      </div>
      {searchValue && (
        <SearchPreview isOpen={isOpen} searchValue={searchValue} />
      )}
    </Form>
  )
}
