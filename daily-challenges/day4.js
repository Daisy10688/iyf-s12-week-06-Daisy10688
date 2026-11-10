
function getUser(callback) {
    setTimeout(() => {
        callback({ id: 1, name: "Amina" });
    }, 1000);
}

// Convert callback into a Promise
function getUserPromise() {
    return new Promise(resolve => {
        getUser(user => {
            resolve(user);
        });
    });
}

// Use async/await
async function main() {
    console.log("Loading user...");

    const user = await getUserPromise();

    console.log("User received:", user);
}

main();
