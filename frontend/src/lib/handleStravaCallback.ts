
export const handleStravaCallback = async(code: string, setUser:React.Dispatch<React.SetStateAction<null>>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      const res = await fetch('http://localhost:8080/api/strava/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({code}),
      });
      
      if(!res.ok) {
        throw new Error('Failed to exchange token');
      }

      const data = await res.json();      
      setUser(data.user);
      console.log('Updated User in callback:', data.user);

      // window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      console.error('Error in Strava callback:', error);
    } finally {
      setIsLoading(false);
    }
  }