import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent } from '@mui/material'
import { Favorite, Female, Healing, HealthAndSafety, LocalHospital, Male, Transgender } from '@mui/icons-material'

import patientService from '../../services/patients'
import { Diagnosis, Entry, Gender, HealthCheckRating, Patient } from '../../types'
import { assertNever } from '../../utils'

interface Props {
  diagnoses: Diagnosis[]
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams()
  const [patient, setPatient] = useState<Patient | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = id ? await patientService.get(id) : null
      setPatient(data)
    }

    fetchData()
  }, [id])
  if (!patient) return null

  const genderIcon = () => {
    switch (patient.gender) {
      case Gender.Male:
        return <Male />
      case Gender.Female:
        return <Female />
      case Gender.Other:
        return <Transgender />
      default:
        return <></>
    }
  }

  const EntryDetails = ({ entry }: { entry: Entry }) => {
    let icon: JSX.Element
    let employerName = <></>
    let healthRate = <></>
    switch (entry.type) {
      case 'Hospital':
        icon = <LocalHospital />
        break
      case 'OccupationalHealthcare':
        icon = <Healing />
        employerName = <i>{entry.employerName}</i>
        break
      case 'HealthCheck':
        icon = <HealthAndSafety />
        let color: 'error' | 'info' | 'success' | 'warning'
        switch (entry.healthCheckRating) {
          case HealthCheckRating.Healthy:
            color = 'success'
            break
          case HealthCheckRating.LowRisk:
            color = 'info'
            break
          case HealthCheckRating.HighRisk:
            color = 'warning'
            break
          case HealthCheckRating.CriticalRisk:
            color = 'error'
            break
        }
        healthRate = (
          <CardContent>
            <Favorite color={color} />
          </CardContent>
        )
        break
      default:
        return assertNever(entry)
    }

    return (
      <Card>
        <CardContent>
          {entry.date} {icon} {employerName}
        </CardContent>
        <CardContent>
          <i>{entry.description}</i>
        </CardContent>
        {healthRate}
        <CardContent>diagnose by {entry.specialist}</CardContent>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code} {diagnoses.find((d) => d.code === code)?.name}
            </li>
          ))}
        </ul>
      </Card>
    )
  }

  return (
    <div>
      <h2>
        {patient.name} {genderIcon()}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

export default PatientPage
