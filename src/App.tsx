import { useState } from 'react'
import './App.css'

interface ContributionMethod {
  type: string
  details: string
  icon: string
}

interface RegistryFund {
  id: string
  title: string
  description: string
  contributionMethods: ContributionMethod[]
}

const registryFunds: RegistryFund[] = [
  {
    id: '1',
    title: 'Honeymoon Fund',
    description: 'Help us create unforgettable memories on our dream honeymoon',
    contributionMethods: [
      { type: 'PayPal', details: 'paypal.me/yourname', icon: '💳' },
      { type: 'Revolut', details: '@yourname', icon: '💰' },
      { type: 'Bank Transfer', details: 'IBAN: GB00 0000 0000 0000 0000', icon: '🏦' }
    ]
  },
  {
    id: '2',
    title: 'Home Renovation Fund',
    description: 'Help us make our house a home with your generous contribution',
    contributionMethods: [
      { type: 'PayPal', details: 'paypal.me/yourname', icon: '💳' },
      { type: 'Revolut', details: '@yourname', icon: '💰' },
      { type: 'Bank Transfer', details: 'IBAN: GB00 0000 0000 0000 0000', icon: '🏦' }
    ]
  },
  {
    id: '3',
    title: 'General Gift Fund',
    description: 'Your contribution will help us start our new life together',
    contributionMethods: [
      { type: 'PayPal', details: 'paypal.me/yourname', icon: '💳' },
      { type: 'Revolut', details: '@yourname', icon: '💰' },
      { type: 'Bank Transfer', details: 'IBAN: GB00 0000 0000 0000 0000', icon: '🏦' }
    ]
  }
]

function App() {
  const [selectedFund, setSelectedFund] = useState<string | null>(null)
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(null), 2000)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="title">Our Wedding Registry</h1>
          <p className="subtitle">Your presence is the greatest gift, but if you wish to contribute, we'd be grateful</p>
        </div>
      </header>

      <main className="main">
        <div className="funds-grid">
          {registryFunds.map((fund) => (
            <div key={fund.id} className="fund-card">
              <div className="fund-header">
                <h2 className="fund-title">{fund.title}</h2>
                <p className="fund-description">{fund.description}</p>
              </div>

              <button 
                className="contribute-button"
                onClick={() => setSelectedFund(selectedFund === fund.id ? null : fund.id)}
              >
                {selectedFund === fund.id ? 'Hide Contribution Options' : 'View Contribution Options'}
              </button>

              {selectedFund === fund.id && (
                <div className="payment-methods">
                  <h3 className="payment-title">Choose how you'd like to contribute:</h3>
                  {fund.contributionMethods.map((method, index) => (
                    <div key={index} className="payment-method">
                      <div className="payment-info">
                        <span className="payment-icon">{method.icon}</span>
                        <div className="payment-details">
                          <strong>{method.type}</strong>
                          <span className="payment-value">{method.details}</span>
                        </div>
                      </div>
                      <button 
                        className="copy-button"
                        onClick={() => handleCopy(method.details)}
                      >
                        {copiedText === method.details ? '✓ Copied!' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>Thank you for celebrating with us! ❤️</p>
      </footer>
    </div>
  )
}

export default App
