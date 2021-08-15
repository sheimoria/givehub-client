type Props = {
  label: string
  isSubmitting: boolean
}

export default function FormButton({ label, isSubmitting }: Props) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="px-4 py-2 text-sm font-medium text-white rounded-full  bg-rose-600 hover:bg-rose-700"
    >
      {isSubmitting && (
        <div className="w-5 h-5 border-4 rounded-full border-t-white border-rose-100 animate-spin" />
      )}
      {label}
    </button>
  )
}
