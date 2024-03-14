const { useState, useEffect, Fragment } = React;
const { Link } = ReactRouterDOM

export function MailPreview({ email }) {
  const [isLoading, setIsLoading] = useState(true);
  const [convertedEmail, setIEmail] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  // const isSelected = selectedIds.includes(email.id);

  useEffect(() => {
    prepareEmailToShow();
    setIsLoading(false);
    //   console.log(email);
  }, []);

  function prepareEmailToShow() {
    setIEmail({
      from: email.from.split("@")[0],
      subject: email.subject,
      body: email.body.substring(0, 15) + "...",
      sentAt: email.sentAt,
    });
  }

  function handleCheckboxChange(event) {
    setIsChecked(!isChecked);
    if (event.target.checked) {
      console.log(event.target.value);
    }
  }

  if (isLoading) return <div>Loading details..</div>;
  return (
    <Link to={`/mail/inbox/full-screen/${email.id}`}>
      <div
        className={`mail-preview ${email.isRead ? "" : "bold"} ${
          email.isChecked ? "checked" : ""
        }`}
      >
        <section className="tags">
          <input
            type="checkbox"
            name="selected-input"
            id={`selected-${email.id}`}
            value={email.id}
            onChange={handleCheckboxChange}
            checked={isChecked}
          />
          <input className="star" type="checkbox" title="bookmark"></input>
        </section>
        <p>{convertedEmail.from}</p>
        <p>{convertedEmail.subject}</p>
        <p>{convertedEmail.body}</p>
        <p>{convertedEmail.sentAt}</p>
        <section className="action-btn">
          <i className="fa-solid fa-trash"></i>
          <i className="fa-solid fa-box-archive"></i>
          <i className="fa-regular fa-paper-plane"></i>
        </section>
      </div>
    </Link>
  );
}
// id: 'e101',
// subject: 'Miss you!',
// body: 'Would love to catch up sometimes',
// isRead: false,
// sentAt : 1551133930594,
// removedAt : null,
// from: 'momo@momo.com',
// to: 'user@appsus.com'
