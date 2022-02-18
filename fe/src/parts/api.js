
const API_URL = "http://localhost:3001";
const API_KEY = "api_key";
const HEADERS = {
    'Content-Type': 'application/json',
    "Authorization": API_KEY,
};

function timestampToDate(timestamp) {
    return timestamp.substring(0, timestamp.indexOf("T"));
}

async function format(data) {
    const users = await data.json();
    return users.map(x => {
        return {
            _id: x._id,
            username: x.username,
            email: x.email,
            birthdate: timestampToDate(x.birthdate),
        };
    });
}

export async function GetData(query="") {
    let url = `${API_URL}/users`;
    if (query !== "")
        url = `${API_URL}/users?value=${query}`;

    const data = await fetch(url, { headers: HEADERS });
    return format(data);
}

export async function UpdateData(data) {
    const res = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: HEADERS ,
            body: JSON.stringify(data),
        });
    return res.json();
}