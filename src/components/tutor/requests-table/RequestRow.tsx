import React from 'react'
import './RequestsTable.css'
import { TutorRequest } from '@/interfaces'
import clsx from 'clsx'
import { formatDateTime, formatRequestDate } from '../../../utils'
import { RequestDetailsButton } from './RequestDetailsButton'

interface Props {
  request: TutorRequest
}

export const RequestRow = ({ request }: Props) => {

  const formattedStatus = request.status === 'expired'
    ? 'Expirada'
    : request.status === 'conflict'
      ? 'Conflicto'
      : 'Pendiente'

  return (
    <tr className="body-row">
      <td
        className={clsx("td-student", {
          "conflict-row": request.status === 'conflict'
        })}
      >
        <div className="flex">
          <div className="flex justify-center items-center mx-[9px]">
            <div
              style={{ backgroundColor: request.isReviewed ? "transparent" : "#2563EB" }}
              className={clsx("w-[6px] h-[6px] rounded-full",
                {
                  "bg-(--blue-point)": !request.isReviewed,
                  "bg-transparent": request.isReviewed,
                })}
            ></div>
          </div>
          <div
            className={clsx("truncate",
              {
                "expired-font": request.status === 'expired',
                "conflict-font": request.status === 'conflict',
                "no-reviewed-font": !request.isReviewed && request.status !== 'conflict' && request.status !== 'expired',
              })}
          >
            {
              request.student.studentName
            }
          </div>
        </div>
      </td>
      <td
        className={clsx("td-subject truncate",
          {
            "expired-font": request.status === 'expired',
            "no-reviewed-font": !request.isReviewed && request.status !== 'expired',
          })}
      >
        {
          request.subjectName
        }
      </td>
      <td
        className={clsx("td-request-date",
          {
            "expired-font": request.status === 'expired',
            "no-reviewed-font": !request.isReviewed && request.status !== 'expired',
          })}
      >
        <div className="truncate min-w-0">
          {formatDateTime(new Date(request.createdAt))}
        </div>
      </td>
      <td
        className={clsx("td-proposed-date",
          {
            "conflict-font": request.status === 'conflict',
            "expired-font": request.status === 'expired',
            "no-reviewed-font": !request.isReviewed && request.status !== 'conflict' && request.status !== 'expired',
          })}
      >
        <div className="truncate">
          {formatRequestDate(request.date.toString(), request.hours, true)}
        </div>
      </td>
      <td className="td-status font-semibold">

        <div className="flex gap-[48px]">
          <div
            className={clsx("w-[86px] px-[10px] py-[3px] rounded-[10px] text-center",
              {
                "pending-tag": request.status === 'pending',
                "conflict-tag": request.status === 'conflict',
                "expired-tag": request.status === 'expired'
              })}
          >
            {formattedStatus}
          </div>
          <RequestDetailsButton request={request} />
        </div>
      </td>
    </tr>
  )
}
