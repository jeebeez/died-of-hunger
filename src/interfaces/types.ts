export interface Items {
  id: number
  label: string
  description: string | null
  displayOrder: number
  unitPriceFractional: number
  currency: string
  imageUrl: string
  itemStock: { quantityLeft: number }
}

export interface AllSectionProps {
  id: number
  label: string
  description: string | null
  displayOrder: number
  disabled: boolean
  disabledReason: string | null
  items: Items[]
}
export interface DataProps extends AllSectionProps {
  subSections: AllSectionProps[] | []
}

export interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  label: string
  purifiedDescription: string | React.ReactNode | React.ReactNode[]
  unitPriceFractional: number
  currency: string
  imageUrl: string
  quantity: number
  addToCart: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export interface CardProps {
  sectionData: Items
  disabled: boolean
}

export interface SectionProps {
  singleSection: AllSectionProps
  setter?: any
  refs?: any
}

export interface NavProps {
  sections: DataProps[]
  activeSection: string
  handleClick: (name: string) => void
}

export interface ApiProps {
  id: number
  startDate: string
  endDate: string
  sections: DataProps[]
}
