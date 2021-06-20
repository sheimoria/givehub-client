import { ExclamationCircleIcon } from '@heroicons/react/solid'

export default function Field({
  register,
  errors,
  name,
  label,
  type,
  placeholder,
  options
}) {
  if (type === 'select') {
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <select {...register(name)}>
          {options.map((option) => (
            <option key={option.name} value={option.name}>
              {option.label}
            </option>
          ))}
        </select>
        {errors && (
          <p>
            <ExclamationCircleIcon className="w-5 h-5" />
            {errors.message}
          </p>
        )}
      </>
    )
  } else if (type === 'checkbox') {
    return (
      <>
        <div className="flex items-center gap-4">
          <input type="checkbox" {...register(name)} />
          <label htmlFor={name} className="font-normal">
            {label}
          </label>
          {errors && (
            <p>
              <ExclamationCircleIcon className="w-5 h-5" />
              {errors.message}
            </p>
          )}
        </div>
      </>
    )
  } else if (type === 'textarea') {
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <textarea placeholder={placeholder} {...register(name)}></textarea>
        {errors && (
          <p>
            <ExclamationCircleIcon className="w-5 h-5" />
            {errors.message}
          </p>
        )}
      </>
    )
  } else {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={name}>{label}</label>
        <input placeholder={placeholder} {...register(name)} />
        {errors && (
          <span className="flex gap-2 text-sm text-red-500">
            <ExclamationCircleIcon className="w-5 h-5" />
            {errors.message}
          </span>
        )}
      </div>
    )
  }
}
