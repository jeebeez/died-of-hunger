import { useRef } from "react"
import ReactDom from "react-dom"
import { ModalProps } from "@app/interfaces/types"
import cn from "classnames"

function Modal({
  setShowModal,
  label,
  purifiedDescription,
  unitPriceFractional,
  currency,
  imageUrl,
  quantity,
  addToCart,
}: ModalProps) {
  const modalRoot = document.getElementById("portal") as HTMLElement

  // close the modal when clicking outside the modal.
  const modalRef = useRef<HTMLDivElement>(null)

  // @ts-ignore-next-line
  const closeModal = (event) => {
    if ((event.button === 0 || event.code === "Enter") && event.target === modalRef.current) {
      setShowModal(false)
    }
  }

  // render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div
      ref={modalRef}
      onClick={closeModal}
      onKeyDown={closeModal}
      tabIndex={0}
      role='button'
      className='fixed top-0 left-0 right-0 z-50 flex w-full overflow-x-hidden bg-opacity-70 bg-slate-900 overflow-y-auto h-full justify-center items-center'
    >
      <div className='rounded-lg w-10/12 p-4 sm:w-full relative flex items-center bg-white overflow-hidden shadow-2xl md:p-6 lg:p-8 md:inline-block md:max-w-2xl md:px-4 lg:max-w-4xl'>
        <button
          type='button'
          className='absolute z-10 top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8'
          onClick={() => setShowModal(false)}
        >
          <span className='sr-only'>Close</span>X
        </button>

        <div className='w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8'>
          <div className='sm:col-span-4 lg:col-span-5'>
            <div className='aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden'>
              <img src={imageUrl} alt={label} className='object-center object-cover' />
            </div>
          </div>
          <div className='flex flex-col justify-between sm:col-span-8 lg:col-span-7 h-full'>
            <section aria-labelledby='information-heading' className=''>
              <h3 className='sr-only'>Product information</h3>
              <h2 className='text-2xl font-extrabold text-gray-900 sm:pr-12'>{label}</h2>
              <div className='flex items-center justify-between p-2 select-none my-3'>
                <p className='text-base font-medium text-gray-900'>
                  ${currency} : {unitPriceFractional}
                </p>
                <p className='text-base font-medium text-gray-900'>Quantity : {quantity}</p>
              </div>
              <div className='mt-6'>
                <h4 className='sr-only'>Description</h4>
                <p className='text-sm text-gray-700 '>{purifiedDescription}</p>
              </div>
            </section>
            <button
              onClick={(e) => {
                addToCart(e)
                setShowModal(false)
              }}
              className={cn(
                "w-full h-15 text-white justify-end bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5   text-center mt-4",
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
    </div>,
    modalRoot
  )
}

export default Modal
