const { useState, useEffect } = React;
const { Link, useSearchParams } = ReactRouterDOM;
const { useParams } = ReactRouter;

export function MailSearch() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading side bar..</div>;
  return <div>
    <input className="search-input" type="text" placeholder="Search.." name="search"></input>
  </div>

  
}
