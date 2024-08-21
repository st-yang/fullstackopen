import { DiagnoseEntry, Gender, HealthCheckRating, NewEntry, NewPatientEntry } from './types'

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    }

    return newEntry
  }

  throw new Error('Incorrect data: some fields are missing')
}

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object) {
    switch (object.type) {
      case 'Hospital':
        if ('discharge' in object) {
          return {
            type: 'Hospital',
            description: parseString(object.description, 'description'),
            date: parseDate(object.date),
            specialist: parseString(object.specialist, 'specialist'),
            diagnosisCodes: parseDiagnosisCodes(object),
            discharge: parseDischarge(object.discharge),
          }
        }
        throw new Error('Incorrect data: some fields are missing')
      case 'OccupationalHealthcare':
        if ('employerName' in object && 'sickLeave' in object) {
          return {
            type: 'OccupationalHealthcare',
            description: parseString(object.description, 'description'),
            date: parseDate(object.date),
            specialist: parseString(object.specialist, 'specialist'),
            diagnosisCodes: parseDiagnosisCodes(object),
            employerName: parseString(object.employerName, 'employerName'),
            sickLeave: parseSickLeave(object.sickLeave),
          }
        }
        throw new Error('Incorrect data: some fields are missing')
      case 'HealthCheck':
        if ('healthCheckRating' in object) {
          return {
            type: 'HealthCheck',
            description: parseString(object.description, 'description'),
            date: parseDate(object.date),
            specialist: parseString(object.specialist, 'specialist'),
            diagnosisCodes: parseDiagnosisCodes(object),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          }
        }
        throw new Error('Incorrect data: some fields are missing')
    }
  }

  throw new Error('Incorrect data: some fields are missing')
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseString = (str: unknown, name = 'string'): string => {
  if (!isString(str)) {
    throw new Error(`Incorrect ${name}: ` + str)
  }

  return str
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date)
  }
  return date
}

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect ssn: ' + ssn)
  }

  return ssn
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender)
  }
  return gender
}

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect occupation: ' + occupation)
  }

  return occupation
}

const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnoseEntry['code']>
  }

  return object.diagnosisCodes as Array<DiagnoseEntry['code']>
}

const parseDischarge = (object: unknown): { date: string; criteria: string } => {
  if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
    throw new Error('Incorrect discharge: ' + object)
  }

  return {
    date: parseDate(object.date),
    criteria: parseString(object.criteria, 'criteria'),
  }
}

const parseSickLeave = (object: unknown): { startDate: string; endDate: string } => {
  if (!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object)) {
    throw new Error('Incorrect sickLeave: ' + object)
  }

  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  }
}

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param)
}

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number
}

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect healthCheckRating: ' + healthCheckRating)
  }
  return healthCheckRating
}
