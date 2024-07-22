async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Funkcja główna do wykonania kilku żądań
async function main() {
    const apiUrl = 'https://jsonplaceholder.typicode.com';

    // Wysyłanie równocześnie kilku żądań
    const usersPromise = fetchData(`${apiUrl}/users`);
    const postsPromise = fetchData(`${apiUrl}/posts`);
    const commentsPromise = fetchData(`${apiUrl}/comments`);

    // Oczekiwanie na odpowiedzi
    const [users, posts, comments] = await Promise.all([usersPromise, postsPromise, commentsPromise]);

    // Wyświetlanie wyników
    console.log('Users:', users);
    console.log('Posts:', posts);
    console.log('Comments:', comments);
}

// Uruchomienie funkcji głównej
main();