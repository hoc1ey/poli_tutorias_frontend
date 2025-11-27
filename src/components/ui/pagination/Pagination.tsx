'use client';
import Link from 'next/link';
import React from 'react'
import { generatePaginationNumbers } from '../../../utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { inter } from '../../../config/fonts';

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get('page') || 1;
  let currentPage = isNaN(+pageString) ? 1 : +pageString;
  if (currentPage < 1) currentPage = 1;

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {

    const params = new URLSearchParams(searchParams);

    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`
    }

    if (+pageNumber <= 0) {
      return `${pathname}`
    }

    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`
    }

    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`

  }

  return (
    <div>
      <div className="flex text-center justify-center mb-[30px]">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">

            <li className={
              clsx("w-[45.52] h-[45.52] rounded-[21px] flex items-center justify-center mr-[19px]",
                {
                  "bg-(--dark-blue)": currentPage !== 1
                },
              )}
            >
              <Link
                className={clsx("block",
                  {
                    "pointer-events-none": currentPage === 1
                  }
                )}
                href={createPageUrl(currentPage - 1)}>
                <IoChevronBackOutline size={30} className={
                  clsx(
                    {
                      "text-(--grey)": currentPage === 1
                    },
                    {
                      "text-white": currentPage !== 1
                    }
                  )} />
              </Link>
            </li>

            {
              allPages.map((page, index) => (
                <li key={`${page}${index}`} className="page-item mr-[19px]">
                  <a
                    className={
                      clsx(
                        `${inter.className} text-[16px] font-bold relative transition-all w-[45.52] h-[45.52] rounded-[21px] flex items-center justify-center`,
                        {
                          'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] text-black hover:bg-(--grey)': page === currentPage,
                        },
                        {
                          'text-(--grey) hover:bg-gray-200 focus:shadow-none': page !== currentPage
                        }
                      )
                    }
                    href={createPageUrl(page)}>
                    {page}
                  </a>
                </li>
              ))
            }

            <li className={
              clsx("w-[45.52] h-[45.52] rounded-[21px] flex items-center justify-center",
                {
                  "bg-(--dark-blue)": currentPage !== totalPages
                },
              )}
            >
              <Link
                className={clsx("block",
                  {
                    "pointer-events-none": currentPage === totalPages
                  }
                )}
                href={createPageUrl(currentPage + 1)}>
                <IoChevronForwardOutline size={30} className={
                  clsx(
                    {
                      "text-(--grey)": currentPage === totalPages
                    },
                    {
                      "text-white": currentPage !== totalPages
                    }
                  )} />
              </Link>
            </li>

          </ul>
        </nav>
      </div>
    </div>
  )
}
