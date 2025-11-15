import { SearchBar } from '@/components'

interface Props {
  title: string;
  description: string;
  searchBarPlaceholder: string;
}

export const SearchHero = ({ title, description, searchBarPlaceholder }: Props) => {
  return (
    <div
      className="mt-[22px] flex flex-col gap-[30px] px-[26px] py-[23px] border-[0.5px] border-(--grey) rounded-[10px] mx-[30px] shadow-[0px_1px_2px_rgba(0,0,0,0.25)]"
    >
      <h1 className="font-montserrat text-[40px] font-bold text-center text-(--dark-blue)">
        {title}
      </h1>
      <p className="font-inter font-normal text-[16px] text-(--dark-blue) text-center">
        {description}
      </p>
      <SearchBar placeholder={searchBarPlaceholder} />
    </div>
  )
}
