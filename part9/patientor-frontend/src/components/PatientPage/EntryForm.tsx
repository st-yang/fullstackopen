import { Alert, Button, MenuItem, Select, TextField } from '@mui/material'
import { useState } from 'react'

import patientService from '../../services/patients'
import { NewEntry, Patient } from '../../types'
import { AxiosError } from 'axios'
import { assertNever } from '../../utils'

interface Props {
  patient: Patient
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>
}

const EntryForm = ({ patient, setPatient }: Props) => {
  const [expand, setExpand] = useState<boolean>(false)
  const [error, setError] = useState('')

  const [type, setType] = useState<'HealthCheck' | 'OccupationalHealthcare' | 'Hospital'>('HealthCheck')

  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState('')

  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState('')
  // OccupationalHealthcare
  const [employerName, setEmployeeName] = useState('')
  const [sickLeaveStart, setSickLeaveStart] = useState('')
  const [sickLeaveEnd, setSickLeaveEnd] = useState('')
  // Hospital
  const [dischargeDate, setDischargeDate] = useState('')
  const [dischargeCriteria, setDischargeCriteria] = useState('')

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()

    let newEntry: NewEntry
    switch (type) {
      case 'HealthCheck':
        newEntry = {
          type,
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes.split(',').map((code) => code.trim()),
          healthCheckRating: parseInt(healthCheckRating),
        }
        break
      case 'OccupationalHealthcare':
        newEntry = {
          type,
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes.split(',').map((code) => code.trim()),
          employerName,
          sickLeave: {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd,
          },
        }
        break
      case 'Hospital':
        newEntry = {
          type,
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes.split(',').map((code) => code.trim()),
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        }
        break
      default:
        return assertNever(type)
    }

    patientService
      .createEntry(patient.id, newEntry)
      .then((data) => {
        setPatient(data)

        setError('')

        setDescription('')
        setDate('')
        setSpecialist('')
        setDiagnosisCodes('')

        setHealthCheckRating('')
        setEmployeeName('')
        setSickLeaveStart('')
        setSickLeaveEnd('')
        setDischargeDate('')
        setDischargeCriteria('')

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
          <Select
            variant='standard'
            label='Type'
            value={type}
            onChange={(event) => setType(event.target.value as 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital')}
          >
            <MenuItem value='HealthCheck'>Health Check</MenuItem>
            <MenuItem value='OccupationalHealthcare'>Occupational Healthcare</MenuItem>
            <MenuItem value='Hospital'>Hospital</MenuItem>
          </Select>
        </div>
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
            label='Diagnosis codes'
            value={diagnosisCodes}
            onChange={(event) => setDiagnosisCodes(event.target.value)}
          />
        </div>
        {type === 'HealthCheck' && (
          <div>
            <TextField
              variant='standard'
              label='Healthcheck rating'
              value={healthCheckRating}
              onChange={(event) => setHealthCheckRating(event.target.value)}
            />
          </div>
        )}
        {type === 'OccupationalHealthcare' && (
          <div>
            <TextField
              variant='standard'
              label='Employer Name'
              value={employerName}
              onChange={(event) => setEmployeeName(event.target.value)}
            />
          </div>
        )}
        {type === 'OccupationalHealthcare' && (
          <div>
            <TextField
              variant='standard'
              label='Sick Leave Start Date'
              value={sickLeaveStart}
              onChange={(event) => setSickLeaveStart(event.target.value)}
            />{' '}
            <TextField
              variant='standard'
              label='Sick Leave End Date'
              value={sickLeaveEnd}
              onChange={(event) => setSickLeaveEnd(event.target.value)}
            />
          </div>
        )}
        {type === 'Hospital' && (
          <div>
            <TextField
              variant='standard'
              label='Discharge Date'
              value={dischargeDate}
              onChange={(event) => setDischargeDate(event.target.value)}
            />{' '}
            <TextField
              variant='standard'
              label='Discharge Criteria'
              value={dischargeCriteria}
              onChange={(event) => setDischargeCriteria(event.target.value)}
            />
          </div>
        )}
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
