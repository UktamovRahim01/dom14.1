export const BASE_URL = "http://localhost:5050"



export const getData = async (path) => {
    try {
        const res = await fetch(BASE_URL + path)

        const data = await res.json()

        return data
    } catch (error) {
        console.log(error)
        return []
    }
}


export const postData = async (path, body) => {
    try {
        const res = await fetch(BASE_URL + path, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }

        })
        const data = await res.json()

        return data

    } catch (e) {
        console.log(e);
    }
}


export const deleteData = async (path, id) => {
    try {
        const res = await fetch(BASE_URL + path + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e);
    }
};


export const updateData = async (path, body) => {
    try {
        const res = await fetch(BASE_URL + path, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        return data;

    } catch (e) {
        console.log(e);
    }
};