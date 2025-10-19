import { useState } from 'react'
import { PaymentMethod } from './PaymentMethod'
import type { PaymentMethodType } from './PaymentMethod'

interface RegistryFund {
  id: string
  title: string
  description: string
  paymentMethods: PaymentMethodType[]
}

interface CardProps {
  fund: RegistryFund
}

export function Card({ fund }: CardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [openMethodIndex, setOpenMethodIndex] = useState<number | null>(null)

  const handleMethodToggle = (index: number) => {
    setOpenMethodIndex(openMethodIndex === index ? null : index)
  }

  return (
    <div className="fund-card">
      <div className="fund-header">
        <h2 className="fund-title">{fund.title}</h2>
        <p className="fund-description">{fund.description}</p>
      </div>

      <button 
        className="contribute-button"
        onClick={() => {
          setIsOpen(!isOpen)
          if (!isOpen) {
            setOpenMethodIndex(null) // Reset open method when closing the whole section
          }
        }}
      >
        {isOpen ? 'Hide Options' : 'View Contribution Options'}
      </button>

      {isOpen && (
        <div className="payment-methods">
          <h3 className="payment-title">Choose how you'd like to contribute:</h3>
          {fund.paymentMethods.map((method, index) => (
            <PaymentMethod 
              key={index} 
              method={method}
              isOpen={openMethodIndex === index}
              onToggle={() => handleMethodToggle(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

