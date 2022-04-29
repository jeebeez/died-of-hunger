import cn from "classnames"
import { useWindowSize } from "@react-hook/window-size"
import { NavProps } from "@app/interfaces/types"

function Navigation({ sections, activeSection, handleClick }: NavProps) {
  const [width] = useWindowSize()

  function renderItems() {
    return sections.map((section) => (
      <li key={section.id}>
        <button
          id={section.label}
          onClick={() => handleClick(section.label)}
          className={cn(
            "border-l-2 p-4 cursor-pointer text-xs md:text-basic lg:text-lg ",
            activeSection === section.label
              ? "border-green-500 bg-slate-200 italic font-medium"
              : "border-gray-500"
          )}
          type='button'
        >
          {section.label}
        </button>
      </li>
    ))
  }
  return (
    <ul
      className={cn(
        "flex fixed navigation",
        width <= 1280
          ? "overflow-x-scroll no-scrollbar justify-center  items-center block bg-gray-500 bottom-0 z-20  w-screen mx-auto xl:hidden"
          : "hidden pt-6 xl:block"
      )}
    >
      {renderItems()}
    </ul>
  )
}

export default Navigation
