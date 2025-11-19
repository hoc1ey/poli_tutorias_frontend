import React from 'react'
import { StudentActiveRequestGridItem } from '@/components'
import { StudentRequest } from '@/interfaces';

interface Props {
  type: 'my-requests';
  requests: StudentRequest[];
}

export const RequestGrid = ({ type, requests }: Props) => {

  return (
    <div className="flex flex-col gap-[35px] my-[30px]">

      {
        type === 'my-requests' && (
          requests.map(request => (
            <StudentActiveRequestGridItem key={request.requestId} request={request} />
          ))
        )
      }

    </div>
  )
}
