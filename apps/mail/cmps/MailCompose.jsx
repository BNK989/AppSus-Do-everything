const { useState, useEffect } = React;
const { Link, useSearchParams } = ReactRouterDOM;
const { useParams } = ReactRouter;

export function MailCompose() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading side bar..</div>;
  return <div><button className="compose-btn"><i class="fa-solid fa-pen"></i> Compose</button></div>

  
}
