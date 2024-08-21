import { Alert, Button, Checkbox, Input, InputLabel, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import { useState } from 'react'

import patientService from '../../services/patients'
import { Diagnosis, NewEntry, Patient } from '../../types'
import { AxiosError } from 'axios'
import { assertNever } from '../../utils'

interface Props {
  patient: Patient
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>
  diagnoses: Diagnosis[]
}

const EntryForm = ({ patient, setPatient, diagnoses }: Props) => {
  const [expand, setExpand] = useState<boolean>(false)
  const [error, setError] = useState('')

  const [type, setType] = useState<'HealthCheck' | 'OccupationalHealthcare' | 'Hospital'>('HealthCheck')

  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])

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
          diagnosisCodes,
          healthCheckRating: parseInt(healthCheckRating),
        }
        break
      case 'OccupationalHealthcare':
        newEntry = {
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
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
          diagnosisCodes,
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
        setDiagnosisCodes([])

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
            fullWidth
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
            fullWidth
            variant='standard'
            label='Description'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <InputLabel id='date-label'>Date</InputLabel>
          <Input
            fullWidth
            type='date'
            placeholder='Date'
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            variant='standard'
            label='Specialist'
            value={specialist}
            onChange={(event) => setSpecialist(event.target.value)}
          />
        </div>
        <div>
          <InputLabel id='diagnosis-codes-label'>Diagnosis codes</InputLabel>
          <Select
            fullWidth
            multiple
            variant='standard'
            labelId='diagnosis-codes-label'
            label='Diagnosis codes'
            renderValue={(selected) => selected.join(', ')}
            value={diagnosisCodes}
            onChange={(event) => {
              const {
                target: { value },
              } = event
              setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value)
            }}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                <Checkbox checked={diagnosisCodes.includes(diagnosis.code)} />
                <ListItemText primary={diagnosis.name} />
              </MenuItem>
            ))}
          </Select>
        </div>
        {type === 'HealthCheck' && (
          <div>
            <TextField
              fullWidth
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
              fullWidth
              variant='standard'
              label='Employer Name'
              value={employerName}
              onChange={(event) => setEmployeeName(event.target.value)}
            />
          </div>
        )}
        {type === 'OccupationalHealthcare' && (
          <div>
            <InputLabel id='sickleave-start-date-label'>Sick Leave Start Date</InputLabel>
            <Input
              fullWidth
              type='date'
              placeholder='Sick Leave Start Date'
              value={sickLeaveStart}
              onChange={(event) => setSickLeaveStart(event.target.value)}
            />
            <InputLabel id='sickleave-end-date-label'>Sick Leave End Date</InputLabel>
            <Input
              fullWidth
              type='date'
              placeholder='Sick Leave End Date'
              value={sickLeaveEnd}
              onChange={(event) => setSickLeaveEnd(event.target.value)}
            />
          </div>
        )}
        {type === 'Hospital' && (
          <div>
            <InputLabel id='discharge-date-label'>Discharge Date</InputLabel>
            <Input
              fullWidth
              type='date'
              placeholder='Discharge Date'
              value={dischargeDate}
              onChange={(event) => setDischargeDate(event.target.value)}
            />
            <TextField
              fullWidth
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
