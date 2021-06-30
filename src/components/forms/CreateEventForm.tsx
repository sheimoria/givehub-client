import 'react-datepicker/dist/react-datepicker.css'

import * as yup from 'yup'

import { Controller, useForm } from 'react-hook-form'

import DatePicker from 'react-datepicker'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import useCreateEventMutation from 'hooks/useCreateEventMutation'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'

export default function CreateEventForm() {
  const [createEvent] = useCreateEventMutation()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(
      yup.object({
        name: yup.string().required('Required'),
        description: yup.string().required('Required'),
        dateStart: yup.date().required('Required'),
        dateEnd: yup.date().required('Required')
      })
    )
  })
  const router = useRouter()
  async function onSubmit(values) {
    const response = await createEvent({
      variables: {
        charityId: parseInt(router.query.id as string),
        input: values
      }
    })
    if (response.data.createEvent.errors) {
      return <p>{response.data.createEvent.errors.message}</p>
    } else if (response.data.createEvent.success) {
      router.back()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4>Create Event</h4>
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
      <button type="submit">Create Event</button>
    </form>
  )
}
