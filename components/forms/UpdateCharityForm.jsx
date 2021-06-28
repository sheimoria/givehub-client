import * as yup from 'yup'

import {
  ExclamationCircleIcon,
  SaveIcon,
  TrashIcon
} from '@heroicons/react/solid'

import { updateCharitySchema } from 'utils/formSchemas'
import useCharityQuery from 'hooks/useCharityQuery'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import useUpdateCharityMutation from 'hooks/useUpdateCharityMutation'
import { yupResolver } from '@hookform/resolvers/yup'

export default async function UpdateCharityForm() {
  const router = useRouter()
  const { data } = await useCharityQuery(router.query.id)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(updateCharitySchema.validation),
    defaultValues: {
      name: data.charity.name,
      uen: data.charity.uen
    }
  })

  const [updateEvent] = useUpdateEventMutation()
  const [deleteEvent] = useDeleteEventMutation()

  async function handleUpdate(values) {
    const response = await updateEvent({
      variables: { id: parseInt(router.query.id), input: values }
    })
    if (response.data.updateEvent.errors) {
      return <p>{response.data.updateEvent.errors.message}</p>
    } else if (response.data.updateEvent.success) {
      router.back()
    }
  }

  async function handleDelete() {
    const response = await deleteEvent({
      variables: { id: parseInt(router.query.id) }
    })
    router.back()
  }

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <h4>Update Event</h4>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <input {...register('name')} />
        {errors.name && (
          <span className="flex gap-2 text-sm text-red-500">
            <ExclamationCircleIcon className="w-5 h-5" />
            {errors.name.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description</label>
        <textarea {...register('description')} />
        {errors.description && (
          <span className="flex gap-2 text-sm text-red-500">
            <ExclamationCircleIcon className="w-5 h-5" />
            {errors.description.message}
          </span>
        )}
      </div>
      <div className="flex">
        <div className="flex flex-col flex-1 gap-2">
          <label htmlFor="dateStart">Starting date and time</label>
          <Controller
            control={control}
            name="dateStart"
            render={({ field }) => (
              <DatePicker
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="d MMM yyyy, h:mm aa"
                className="text-sm text-gray-600 bg-white border-none rounded-lg"
              />
            )}
          />
          {errors.dateStart && (
            <span className="flex gap-2 text-sm text-red-500">
              <ExclamationCircleIcon className="w-5 h-5" />
              {errors.dateStart.message}
            </span>
          )}
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <label htmlFor="dateEnd">Ending date and time</label>
          <Controller
            control={control}
            name="dateEnd"
            render={({ field }) => (
              <DatePicker
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="d MMM yyyy, h:mm aa"
                className="text-sm text-gray-600 bg-white border-none rounded-lg"
              />
            )}
          />
          {errors.dateEnd && (
            <span className="flex gap-2 text-sm text-red-500">
              <ExclamationCircleIcon className="w-5 h-5" />
              {errors.dateEnd.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <button type="submit" className="flex-1">
          <SaveIcon className="w-5 h-5" />
          Save Changes
        </button>
        <button onClick={handleDelete} className="flex-1">
          <TrashIcon className="w-5 h-5" />
          Delete Event
        </button>
      </div>
    </form>
  )
}
