import './App.css'
import { Card } from './components/Card'
import type { PaymentMethodType } from './components/PaymentMethod'

interface RegistryFund {
  id: string
  title: string
  description: string
  paymentMethods: PaymentMethodType[]
}

interface RegistrySection {
  id: string
  title: string
  emoji: string
  funds: RegistryFund[]
}

// Your Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51J1dU8BtPUUH2x9s4lQnU7gPKgHHTdl8fqR84dQatrIqgjtzf3mYCTDrumu0uj5F4eXgFUhmjA8ur9oDwTNFFvYE0032NGALVh'

const registrySections: RegistrySection[] = [
  {
    id: 'our-life',
    title: 'Our Life Together',
    emoji: '💑',
    funds: [
  {
    id: '1',
    title: 'Honeymoon Fund',
    description: 'Help us create unforgettable memories on our dream honeymoon',
    paymentMethods: [
      {
        type: 'stripe',
        label: 'Credit/Debit Card',
        icon: '💳',
        buyButtonId: 'buy_btn_1SJxd8BtPUUH2x9shNCUtARj', // Replace with your actual button ID
        publishableKey: STRIPE_PUBLISHABLE_KEY
      },
      {
        type: 'bank_transfer',
        label: 'Bank Transfer (EUR)',
        icon: '🏦',
        details: {
          accountHolder: 'Massimo Zambelli',
          iban: 'DE89 3704 0044 0532 0130 00', // Replace with your actual IBAN
          bic: 'COBADEFFXXX', // Replace with your actual BIC
          bankName: 'Banca Popolare di Sondrio'
        },
        instructions: 'Please include your name and "Honeymoon Fund" in the message so we can thank you!'
      },
      {
        type: 'etransfer',
        label: 'Interac e-Transfer (CAD)',
        icon: '🍁',
        email: 'bailey.greenspon@gmail.com',
        instructions: 'Please include your name and "Honeymoon Fund" in the message so we can thank you!'
      }
    ]
  },
      {
        id: '2',
        title: 'Home Renovation Fund',
        description: 'Help us make our house a home with your generous contribution',
        paymentMethods: [
          {
            type: 'stripe',
            label: 'Credit/Debit Card',
            icon: '💳',
            buyButtonId: 'buy_btn_1SJxd8BtPUUH2x9shNCUtARj', // Replace with your actual button ID
            publishableKey: STRIPE_PUBLISHABLE_KEY
          },
          {
            type: 'bank_transfer',
            label: 'EUR Bank Transfer',
            icon: '🏦',
            details: {
              accountHolder: 'Bailey & Max',
              iban: 'DE89 3704 0044 0532 0130 00',
              bic: 'COBADEFFXXX',
              bankName: 'Commerzbank'
            },
            instructions: 'Please include your name in the message so we can thank you!'
          },
          {
            type: 'etransfer',
            label: 'Interac e-Transfer (CAD)',
            icon: '🍁',
            email: 'your.email@example.com',
            instructions: 'Please include your name in the message so we can thank you!'
          }
        ]
      }
    ]
  },
  {
    id: 'charity',
    title: 'Charity',
    emoji: '💝',
    funds: [
  {
    id: '3',
    title: 'General Gift Fund',
    description: 'Your contribution will help us start our new life together',
    paymentMethods: [
      {
        type: 'stripe',
        label: 'Credit/Debit Card',
        icon: '💳',
        buyButtonId: 'buy_btn_1SJxd8BtPUUH2x9shNCUtARj', // Replace with your actual button ID
        publishableKey: STRIPE_PUBLISHABLE_KEY
      },
      {
        type: 'bank_transfer',
        label: 'EUR Bank Transfer',
        icon: '🏦',
        details: {
          accountHolder: 'Bailey & Max',
          iban: 'DE89 3704 0044 0532 0130 00',
          bic: 'COBADEFFXXX',
          bankName: 'Commerzbank'
        },
        instructions: 'Please include your name in the message so we can thank you!'
      },
      {
        type: 'etransfer',
        label: 'Interac e-Transfer (CAD)',
        icon: '🍁',
        email: 'your.email@example.com',
        instructions: 'Please include your name in the message so we can thank you!'
      }
    ]
  }
    ]
  }
]

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="title">Bailey and Max's Wedding Registry</h1>
          <p className="subtitle">Your presence is the greatest gift, but if you wish to contribute, we'd be grateful</p>
        </div>
      </header>

      <main className="main">
        {registrySections.map((section) => (
          <section key={section.id} className="registry-section">
            <h2 className="section-title">
              <span className="section-emoji">{section.emoji}</span>
              {section.title}
            </h2>
            <div className="funds-grid">
              {section.funds.map((fund) => (
                <Card key={fund.id} fund={fund} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="footer">
        <p>Thank you for celebrating with us! ❤️</p>
      </footer>
    </div>
  )
}

export default App
