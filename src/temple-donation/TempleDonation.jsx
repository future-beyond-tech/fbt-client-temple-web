import { useEffect, useState } from "react";
import qrImage from "../../QR.jpeg";
import receiptImage from "../../Receipt.jpeg";
import Counter from "./components/Counter";
import DonorModal, { FundModal } from "./components/DonorModal";
import {
  ChartIcon,
  Divider,
  ScrollArrowIcon,
  TempleBadgeIcon,
  WhatsAppIcon,
} from "./components/Icons";
import Navigation from "./components/Navigation";
import WelcomePopup from "./components/WelcomePopup";
import "./temple-donation.css";
import { langNames, translations } from "./translations";
import { parseAmount, parseSheetCSV } from "./utils/sheetParser";

const SHEET_ID = "1NYPlaHIUdomegVHvgGYnESoEU0JQf7tZ2i8N2LyNetQ";
const TOTAL_FUND_SHEET = { gid: "1116878055", range: "B5" };
const TOTAL_RAISED_REFRESH_MS = 60000;
const PROGRESS_PERCENT = "42.6%";
const INITIAL_TOTAL_RAISED = 10000;
const SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit?usp=sharing`;
const WHATSAPP_URL = `https://wa.me/919911414416?text=${encodeURIComponent(
  "Jai Maa Kali! I have made a donation to Jai Maa Kali Mandir Renovation Trust. Attaching my payment screenshot."
)}`;

function createParticles() {
  return Array.from({ length: 30 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    size: `${2 + Math.random() * 3}px`,
  }));
}

export default function TempleDonation() {
  const [lang, setLang] = useState("hi");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [showDonorModal, setShowDonorModal] = useState(false);
  const [donorRows, setDonorRows] = useState([]);
  const [loadingDonors, setLoadingDonors] = useState(false);
  const [donorError, setDonorError] = useState("");
  const [showFundModal, setShowFundModal] = useState(false);
  const [totalFundReceived, setTotalFundReceived] = useState("");
  const [loadingFund, setLoadingFund] = useState(false);
  const [fundError, setFundError] = useState("");
  const [totalRaisedValue, setTotalRaisedValue] = useState(INITIAL_TOTAL_RAISED);
  const [particles] = useState(createParticles);

  const t = translations[lang] ?? translations.hi;

  const applyTotalFundValue = (value, { syncModalValue = false } = {}) => {
    if (syncModalValue) setTotalFundReceived(value);

    const numeric = parseAmount(value);
    if (numeric && numeric > 0) setTotalRaisedValue(numeric);
  };

  const fetchCellValue = async ({ gid, range }) => {
    const baseUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}&range=${encodeURIComponent(range)}`;
    const urlsToTry = [baseUrl, `https://r.jina.ai/${baseUrl}`];
    let lastError;

    for (const url of urlsToTry) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const text = (await response.text()).trim();
        return text.replace(/"/g, "").split(/[\n,]/)[0]?.trim() || "";
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("Failed to fetch cell value");
  };

  const fetchAndShowTotalFund = async () => {
    setShowFundModal(true);
    setLoadingFund(true);
    setFundError("");

    try {
      const value = await fetchCellValue(TOTAL_FUND_SHEET);
      applyTotalFundValue(value, { syncModalValue: true });
    } catch {
      setFundError(
        t.fetchError || "Could not load data. Please open the spreadsheet directly."
      );
    } finally {
      setLoadingFund(false);
    }
  };

  const fetchAndShowDonors = async () => {
    setShowDonorModal(true);
    if (donorRows.length > 0) return;

    setLoadingDonors(true);
    setDonorError("");

    try {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const text = await response.text();
      setDonorRows(parseSheetCSV(text));
    } catch {
      setDonorError(
        t.fetchError || "Could not load data. Please open the spreadsheet directly."
      );
    } finally {
      setLoadingDonors(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const refreshTotalRaised = async () => {
      try {
        const value = await fetchCellValue(TOTAL_FUND_SHEET);
        if (cancelled) return;

        applyTotalFundValue(value, { syncModalValue: showFundModal });
      } catch {
        // Keep the initial fallback value if the sheet cannot be reached.
      }
    };

    refreshTotalRaised();
    const intervalId = window.setInterval(
      refreshTotalRaised,
      TOTAL_RAISED_REFRESH_MS
    );

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [showFundModal]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const isNearPageBottom =
    typeof window !== "undefined" &&
    scrollY + window.innerHeight >= document.body.scrollHeight - 100;

  return (
    <>
      <WelcomePopup
        show={showWelcomePopup}
        t={t}
        onClose={() => setShowWelcomePopup(false)}
      />

      <div className="mandala-bg" />

      <Navigation
        scrollY={scrollY}
        t={t}
        lang={lang}
        langNames={langNames}
        showLangMenu={showLangMenu}
        onToggleLangMenu={() => setShowLangMenu((current) => !current)}
        onSelectLanguage={(code) => {
          setLang(code);
          setShowLangMenu(false);
          setShowWelcomePopup(true);
        }}
        onDonateClick={() => scrollTo("donate")}
      />

      <section className="hero">
        <div className="hero-particles">
          {particles.map((particle, index) => (
            <div
              key={index}
              className="particle"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                width: particle.size,
                height: particle.size,
              }}
            />
          ))}
        </div>

        <div className="hero-content">
          <div className="hero-om fade-up">ॐ</div>
          <h1 className="hero-title fade-up-d1">{t.heroTitle}</h1>
          <div className="hero-highlight fade-up-d2">{t.heroHighlight}</div>

          <div className="hero-sub-wrap fade-up-d3">
            <p className="hero-sub">{t.heroSub}</p>
          </div>

          {t.reasonP1 && (
            <div className="top-notice-bar fade-up-d4">
              <div className="top-notice-label">{t.noticeLabel || "Notice"}</div>
              <div className="top-notice-text">
                <div className="top-notice-inner">
                  <span className="top-notice-item">{t.reasonP1}</span>
                  <span className="top-notice-item" aria-hidden="true">
                    {t.reasonP1}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="hero-btns fade-up-d4">
            <button type="button" className="btn-primary" onClick={() => scrollTo("donate")}>
              {t.donateNow}
            </button>
            <button type="button" className="btn-secondary" onClick={() => scrollTo("donors")}>
              {t.viewDonors}
            </button>
          </div>
        </div>
      </section>

      <div className="stats-section-bg">
        <div className="section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">
                <Counter end={totalRaisedValue} prefix="₹" />
              </div>
              <div className="stat-label">{t.totalRaised}</div>
            </div>

            <div className="stat-card">
              <div className="stat-number">
                <span className="stat-fixed-number">₹4–5 Lakh</span>
              </div>
              <div className="stat-label">{t.totalGoal}</div>
            </div>

            <div className="stat-card">
              <div className="stat-number">
                <Counter end={15} />
              </div>
              <div className="stat-label">{t.totalDonors}</div>
            </div>

            <div className="stat-card">
              <div className="stat-number">
                <Counter end={30} />
              </div>
              <div className="stat-label">{t.daysLeft}</div>
            </div>
          </div>

          <div className="progress-wrap">
            <div className="progress-header">
              <span>{t.progressLabel}</span>
              <span>{PROGRESS_PERCENT}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: PROGRESS_PERCENT }} />
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">{t.aboutTitle}</h2>
        <Divider />

        <div className="about-text">
          <p>{t.aboutP1}</p>
          <p>{t.aboutP2}</p>
          <p>{t.aboutP3}</p>
        </div>

        {t.reasonTitle && (
          <div className="reason-section">
            <h2 className="section-title reason-title">{t.reasonTitle}</h2>
            <div className="about-text reason-text">
              <p>{t.reasonP1}</p>
              <p>{t.reasonP2}</p>
            </div>
          </div>
        )}

        {t.noticeTitle && (
          <div className="notice-card">
            <div className="notice-head">
              <span className="notice-icon">!</span>
              <div className="notice-label">{t.noticeLabel || "Notice Message"}</div>
            </div>
            <div className="notice-text">
              <strong>{t.noticeTitle}</strong> {t.noticeP1} {t.noticeP2}
            </div>
          </div>
        )}

        <div className="temple-grid">
          <div className="temple-card">
            <div className="temple-img temple-img-placeholder">(Will update soon)</div>
            <div className="temple-label">
              <h3>{t.oldTemple}</h3>
              <p>{t.oldTempleDesc}</p>
            </div>
          </div>

          <div className="temple-card">
            <div className="temple-img temple-img-placeholder">(Will update soon)</div>
            <div className="temple-label">
              <h3>{t.newTemple}</h3>
              <p>{t.newTempleDesc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="diya-line">
        <div className="diya" />
        <div className="diya" />
        <div className="diya" />
        <div className="diya" />
        <div className="diya" />
      </div>

      <div className="donate-section" id="donate">
        <div className="donate-inner">
          <h2 className="section-title">{t.donateTitle}</h2>
          <p className="section-sub">{t.donateSub}</p>

          <div className="donate-grid">
            <div className="qr-card">
              <div className="qr-label">{t.scanQR}</div>
              <div className="qr-placeholder">
                <img
                  src={qrImage}
                  alt="UPI QR code for temple donation"
                  className="qr-img"
                />
              </div>
              <p className="qr-note">{t.qrNote}</p>
            </div>

            <div className="bank-card receipt-card">
              <img
                src={receiptImage}
                alt="Donation receipt example"
                className="receipt-img"
              />
            </div>
          </div>

          <div className="whatsapp-card">
            <div className="whatsapp-icon">
              <WhatsAppIcon size={30} />
            </div>
            <h3>{t.afterPayment}</h3>
            <p>{t.afterPaymentDesc}</p>
            <div className="whatsapp-place">{t.whatsappPlace}</div>
            <div className="whatsapp-name">{t.whatsappName}</div>
            <div className="whatsapp-number">{t.whatsappNumber}</div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link"
            >
              <WhatsAppIcon />
              Send via WhatsApp
            </a>

            <p className="whatsapp-note">{t.whatsappNote}</p>
          </div>
        </div>
      </div>

      <div className="diya-line">
        <div className="diya" />
        <div className="diya" />
        <div className="diya" />
        <div className="diya" />
        <div className="diya" />
      </div>

      <div className="section" id="donors">
        <h2 className="section-title">{t.donorsTitle}</h2>
        <p className="section-sub">{t.donorsSub}</p>

        <div className="donors-actions">
          <a
            href={SPREADSHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="excel-btn"
          >
            <span className="excel-icon">
              <ChartIcon size={24} />
            </span>
            {t.viewSheet}
          </a>
          <br />
          <button
            type="button"
            className="donor-list-btn"
            onClick={fetchAndShowTotalFund}
          >
            👁 {t.viewDonorList}
          </button>
          <p className="donors-note">{t.donorsNote}</p>
        </div>
      </div>

      <FundModal
        show={showFundModal}
        t={t}
        loading={loadingFund}
        error={fundError}
        value={totalFundReceived}
        onClose={() => setShowFundModal(false)}
      />

      <DonorModal
        show={showDonorModal}
        t={t}
        donorRows={donorRows}
        loading={loadingDonors}
        error={donorError}
        sheetId={SHEET_ID}
        onClose={() => setShowDonorModal(false)}
      />

      <div className="committee-section-bg">
        <div className="section">
          <h2 className="section-title committee-title">{t.committeeTitle}</h2>
          <div className="committee-grid">
            <div className="member-card member-card-compact">
              <div className="member-avatar">{t.member1?.charAt(0) || "A"}</div>
              <h3>{t.member1}</h3>
              <p>{t.member1Role}</p>
              {t.blessingLine && <p className="member-blessing">{t.blessingLine}</p>}
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-icon">
          <TempleBadgeIcon size={40} />
        </div>
        <div className="footer-brand">{t.footerText}</div>
        <div className="footer-addr">{t.footerAddress}</div>
        <Divider />
        <div className="footer-copy">{t.footerRights}</div>
      </footer>

      <button
        type="button"
        className={`scroll-down-arrow ${isNearPageBottom ? "scroll-arrow-hidden" : ""}`}
        onClick={() =>
          window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })
        }
        aria-label="Scroll down"
      >
        <ScrollArrowIcon />
      </button>
    </>
  );
}
