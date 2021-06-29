import 'react-datepicker/dist/react-datepicker.css'

import * as yup from 'yup'

import { Controller, useForm } from 'react-hook-form'
import {
  ExclamationCircleIcon,
  SaveIcon,
  TrashIcon
} from '@heroicons/react/solid'

import DatePicker from 'react-datepicker'
import useDeleteEventMutation from 'hooks/useDeleteEventMutation'
import { useRouter } from 'next/router'
import useUpdateEventMutation from 'hooks/useUpdateEventMutation'
import { yupResolver } from '@hookform/resolvers/yup'

export default function UpdateEventForm() {
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(
      yup.object({
        name: yup.string().required('Required'),
        description: yup.string().required('Required'),
        dateStart: yup.number().positive().integer().required('Required'),
        dateEnd: yup.number().positive().integer().required('Required')
      })
    ),
    defaultValues: {
      name: router.query.name,
      description: router.query.description,
      dateStart: parseInt(router.query.dateStart),
      dateEnd: parseInt(router.query.dateStart),
      venue: router.query.venue
    }
  })

  const [updateEvent] = useUpdateEventMutation()

  async function handleUpdate(values) {
    const response = await updateEvent({
      variables: {
        id: parseInt(router.query.id),
        input: {
          name: values.name,
          description: values.description,
          dateStart: new Date(values.dateStart),
          dateEnd: new Date(values.dateEnd),
          venue: values.venue
        }
      }
    })
    if (response.data.updateEvent.errors) {
      response.data.updateEvent.errors.forEach(({ field, message }) =>
        setError(field, { type: 'manual', message: message })
      )
    } else if (response.data.updateEvent.success) {
      router.back()
    }
  }

  const [deleteEvent] = useDeleteEventMutation()

  async function handleDelete() {
    const response = await deleteEvent({
      variables: { id: parseInt(router.query.id) }
    })
    if (response.data.deleteEvent.errors) {
    } else if (response.data.deleteEvent.success) {
      router.back()
    }
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
            defaultValue={new Date(parseInt(router.query.dateStart))}
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
            defaultValue={new Date(parseInt(router.query.dateEnd))}
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
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Venue</label>
        <input {...register('venue')} />
        {errors.venue && (
          <span className="flex gap-2 text-sm text-red-500">
            <ExclamationCircleIcon className="w-5 h-5" />
            {errors.venue.message}
          </span>
        )}
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
