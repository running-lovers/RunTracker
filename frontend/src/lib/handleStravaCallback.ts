
export const handleStravaCallback = async(code: string, setUser:React.Dispatch<React.SetStateAction<null>>) => {
    try {
      const res = await fetch('Update your `frontend/src/pages/index.tsx` file to include a function that handles the callback:', {
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

      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      console.error('Error in Strava callback:', error);
    }
  }