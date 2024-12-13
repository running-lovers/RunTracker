export const getUserFromStrava = async(access_token: string | null) => {
    if(access_token === null) {
        throw new Error('accessToken is required')
    }
    const res = await fetch('https://www.strava.com/api/v3/athlete', {
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        }
    })

    const data = await res.json();
    return data;
}