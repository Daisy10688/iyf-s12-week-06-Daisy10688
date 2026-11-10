
async function fetchData(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }

    return response.json();
}

async function main() {
    const endpoints = [
        "https://jsonplaceholder.typicode.com/users/1",
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/comments/1"
    ];

    const promises = endpoints.map(url => fetchData(url));

    const results = await Promise.allSettled(promises);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Request ${index + 1} succeeded:`, result.value);
        } else {
            console.log(`Request ${index + 1} failed:`, result.reason.message);
        }
    });
}

main();
