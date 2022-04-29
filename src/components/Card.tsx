import parse from "html-react-parser"
import DOMPurify from "dompurify"
import cn from "classnames"
import { CardProps } from "@app/interfaces/types"
import { useState } from "react"
import Modal from "./Modal"

export const convertFromCents = (cents: number): number => +cents / 100

function Card({ sectionData, disabled }: CardProps) {
  const {
    id,
    label,
    description,
    unitPriceFractional,
    currency,
    imageUrl,
    itemStock: { quantityLeft: quantity },
  } = sectionData

  const purifiedDescription = parse(
    DOMPurify.sanitize(description || "Pretend you just read an amazing description 😁")
  )

  const [showModal, setShowModal] = useState<boolean>(false)

  // @ts-ignore-next-line
  const openModal = (event) => {
    if (event.button === 0 || event.code === "Enter") {
      setShowModal(true)
    }
  }
  const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    // who needs push-notifications if you can have alerts ,lol.
    // eslint-disable-next-line
    alert("added to cart")
  }

  return (
    <>
      <div
        onClick={openModal}
        key={id}
        className={cn(
          "group relative bg-white border rounded-lg flex flex-col overflow-hidden flex-shrink-0",
          !!quantity || disabled ? "border-gray-300" : "border-[3px]  border-red-500"
        )}
        onKeyDown={openModal}
        tabIndex={0}
        role='button'
      >
        {disabled && (
          <div className='bg-black opacity-25 w-full h-full absolute rounded-lg z-10 cursor-not-allowed' />
        )}
        <div
          className={cn("aspect-w-1	aspect-h-1 bg-gray-200 ", {
            "group-hover:opacity-75": !disabled,
          })}
        >
          <img src={imageUrl} alt={label} className='w-full h-full object-center object-cover' />
        </div>
        <div className='flex-1 p-4 space-y-2 flex flex-col select-none'>
          <h3 className='text-md py-2 font-medium text-gray-900'>{label}</h3>
          <div className='text-sm text-gray-500 line-clamp-2 '>{purifiedDescription}</div>
          <div className='flex items-center justify-between p-2'>
            <p className='text-base font-medium text-gray-900'>
              ${currency} : {convertFromCents(unitPriceFractional)}
            </p>
            <p className='text-base font-medium text-gray-900'>Quantity : {quantity}</p>
          </div>
          <div className='flex-1 flex flex-col justify-end py-2'>
            <button
              onClick={(e) => addToCart(e)}
              className={cn(
                "block text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center ",
                {
                  "text-light-grey border-oxford-alt opacity-700 cursor-not-allowed ": !quantity,
                }
              )}
              type='button'
              disabled={!quantity}
            >
              {quantity ? "Add To Cart" : "Sold Out"}
            </button>
          </div>
        </div>
      </div>
      {!disabled && showModal ? (
        <Modal
          setShowModal={setShowModal}
          label={label}
          purifiedDescription={purifiedDescription}
          unitPriceFractional={convertFromCents(unitPriceFractional)}
          currency={currency}
          imageUrl={imageUrl}
          quantity={quantity}
          addToCart={addToCart}
        />
      ) : null}
    </>
  )
}

export default Card
