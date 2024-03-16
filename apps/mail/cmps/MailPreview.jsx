const { useState, useEffect, Fragment } = React;
const { Link } = ReactRouterDOM;

export function MailPreview({ email,removeToTrash,setEmailDetail }) {
  const [isLoading, setIsLoading] = useState(true);
  const [convertedEmail, setIEmail] = useState(null);
  const [isChecked, setIsChecked] = useState(email.isChecked);

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

    // console.log(email.isChecked);
    // if (event.target.checked) {
      // console.log(event.target.value);
    // }
  }

  if (isLoading) return <div>Loading details..</div>;
  return (
    <Fragment>
      <div
        className={`mail-preview ${email.isRead ? "" : "bold"} 
        ${isChecked? " selected-email" : ""}`}>
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
        {/* <Link to={`/mail/${email.folder}/${email.id}`}> */}
        <section className="email-preview-body" onClick={()=>setEmailDetail(email)}>
          <p>{convertedEmail.from}</p>
          <p>{convertedEmail.subject}</p>
          <p>{convertedEmail.body}</p>
          <p>{convertedEmail.sentAt}</p>
        </section>
        {/* </Link> */}
        <section className="action-btn">
          <i className="fa-solid fa-trash" onClick={()=>removeToTrash(email.id,'trash')}></i>
          <i className="fa-solid fa-box-archive"></i>
          <i className="fa-regular fa-paper-plane"></i>
        </section>
      </div>
    </Fragment>
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
