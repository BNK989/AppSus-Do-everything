const { useState, useEffect, Fragment } = React;

export function MailPreview({ email }) {
  const [isLoading, setIsLoading] = useState(true);
  const [convertedEmail, setIEmail] = useState(null);
  //   const [subject] = email

  useEffect(() => {
    prepareEmailToShow()
    setIsLoading(false);
    //   console.log(email);
  }, []);


  function prepareEmailToShow(){
    console.log(email.body.substring(0,15)+'...');
    setIEmail({
      from:email.from.split('@')[0],
      subject : email.subject,
      body:email.body.substring(0,15)+'...',
      sentAt:email.sentAt
    })
    console.log(convertedEmail);
  }

  if (isLoading) return <div>Loading details..</div>;
  return (
      <div className={`mail-preview ${(email.isRead) ? '':'bold'}`} >
        <p className="bold">{convertedEmail.from}</p>
        <p>{convertedEmail.subject}</p>
        <p>{email.body}</p>
        <p>{email.sentAt}</p>

      </div>
  )
}
// id: 'e101',
// subject: 'Miss you!',
// body: 'Would love to catch up sometimes',
// isRead: false,
// sentAt : 1551133930594,
// removedAt : null,
// from: 'momo@momo.com',
// to: 'user@appsus.com'