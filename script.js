function displayBooks(book) {
    //Creazione contenitore "col" dentro la row
    let col = document.createElement("div");
    col.classList.add("col-6", "col-md-4", "col-xl-2");

    document.querySelector(".row").appendChild(col);

    //Creazione card
    let card = document.createElement("div");
    card.classList.add("card", "customCard");

    col.appendChild(card);
    
    //Creazione contenuto card
    let cardImg = document.createElement("img");
    cardImg.classList.add("card-img-top");
    cardImg.alt = book.title;
    cardImg.src = book.img;
    cardImg.loading = "lazy";

    card.appendChild(cardImg);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    card.appendChild(cardBody);

    let cardTitle = document.createElement("h6");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = book.title;

    cardBody.appendChild(cardTitle);

    let cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");

    cardBody.appendChild(cardInfo);

    let price = document.createElement("div");
    price.classList.add("price");
    price.innerText = `${book.price}€`;

    cardInfo.appendChild(price);

    let save = document.createElement("div");
    save.classList.add("save");

    cardInfo.appendChild(save);

    let bookmarkIcon = document.createElement("i");
    bookmarkIcon.classList.add("fa-regular", "fa-bookmark");

    save.appendChild(bookmarkIcon);

    let buttonCart = document.createElement("button");
    buttonCart.type = "type";
    buttonCart.classList.add("addCart");

    let addToCart = document.createElement("span");
    addToCart.innerText = "AGGIUNGI AL ";

    let cartIcon = document.createElement("i");
    cartIcon.classList.add("fa-solid", "fa-cart-plus");


    save.appendChild(buttonCart);
    buttonCart.appendChild(addToCart);
    buttonCart.appendChild(cartIcon);
}

function saveBooks() {
   let bookmarkIcons = document.querySelectorAll(".save > i");
   bookmarkIcons.forEach(bookmarkIcon => {
    bookmarkIcon.addEventListener("click", () => {
        bookmarkIcon.classList.toggle("fa-regular");
        bookmarkIcon.classList.toggle("fa-solid");
    });
   });
}

fetch('https://striveschool-api.herokuapp.com/books')
.then(response => response.json())
.then(books => {
    books.forEach(book => {
        displayBooks(book);
    });
    saveBooks();
})
.catch(error => console.error('Errore durante la richiesta:', error.message));

function searchBooks(event) {
    event.preventDefault();

    let myInput = document.getElementById('searchBooks').value.toLowerCase();
    let myBooks = document.querySelectorAll('.col-6');

    if (myInput.trim() === '') {
        myBooks.forEach(myBook => {
            myBook.style.display = 'block';
        });
        myResetBtn.style.display = 'none';
    } else if (myInput.length < 3) {
        alert('Inserisci almeno 3 lettere per la ricerca.');
        return;
    } else {
        myBooks.forEach(myBook => {
            let title = myBook.querySelector('.card-title').textContent.toLowerCase();
    
            if (title.includes(myInput)) {
                myBook.style.display = 'block';
            } else {
                myBook.style.display = 'none';
            }
        });
        myResetBtn.style.display = 'inline-block';
    }
}

function resetSearch() {
    let myBooks = document.querySelectorAll('.col-6');
    document.getElementById('searchBooks').value = '';

    myBooks.forEach(myBook => {
        myBook.style.display = 'block';
    });

    myResetBtn.style.display = 'none';
    myBtn.style.display = 'block';
  }

let myBtn = document.getElementById("searchButton");
myResetBtn = document.getElementById("resetButton");

myBtn.addEventListener("click", searchBooks);
myResetBtn.addEventListener("click", resetSearch);

document.getElementById('searchBooks').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBooks(e);
    }
});

