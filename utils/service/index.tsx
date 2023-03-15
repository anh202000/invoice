const baseUrl = process.env.BASE_URL

export const getData = async (url: any, token?: any, orgToken?: any) => {
    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            // 'org-token:': orgToken
        }
    })
    if(res?.status === 401) {
        localStorage.removeItem("access_token")
        localStorage.removeItem("firstLogin");
    }

    const data = await res.json()
    return data
}

export const postData = async (url: any, post: any, token?: any) => {
    const headerAuth = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'POST',
        headers: token ? headerAuth : {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: token ? JSON.stringify(post) : post
    })

    if(res?.status === 401) {
        localStorage.removeItem("access_token")
        localStorage.removeItem("firstLogin");
    }

    const data = await res?.json()
    return data
}



export const putData = async (url: any, post: any, token: any) => {
    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}

export const patchData = async (url: any, post: any, token: any) => {
    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    })

    const data = await res.json()
    return data
}


export const deleteData = async (url: any, token: any) => {
    const res = await fetch(`${baseUrl}/${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    const data = await res.json()
    return data
}