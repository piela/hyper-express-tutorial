
// Funkcja główna do wykonania kilku żądań




function main() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    //asynchroniczne wywołanie
    const result= fetch(url).then( async response => {
            // Sprawdzenie, czy odpowiedź jest poprawna (status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parsowanie odpowiedzi jako JSON
            console.log(response.body);
            const data =await response.json()
         console.log(data);   
            
            
        })
        .catch(error => {
            // Obsługa błędów
            console.error('Error fetching data:', error);
        });
        console.log(result);
        console.log("po fetch")


}





 async function mainAsync() {


    const url = 'https://jsonplaceholder.typicode.com/users';
    //asynchroniczne wywołanie
    const response = await fetch(url, (response) => { });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response);
    const data =  response.json().then((data)=>{console.log(data)})
    console.log("mainAsync");
    console.log(data);
}

// Uruchomienie funkcji głównej
mainAsync();
//main();
