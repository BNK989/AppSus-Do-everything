const { useState, useEffect } = React;
const { Link, useSearchParams } = ReactRouterDOM;
const { useParams } = ReactRouter;

export function MailCompose() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    setIsLoading(false);
  }, []);
  function newMail(){
    console.log('new mail');
  }
  if (isLoading) return <div>Loading side bar..</div>;
  return <div><button onClick={newMail} className="compose-btn"><i className="fa-solid fa-pen"></i> Compose</button></div>

  
}
