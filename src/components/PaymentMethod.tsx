import { useState } from 'react'
import { StripeButton } from './StripeButton'

interface BasePaymentMethod {
  type: 'stripe' | 'bank_transfer' | 'etransfer'
  label: string
  icon: string
}

interface StripePaymentMethod extends BasePaymentMethod {
  type: 'stripe'
  buyButtonId: string
  publishableKey: string
}

interface BankTransferMethod extends BasePaymentMethod {
  type: 'bank_transfer'
  details: {
    accountHolder: string
    iban: string
    bic?: string
    bankName?: string
  }
  instructions?: string
}

interface ETransferMethod extends BasePaymentMethod {
  type: 'etransfer'
  email: string
  instructions?: string
}

export type PaymentMethodType = StripePaymentMethod | BankTransferMethod | ETransferMethod

interface PaymentMethodProps {
  method: PaymentMethodType
  isOpen: boolean
  onToggle: () => void
}

export function PaymentMethod({ method, isOpen, onToggle }: PaymentMethodProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = async (text: string, fieldName: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedField(fieldName)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="payment-method">
      <button className="payment-header-button" onClick={onToggle}>
        <div className="payment-header">
          <span className="payment-icon">{method.icon}</span>
          <strong className="payment-type">{method.label}</strong>
        </div>
        <span className="payment-toggle-icon">{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && method.type === 'stripe' && (
        <div className="payment-content">
          <StripeButton
            buyButtonId={method.buyButtonId}
            publishableKey={method.publishableKey}
          />
        </div>
      )}

      {isOpen && method.type === 'bank_transfer' && (
        <div className="payment-content">
          <div className="payment-details">
            <div className="payment-detail-row">
              <span className="payment-label">Account Holder:</span>
              <span className="payment-value">{method.details.accountHolder}</span>
            </div>
            <div className="payment-detail-row">
              <span className="payment-label">IBAN:</span>
              <div className="inline-copyable">
                <code className="copyable-code">{method.details.iban}</code>
                <button 
                  className="copy-btn-inline" 
                  onClick={() => handleCopy(method.details.iban, 'iban')}
                  title="Copy IBAN"
                >
                  {copiedField === 'iban' ? (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path>
                      <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {method.details.bic && (
              <div className="payment-detail-row">
                <span className="payment-label">BIC/SWIFT:</span>
                <span className="payment-value">{method.details.bic}</span>
              </div>
            )}
            {method.details.bankName && (
              <div className="payment-detail-row">
                <span className="payment-label">Bank:</span>
                <span className="payment-value">{method.details.bankName}</span>
              </div>
            )}
            {method.instructions && (
              <div className="payment-instructions">
                <p>{method.instructions}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {isOpen && method.type === 'etransfer' && (
        <div className="payment-content">
          <div className="payment-details">
            <div className="payment-detail-row">
              <span className="payment-label">Send to:</span>
              <div className="inline-copyable">
                <code className="copyable-code">{method.email}</code>
                <button 
                  className="copy-btn-inline" 
                  onClick={() => handleCopy(method.email, 'email')}
                  title="Copy email"
                >
                  {copiedField === 'email' ? (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path>
                      <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {method.instructions && (
              <div className="payment-instructions">
                <p>{method.instructions}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

