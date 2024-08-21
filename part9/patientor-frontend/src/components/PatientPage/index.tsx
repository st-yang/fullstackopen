import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import patientService from '../../services/patients'
import { Diagnosis, Gender, Patient } from '../../types'
import { Female, Male, Transgender } from '@mui/icons-material'

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

  return (
    <div>
      <h2>
        {patient.name} {genderIcon()}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          {entry.date} <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {diagnoses.find((d) => d.code === code)?.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default PatientPage
