// const popupLinks = document.querySelectorAll('.popup-link');
// const body = document.querySelector('body');
// const lockPadding = document.querySelectorAll('.lock-padding');
//
// let unlock = true;
//
// const timeout = 800;
//
// if (popupLinks.length > 0) {
//     for (let index = 0; index < popupLinks.length; index++) {
//         const popupLink = popupLinks[index];
//         popupLink.addEventListener("click", function (e) {
//             const popupName = popupLink.getAttribute("href").replace("#", '');
//             const currentPopup = document.getElementById(popupName);
//             popupOpen(currentPopup);
//             e.preventDefault();
//         });
//     }
// }
// const popupCloseIcon = document.querySelectorAll('.close-popup');
// if (popupCloseIcon.length > 0) {
//     for (let index = 0; index < popupCloseIcon.length; index++ ) {
//         const el = popupCloseIcon[index];
//         el.addEventListener('click', function (e) {
//             popupClose(el.closest('.popup'));
//             e.preventDefault();
//         });
//     }
// }
//
// /* Функция открытия popup */
// function popupOpen(currentPopup) {
//     if (currentPopup && unlock) {
//         const popupActive = document.querySelector('.popup.open');
//         if (popupActive) {
//             popupClose(popupActive, false);
//         } else {
//             bodyLock();
//         }
//         currentPopup.classList.add('open');
//         currentPopup.addEventListener("click", function (e) {
//             if (!e.target.closest('.popup__content')) {
//                 popupClose(e.target.closest('.popup'));
//             }
//         });
//     }
// }
const openPopUp = document.getElementById('open_pop_up');
const closePopUp = document.getElementById('pop_up_close');
const popUp = document.getElementById('pop_up');

openPopUp.addEventListener('click', function (e) {
    e.preventDefault();
    popUp.classList.add('active');
})

closePopUp.addEventListener('click', () => {
    popUp.classList.remove('active');
})

/* Функция получения данных пользователя с бэкенда */
async function getResponse() {
    let response = await fetch('http://127.0.0.1:3000')
    let content = await response.json()

    let user_list = document.querySelector('.page')

    let key;
    for (key in content) {
        /* Добавляем в HTML персональные карточки пользователей */
        user_list.innerHTML += `          
            <div class="card__body mg-10 rounded shadow popup-link">
                <div class="user__name pd-10">${content[key].name}</div>
                <div class="user__info pd-10">
                <div class="user__phone">${content[key].phone}</div>
                <div class="user__email">${content[key].email}</div>
            </div>`
    }
}
console.log(getResponse());


