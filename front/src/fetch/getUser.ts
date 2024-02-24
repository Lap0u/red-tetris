const getUser = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3333/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('Failed to get a user');
    }
    const data = await res.json();
    return data.id;
  } catch (error) {
    return null;
  }
};

export default getUser;
