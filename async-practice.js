
// ==================================
// TASK 11.1: UNDERSTANDING ASYNC
// ==================================

// EXERCISE 1: Synchronous vs Asynchronous

console.log("1 - Start");

setTimeout(() => {
    console.log("2 - This is delayed");
}, 2000);

console.log("3 - End");


// Predict the output exercise

console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");


// EXERCISE 2: Callback Pattern

function fetchData(callback) {
    setTimeout(() => {
        const data = { name: "John", age: 30 };
        callback(data);
    }, 1000);
}

fetchData(function(data) {
    console.log("Data received:", data);
});


// BUILD: Simulate loading user data

function loadUser(userId, callback) {
    setTimeout(() => {
        const user = {
            id: userId,
            name: "Amina",
            age: 22
        };

        callback(user);
    }, 1500);
}

loadUser(1, function(user) {
    console.log("User loaded:", user);
});


// ==================================
// TASK 11.2: CALLBACKS AND PROMISES
// ==================================

// EXERCISE 1: Callback Hell

function getUserData(userId, callback) {
    setTimeout(() => {
        callback({ id: userId, name: "John" });
    }, 1000);
}

function getUserPosts(userId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, title: "Post 1" },
            { id: 2, title: "Post 2" }
        ]);
    }, 1000);
}

function getPostComments(postId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, text: "Great post!" },
            { id: 2, text: "Thanks for sharing" }
        ]);
    }, 1000);
}

// Callback Hell
getUserData(1, function(user) {
    console.log("User:", user);

    getUserPosts(user.id, function(posts) {
        console.log("Posts:", posts);

        getPostComments(posts[0].id, function(comments) {
            console.log("Comments:", comments);
        });
    });
});


// EXERCISE 2: Creating Promises

function getUserDataPromise(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "John" });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

function getUserPostsPromise(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1" },
                { id: 2, title: "Post 2" }
            ]);
        }, 1000);
    });
}

function getPostCommentsPromise(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Great post!" },
                { id: 2, text: "Thanks for sharing" }
            ]);
        }, 1000);
    });
}

// Using a Promise
getUserDataPromise(1)
    .then(user => {
        console.log("Promise User:", user);
    })
    .catch(error => {
        console.log("Error:", error);
    });


// ==================================
// TASK 11.3: PROMISE CHAINING
// ==================================

// EXERCISE 1: Chain Promises

getUserDataPromise(1)
    .then(user => {
        console.log("Chained User:", user);
        return getUserPostsPromise(user.id);
    })
    .then(posts => {
        console.log("Chained Posts:", posts);
        return getPostCommentsPromise(posts[0].id);
    })
    .then(comments => {
        console.log("Chained Comments:", comments);
    })
    .catch(error => {
        console.log("Error:", error);
    });


// EXERCISE 2: Promise.all

const promise1 = getUserDataPromise(1);
const promise2 = getUserDataPromise(2);
const promise3 = getUserDataPromise(3);

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log("All users:", results);
    })
    .catch(error => {
        console.log("One failed:", error);
    });


// EXERCISE 3: Promise.race

const fast = new Promise(resolve => {
    setTimeout(() => resolve("Fast!"), 100);
});

const slow = new Promise(resolve => {
    setTimeout(() => resolve("Slow!"), 500);
});

Promise.race([fast, slow])
    .then(result => {
        console.log("Winner:", result);
    });


// BUILD: Fetch 3 users simultaneously

Promise.all([
    getUserDataPromise(1),
    getUserDataPromise(2),
    getUserDataPromise(3)
])
.then(users => {
    console.log("Three users fetched:", users);
})
.catch(error => {
    console.log("Error fetching users:", error);
});


// ==================================
// TASK 11.4: ASYNC / AWAIT
// ==================================

// EXERCISE 1: Converting Promises to Async/Await

async function getDataWithAsync() {
    const user = await getUserDataPromise(1);
    console.log("Async User:", user);

    const posts = await getUserPostsPromise(user.id);
    console.log("Async Posts:", posts);

    const comments = await getPostCommentsPromise(posts[0].id);
    console.log("Async Comments:", comments);

    return comments;
}

getDataWithAsync();


// EXERCISE 2: Error Handling with Try/Catch

async function fetchUserData(userId) {
    try {
        const user = await getUserDataPromise(userId);
        const posts = await getUserPostsPromise(user.id);

        return { user, posts };

    } catch (error) {
        console.log("Failed to fetch:", error);
        throw error;
    }
}

fetchUserData(1)
    .then(data => console.log("Fetched data:", data))
    .catch(error => console.log("Final error:", error));


// EXERCISE 3: Parallel with Async/Await

async function getAllUsers() {
    const [user1, user2, user3] = await Promise.all([
        getUserDataPromise(1),
        getUserDataPromise(2),
        getUserDataPromise(3)
    ]);

    return [user1, user2, user3];
}

getAllUsers().then(users => {
    console.log("All users:", users);
});


// BUILD: Rewrite Callback Hell using Async/Await

async function getCompleteUserData() {
    try {
        const user = await getUserDataPromise(1);
        const posts = await getUserPostsPromise(user.id);
        const comments = await getPostCommentsPromise(posts[0].id);

        console.log("Complete User:", user);
        console.log("Complete Posts:", posts);
        console.log("Complete Comments:", comments);

    } catch (error) {
        console.log("Something went wrong:", error);
    }
}

getCompleteUserData();
