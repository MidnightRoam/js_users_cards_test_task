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
// const openPopUp = document.getElementById('open_pop_up');
// const closePopUp = document.getElementById('pop_up_close');
// const popUp = document.getElementById('pop_up');
//
// openPopUp.addEventListener('click', function (e) {
//     e.preventDefault();
//     popUp.classList.add('active');
// })
//
// closePopUp.addEventListener('click', () => {
//     popUp.classList.remove('active');
// })

// Функция получения данных пользователя с бэкенда и вывод пользотвательских карточек
async function getUsers() {
    let response = await fetch('http://127.0.0.1:3000');
    let content = await response.json();
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
            </div>
        `
        user_list.addEventListener("click", () => openModal(content[key].name))
    }
}
console.log(getUsers());

// Модальное окно
const modalEl = document.querySelector('.modal');

// Функционал открытия модального окна и получения данных пользователей
async function openModal(id) {
    console.log(id)
    let response = await fetch(`http://127.0.0.1:3000`);
    let content = await response.json();

    // При клике на карточку делаем модальное окно видимое и запрещаем скорллинг
    modalEl.classList.add('modal--show');
    document.body.classList.add("stop-scrolling");

        modalEl.innerHTML = `
        <div class="modal__card rounded">
            <button type="button" class="modal__button-close">&#10006;</button>
            <div class="user__name"></div>
            <div class="user__phone">Телефон: </div>
            <div class="user__email">Почта: </div>
            <div class="user__date">Дата приема: </div>
            <div class="user__position-name">Должность: </div>
            <div class="user__department">Подразделение: </div>
            <div class="card__info">
                <p><b>Дополнительная информация:</b></p>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam aperiam assumenda delectus 
                distinctio harum neque numquam porro repudiandae sed? Eos numquam porro provident recusandae!
                </p>
            </div>
        </div>   

    `
    const btnClose = document.querySelector(".modal__button-close")
    btnClose.addEventListener("click", () => closeModal());
}

// Функционал закрытия модального окна для кнопки крестика
function closeModal() {
    modalEl.classList.remove("modal--show");
    document.body.classList.remove("stop-scrolling");
}

// Функционал закрытия модального окна при нажатии в зону вне окна
window.addEventListener("click", (e) => {
    if (e.target === modalEl) {
        closeModal();
    }
})

// Функционал закрытия модального окна при нажатии на кнопу ESC (в keyCode она имеет номер 27)
window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
        closeModal();
    }
})
