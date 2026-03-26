function formatFundValue(value) {
  const raw = (value || "—").toString();
  const digitsOnly = raw.replace(/[^\d.]/g, "");
  return digitsOnly || raw || "—";
}

export function FundModal({ show, t, loading, error, value, onClose }) {
  if (!show) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-box">
        <div className="modal-header">
          <span className="modal-title">🙏 {t.viewDonorList}</span>
          <button type="button" className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body fund-modal-body">
          {loading && <div className="modal-loading">⏳ {t.loadingDonors}</div>}
          {error && <div className="modal-error">⚠️ {error}</div>}
          {!loading && !error && (
            <div className="fund-modal-amount">₹{formatFundValue(value)}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DonorModal({
  show,
  t,
  donorRows,
  loading,
  error,
  sheetId,
  onClose,
}) {
  if (!show) return null;

  const deposited = donorRows.filter((row) => row.isPaid);
  const pending = donorRows.filter((row) => !row.isPaid);

  return (
    <div
      className="modal-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-box">
        <div className="modal-header">
          <span className="modal-title">🙏 {t.donorsTitle}</span>
          <button type="button" className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {loading && <div className="modal-loading">⏳ {t.loadingDonors}</div>}

          {error && (
            <div className="modal-error">
              ⚠️ {error}
              <br />
              <br />
              <a
                href={`https://docs.google.com/spreadsheets/d/${sheetId}/edit?usp=sharing`}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link"
              >
                {t.viewSheet}
              </a>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="modal-section-title modal-section-title-deposited">
                <span className="dot modal-dot-deposited" />
                ✅ {t.depositedLabel} ({deposited.length})
              </div>

              {deposited.length === 0 ? (
                <p className="modal-empty">{t.noDonors}</p>
              ) : (
                <table className="donor-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>{t.amountLabel}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deposited.map((donor, index) => (
                      <tr key={`${donor.name}-${index}`}>
                        <td className="donor-index-cell">{index + 1}</td>
                        <td>{donor.name}</td>
                        <td className="amount-cell">
                          {donor.amount ? `₹${donor.amount}` : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {pending.length > 0 && (
                <>
                  <div className="modal-section-title modal-section-title-pending">
                    <span className="dot modal-dot-pending" />
                    ⏳ {t.pendingLabel} ({pending.length})
                  </div>

                  <table className="donor-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>{t.amountLabel}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pending.map((donor, index) => (
                        <tr key={`${donor.name}-${index}`}>
                          <td className="donor-index-cell">{index + 1}</td>
                          <td>{donor.name}</td>
                          <td className="amount-cell">
                            {donor.amount ? `₹${donor.amount}` : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
