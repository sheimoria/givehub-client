type Props = {
  label: string
  isSubmitting: boolean
}

export default function FormButton({ label, isSubmitting }: Props) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md bg-rose-600 hover:bg-rose-700 dark:hover:bg-rose-500"
    >
      {isSubmitting && (
        <div className="w-5 h-5 border-2 rounded-full border-t-white border-rose-100 animate-spin" />
      )}
      {label}
    </button>
  )
}
