import { GlobeIcon, TempleBadgeIcon } from "./Icons";

export default function Navigation({
  scrollY,
  t,
  lang,
  langNames,
  showLangMenu,
  onToggleLangMenu,
  onSelectLanguage,
  onDonateClick,
}) {
  return (
    <nav className={`nav ${scrollY > 50 ? "nav-scrolled" : ""}`}>
      <div className="nav-brand">
        <span className="nav-brand-icon">
          <TempleBadgeIcon size={28} />
        </span>
        <span>{t.nav}</span>
      </div>

      <div className="nav-right">
        <div className="lang-selector">
          <button type="button" className="lang-btn" onClick={onToggleLangMenu}>
            <span className="lang-icon">
              <GlobeIcon size={16} />
            </span>
            {langNames[lang]}
          </button>

          {showLangMenu && (
            <div className="lang-dropdown">
              {Object.entries(langNames).map(([code, name]) => (
                <button
                  key={code}
                  type="button"
                  className={`lang-option ${lang === code ? "active" : ""}`}
                  onClick={() => onSelectLanguage(code)}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button type="button" className="donate-nav-btn" onClick={onDonateClick}>
          {t.donateNow}
        </button>
      </div>
    </nav>
  );
}
