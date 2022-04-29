import { useState, createRef, useEffect, RefObject } from "react"
import { AllSectionProps, ApiProps, DataProps } from "@app/interfaces/types"
import atlasAPI from "../api/atlasAPI"
import Section from "./Section"
import Navigation from "./Navigation"
import Loading from "./Loading"
import Error from "./Error"

function DashBoard() {
  const [first, setfirst] = useState("Burger")
  const [apidata, setApiData] = useState<DataProps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  let refs: Record<string, RefObject<HTMLHeadingElement>>

  const fetchData = async () => {
    setLoading(true)
    try {
      const { data } = await atlasAPI.get<ApiProps>("/menu")
      const sortedData = data.sections.sort((a, b) => a.displayOrder - b.displayOrder)
      setApiData(sortedData)
      setLoading(false)
    } catch (err) {
      /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.error(err)
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!loading) {
    refs = apidata.reduce(
      (item: Record<string, RefObject<HTMLHeadingElement>>, section: AllSectionProps) => {
        item[section.label] = createRef<HTMLHeadingElement>()
        return item
      },
      {}
    )
  }
  // @ts-ignore-next-line
  const handleClick = (name: string) => {
    window.scrollTo({
      behavior: "smooth",
      // fix to avoid scrolling under navbar
      top: refs[name].current!.offsetTop - 100,
    })
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }
  return (
    <div className='grid  grid-cols-1 gap-3 box-border mb-12 sm:gap-6 xl:grid-flow-col-dense xl:grid-cols-4 xl:mx-36'>
      <Navigation sections={apidata} activeSection={first} handleClick={handleClick} />

      <div className=' lg:col-start-2 lg:col-span-3'>
        {apidata.map((section) => {
          const subSection = section.subSections
          return (
            <div key={section.id}>
              <Section singleSection={section} setter={setfirst} refs={refs} />
              {!!subSection.length &&
                subSection.map((singleSubSection) => (
                  <Section key={singleSubSection.id} singleSection={singleSubSection} />
                ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DashBoard
