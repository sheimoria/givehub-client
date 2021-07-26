export default function formatDatetime(datetime: string) {
  return new Date(parseInt(datetime)).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: 'numeric'
  })
}
