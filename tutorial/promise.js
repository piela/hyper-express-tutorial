
// Funkcja główna do wykonania kilku żądań




async function main() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    //asynchroniczne wywołanie
     fetch(url)
        .then(response => {
            // Sprawdzenie, czy odpowiedź jest poprawna (status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parsowanie odpowiedzi jako JSON
            return response.json();
        })
        .catch(error => {
            // Obsługa błędów
            console.error('Error fetching data:', error);
        });
}





async function mainAsync() {


    const url = 'https://jsonplaceholder.typicode.com/users';
    //asynchroniczne wywołanie
    const response = await fetch(url, (response) => { });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("mainAsync");
    console.log(data);
}

// Uruchomienie funkcji głównej
main();
//mainAsync();