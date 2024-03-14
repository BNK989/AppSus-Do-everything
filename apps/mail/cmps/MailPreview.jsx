const { useState, useEffect, Fragment } = React;

export function MailPreview({ email }) {
  const [isLoading, setIsLoading] = useState(true);
  const [convertedEmail, setIEmail] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  
  // const isSelected = selectedIds.includes(email.id);

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

  function handleCheckboxChange(event) {
    setIsChecked(!isChecked);
    if (event.target.checked) {
      console.log(event.target.value); // Print the value of the input if checked
    }
  }

  // function handleCheckboxChange() {
  //   setIsChecked(!isChecked); // Toggle the checked state
  // }

  if (isLoading) return <div>Loading details..</div>;
  return (
      <div className={`mail-preview ${(email.isRead) ? '':'bold'} ${email.isChecked ? 'checked' : ''}`} >
      <input
        type="checkbox"
        name="selected-input"
        id={`selected-${email.id}`}
        value={email.id}
        onChange={handleCheckboxChange}
        checked={isChecked}
      />
        <p>{convertedEmail.from}</p>
        <p>{convertedEmail.subject}</p>
        <p>{convertedEmail.body}</p>
        <p>{convertedEmail.sentAt}</p>

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