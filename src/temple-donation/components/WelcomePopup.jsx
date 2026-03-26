export default function WelcomePopup({ show, t, onClose }) {
  if (!show) return null;

  return (
    <div className="welcome-overlay" onClick={onClose}>
      <div className="welcome-popup" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="welcome-popup-close"
          onClick={onClose}
          aria-label={t.closeModal || "Close"}
        >
          ×
        </button>
        <span className="welcome-popup-diya">🪔</span>
        <span className="welcome-popup-om">ॐ</span>
        <div className="welcome-popup-title">
          {t.popupTitle.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              {index === 0 && <br />}
            </span>
          ))}
        </div>
        <div className="welcome-popup-divider" />
        <p className="welcome-popup-message">{t.popupLine1}</p>
        <p className="welcome-popup-message">{t.popupLine2}</p>
        <div className="welcome-popup-date">{t.popupDate}</div>
        <p className="welcome-popup-message">{t.popupLine3}</p>
        <p className="welcome-popup-footer">
          {t.popupQuote}
          <br />
          <span className="welcome-popup-quote-en">{t.popupQuoteEn}</span>
        </p>
        <button type="button" className="welcome-popup-btn" onClick={onClose}>
          {t.popupBtn}
        </button>
      </div>
    </div>
  );
}
