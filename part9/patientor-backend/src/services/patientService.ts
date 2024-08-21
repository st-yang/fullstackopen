import { v1 as uuid } from 'uuid'

import patients from '../../data/patients'
import { NewEntry, NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types'

const getEntries = (): PatientEntry[] => {
  return patients
}

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  }

  patients.push(newPatientEntry)
  return newPatientEntry
}

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find((d) => d.id === id)
  return entry
}

const addEntry = (id: string, entry: NewEntry): PatientEntry | undefined => {
  const patient = findById(id)
  if (patient) {
    patient.entries.push({
      id: uuid(),
      ...entry,
    })
    return patient
  }
  return undefined
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry,
}
