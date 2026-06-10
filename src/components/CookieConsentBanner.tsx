import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CookieConsentBanner.css'

const CONSENT_STORAGE_KEY = 'cookie-consent'

export type CookieConsentChoice = 'accepted' | 'rejected' | null

interface CookieConsentBannerProps {
  onChoice?: (choice: CookieConsentChoice) => void
}

export function CookieConsentBanner({ onChoice }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted')
    setIsVisible(false)
    onChoice?.('accepted')
  }

  const handleReject = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'rejected')
    setIsVisible(false)
    onChoice?.('rejected')
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-banner-content">
        <div className="cookie-banner-text">
          <p>
            We use cookies to enhance your experience. By continuing to visit this site,
            you agree to our use of cookies.{' '}
            <Link to="/cookie-policy" className="cookie-link">
              Learn more in our Cookie Policy
            </Link>
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button
            type="button"
            className="cookie-btn cookie-btn-reject"
            onClick={handleReject}
          >
            Reject Non-Essential
          </button>
          <button
            type="button"
            className="cookie-btn cookie-btn-accept"
            onClick={handleAccept}
          >
            Accept All Cookies
          </button>
        </div>
      </div>
    </div>
  )
}

export function getConsentChoice(): CookieConsentChoice {
  const consent = localStorage.getItem(CONSENT_STORAGE_KEY)
  if (consent === 'accepted') return 'accepted'
  if (consent === 'rejected') return 'rejected'
  return null
}
