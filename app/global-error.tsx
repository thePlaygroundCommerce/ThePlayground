'use client' // Error components must be Client Components
 
import Heading from 'components/typography/Heading'
import { useEffect } from 'react'
 
export default function PageError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <Heading>Oops, something went wrong!</Heading>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}