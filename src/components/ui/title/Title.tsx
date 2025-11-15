interface Props {
  title: string;
  description: string;
}

export const Title = ({ title, description }: Props) => {
  return (
    <div>
      <div className='flex flex-col md:flex-row items-center'>
        <div className='w-full md:w-3/4'>
          <h1 className="section-title">{title}</h1>
        </div>

      </div>

      <hr className='mb-[4px] text-(--grey)' />

      <p
        className="section-description"
      >{description}</p>

    </div>
  )
}
