import { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const result = useQuery(
    ALL_BOOKS,
    genre
      ? {
          variables: { genre },
        }
      : {},
  )
  const allGenres = useQuery(ALL_GENRES)

  if (result.loading || allGenres.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  const genres = allGenres.data.allGenres

  return (
    <div>
      <h2>books</h2>

      {genre && (
        <p>
          in genre <b>{genre}</b>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books
