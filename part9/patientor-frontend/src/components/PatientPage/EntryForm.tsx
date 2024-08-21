import { Alert, Button, TextField } from '@mui/material'
import { useState } from 'react'

import patientService from '../../services/patients'
import { NewEntry, Patient } from '../../types'
import { AxiosError } from 'axios'

interface Props {
  patient: Patient
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>
}

const EntryForm = ({ patient, setPatient }: Props) => {
  const [expand, setExpand] = useState<boolean>(false)
  const [error, setError] = useState('')

  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [healthCheckRating, setHealthCheckRating] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState('')

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newEntry: NewEntry = {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating: parseInt(healthCheckRating),
      diagnosisCodes: diagnosisCodes.split(',').map((code) => code.trim()),
    }
    patientService
      .createEntry(patient.id, newEntry)
      .then((data) => {
        setPatient(data)

        setError('')
        setDescription('')
        setDate('')
        setSpecialist('')
        setHealthCheckRating('')
        setDiagnosisCodes('')
        setExpand(false)
      })
      .catch((error: AxiosError<string>) => {
        if (error.response) {
          setError(error.response.data)
        }
      })
  }

  if (expand) {
    return (
      <form style={{ border: 'dotted', padding: 10 }} onSubmit={entryCreation}>
        <h4>New HealthCheck entry</h4>
        {error && <Alert severity='error'>{error}</Alert>}
        <div>
          <TextField
            variant='standard'
            label='Description'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <TextField variant='standard' label='Date' value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          <TextField
            variant='standard'
            label='Specialist'
            value={specialist}
            onChange={(event) => setSpecialist(event.target.value)}
          />
        </div>
        <div>
          <TextField
            variant='standard'
            label='Healthcheck rating'
            value={healthCheckRating}
            onChange={(event) => setHealthCheckRating(event.target.value)}
          />
        </div>
        <div>
          <TextField
            variant='standard'
            label='Diagnosis codes'
            value={diagnosisCodes}
            onChange={(event) => setDiagnosisCodes(event.target.value)}
          />
        </div>
        <div style={{ padding: 10 }}>
          <Button variant='contained' color='error' onClick={() => setExpand(false)}>
            CANCEL
          </Button>
          <Button variant='contained' type='submit' style={{ float: 'right' }}>
            ADD
          </Button>
        </div>
      </form>
    )
  } else {
    return (
      <Button variant='contained' color='primary' onClick={() => setExpand(true)}>
        ADD NEW ENTRY
      </Button>
    )
  }
}

export default EntryForm
