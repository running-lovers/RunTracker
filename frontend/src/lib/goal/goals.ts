const apiUrl= process.env.NEXT_PUBLIC_BACKEND_URL

export const getMonthlyGoals = async(userId: number) => {
    const res = await fetch(`${apiUrl}/api/goals/${userId}`)
    if(!res.ok) {
      throw new Error('failed to get response from getGoals')
    }
    const data = await res.json();
    return data;
}