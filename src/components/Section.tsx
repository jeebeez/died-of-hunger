import { useEffect } from "react"
import { SectionProps } from "@app/interfaces/types"
import { useInView } from "react-intersection-observer"
import cn from "classnames"
import Card from "./Card"

function Section({ singleSection, setter, refs }: SectionProps) {
  const [sectionRef, sectionInView, entry] = useInView({
    threshold: 0.1,
  })
  useEffect(() => {
    if (sectionInView && refs) {
      setter(entry?.target.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionInView])

  const sortedData = singleSection.items.sort((a, b) => a.displayOrder - b.displayOrder)

  const { label, disabledReason, description, disabled } = singleSection

  return (
    <div className='bg-white'>
      <div
        className='max-w-2xl mx-auto py-16 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8'
        id={singleSection.label}
        ref={sectionRef}
      >
        <h2 className='sr-only'>Products, {label}</h2>
        <h2
          className='text-4xl font-bold text-gray-700 sm:flex sm:flex-col py-5 lg:flex-row lg:justify-between'
          ref={refs ? refs[singleSection.label] : undefined}
        >
          {label}
          {disabled && (
            <span className='flex text-lg space-x-2 py-4 lg:py-0 items-center text-red-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-exclamation-circle'
                viewBox='0 0 16 16'
              >
                <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                <path d='M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z' />
              </svg>
              <span>{disabledReason}</span>
            </span>
          )}
        </h2>
        <h2 className='text-lg font-medium text-gray-500 py-4'>{description}</h2>
        <div
          className={cn(
            "grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 relative",
            {
              "text-light-grey border-oxford-alt opacity-700 cursor-not-allowed ": disabled,
            }
          )}
        >
          {sortedData.map((sectionData) => (
            <Card key={sectionData.id} sectionData={sectionData} disabled={disabled} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Section
