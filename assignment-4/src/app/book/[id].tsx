import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const BookDetails = () => {
  const router = useRouter()
  const { id } = router.query

  const [book, setBook] = useState(null)

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/book/${id}`)
          const data = await response.json()
          setBook(data)
        } catch (error) {
          console.error('Error fetching book details:', error)
        }
      }

      fetchData()
    }
  }, [id])

  return (
    <div>
      <h1>Book Details</h1>
      {book ? (
        <div>
          <h2>{book}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default BookDetails
