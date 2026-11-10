
function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = [
                { id: 1, name: "Amina" },
                { id: 2, name: "Brian" }
            ];

            const user = users.find(user => user.id === userId);

            if (user) {
                resolve(user);
            } else {
                reject({ status: 404, message: "User not found" });
            }
        }, 1000);
    });
}

async function main() {
    try {
        const user = await fetchUser(5);
        console.log("User:", user);

    } catch (error) {
        if (error.status === 404) {
            const defaultUser = {
                id: 0,
                name: "Guest User"
            };

            console.log("Using default user:", defaultUser);
        } else {
            console.log("Something went wrong:", error);
        }
    }
}

main();
