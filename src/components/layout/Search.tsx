import * as yup from 'yup'

import Form from 'components/forms/Form'
import Input from 'components/forms/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

export default function Search() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(yup.object({ search: yup.string() })) })

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={console.log}
      className="w-2/3 p-0 bg-transparent border-none rounded-full dark:bg-transparent"
    >
      <Input
        name="search"
        placeholder="Search"
        register={register}
        errors={errors.search}
        className="rounded-full"
      />
    </Form>
  )
}
