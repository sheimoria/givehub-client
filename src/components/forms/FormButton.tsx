type Props = {
  label: string
  isSubmitting: boolean
  className?: string
}

export default function FormButton({ label, isSubmitting, className }: Props) {
  return (
    <button type="submit" disabled={isSubmitting} className={className}>
      {isSubmitting && (
        <div className="w-5 h-5 border-4 rounded-full border-t-white border-rose-100 animate-spin" />
      )}
      {label}
    </button>
  )
}
