// initialize some necessary constants for the project
const url = 'https://randomuser.me/api/?results=12&noinfo';

const search_markup = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

const search = document.querySelector('.search-container');
const gallery = document.querySelector('.gallery');
const body = document.querySelector('body');

// add HTML code to `search-container` div
search.insertAdjacentHTML('beforeend', search_markup);

// fetch data from Random User API
fetch(url)
    .then((res) => res.json())
    .then((data) => {

        // assign the array of the data to a variable
        users = data.results;

        // Initialize markup variables
        gallery_markup = ``;
        modal_markup = ``;

        // add HTML codes for each card of employees
        for (let i = 0; i < users.length; i++) {

            gallery_markup = `<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${users[i].picture.thumbnail}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${users[i].name.first} ${users[i].name.last}</h3>
                    <p class="card-text">${users[i].email}</p>
                    <p class="card-text cap">${users[i].location.city}, ${users[i].location.state}</p>
                </div>
            </div>`;

            gallery.insertAdjacentHTML('beforeend', gallery_markup);

        }
        let cards = Array.from(document.querySelectorAll('.card')); // create an array from all `card` elements
        console.log(cards[0]);

        // add event listener for each `card` element
        for (let i = 0; i < users.length; i++) {
            cards[i].addEventListener('click', function () {

                modal_markup = `<div class="modal-container">
                    <div class="modal">
                        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                        <div class="modal-info-container">
                            <img class="modal-img" src="${users[i].picture.thumbnail}" alt="profile picture">
                            <h3 id="name" class="modal-name cap">${users[i].name.first} ${users[i].name.last}</h3>
                            <p class="modal-text">${users[i].email}</p>
                            <p class="modal-text cap">${users[i].location.city}</p>
                            <hr>
                            <p class="modal-text">${users[i].cell}</p>
                            <p class="modal-text">${users[i].location.street.number} ${users[i].location.street.name}, ${users[i].location.city}, ${users[i].location.state} ${users[i].location.postcode}</p>
                            <p class="modal-text">Birthday: ${users[i].dob.date.slice(0, 10)}</p>
                        </div>
                    </div>
                </div>`;

                // add modal window if users click on any card of employees
                body.insertAdjacentHTML('beforeend', modal_markup);

                // close the modal window if users click on X button
                let button = document.querySelector('.modal-close-btn');
                button.addEventListener('click', function(){
                    let modal = document.querySelector('.modal-container');
                    modal.remove();
                })
            })
        }
    })
    .catch((err) => console.error(err)); // catch the errors if any