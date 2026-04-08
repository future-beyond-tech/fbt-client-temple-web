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
        <div className="welcome-popup-events">
          <div className="welcome-popup-event">
            <span className="welcome-popup-event-date">{t.popupEvent1Date}</span>
            {t.popupEvent1Text}
          </div>
          <div className="welcome-popup-event">
            <span className="welcome-popup-event-date">{t.popupEvent2Date}</span>
            {t.popupEvent2Text}
          </div>
        </div>
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
