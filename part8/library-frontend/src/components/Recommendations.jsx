import { useQuery } from '@apollo/client'

import { ALL_BOOKS, ME } from '../queries'

const Recommendations = (props) => {
  const result = useQuery(ALL_BOOKS)
  const me = useQuery(ME)

  if (result.loading || me.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  const genre = me.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <b>{genre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((b) => (genre ? b.genres.includes(genre) : true))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
