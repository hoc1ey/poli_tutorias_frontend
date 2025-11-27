import React from 'react'
import { RequestRow } from '@/components'
import { TutorRequest } from '@/interfaces'
import './RequestsTable.css'

interface Props {
  requests: TutorRequest[];
}

export const RequestsTable = ({ requests }: Props) => {
  return (
    <table className="table">
      <thead>
        <tr className="header-row">
          <th className="th-student">Estudiante</th>
          <th className="th-subject">Materia</th>
          <th className="th-request-date">Fecha de Solicitud</th>
          <th className="th-proposed-date">Fecha Propuesta</th>
          <th className="th-status">Estado</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <RequestRow key={request.requestId} request={request} />
        ))}
      </tbody>
    </table>
  )
}
