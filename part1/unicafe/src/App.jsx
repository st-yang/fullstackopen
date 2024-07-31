import { useState } from 'react'

const Header = ({ name }) => <h1>{name}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistic = ({ name, value }) => (
  <div>
    {name} {value}
  </div>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = all ? (good - bad) / all : 0
  const positive = (all ? (good / all) * 100 : 0) + ' %'

  if (all === 0) {
    return <div>No feedback given</div>
  }

  return (
    <div>
      <Statistic name='good' value={good} />
      <Statistic name='neutral' value={neutral} />
      <Statistic name='bad' value={bad} />
      <Statistic name='all' value={all} />
      <Statistic name='average' value={average} />
      <Statistic name='positive' value={positive} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      {/* give feedback */}
      <Header name='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      {/* statictics */}
      <Header name='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
