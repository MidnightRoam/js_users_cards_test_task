// Функция получения данных пользователя с бэкенда и вывод пользотвательских карточек
async function getUsers() {
    let response = await fetch('http://127.0.0.1:3000');
    let content = await response.json();
    let user_list = document.querySelector('.page')

    let key;
    for (key in content) {
        /* Добавляем в HTML персональные карточки пользователей */
        user_list.innerHTML += ` 
            <ul class="ul">
                <li>
                    <div class="card__body rounded shadow">
                        <div class="user__name">${content[key].name}</div>
                        <div class="user__info pd-10">
                        <div class="user__phone pd-10">
                        <img 
                        class='icon' 
                        src="https://img.icons8.com/external-icongeek26-outline-gradient-icongeek26/344/external-phone-essentials-icongeek26-outline-gradient-icongeek26.png" 
                        alt="phone">${content[key].phone}
                        </div>
                        <div class="user__email pd-10">
                        <img class='icon' 
                        src="https://img.icons8.com/external-bearicons-gradient-bearicons/344/external-Email-email-bearicons-gradient-bearicons.png" 
                        alt="email">${content[key].email}
                        </div>
                    </div>
                </li>
            </ul>
        `
        user_list.addEventListener("click", () => openModal(content[key].name))
    }
}
console.log(getUsers());

// Модальное окно
const modalEl = document.querySelector('.modal');

// Функционал открытия модального окна и получения личных данных пользователей
async function openModal(user) {
    console.log(user)
    let response = await fetch(`http://127.0.0.1:3000`);
    let content = await response.json();

    // При клике на карточку делаем модальное окно видимое и запрещаем скорллинг
    modalEl.classList.add('modal--show');
    document.body.classList.add("stop-scrolling");

    for (let key in content) {
        console.log(content[key].name);

        modalEl.innerHTML = `
            <div class="modal__card rounded">
                <button type="button" class="modal__button-close">&#10006;</button>
                <div class="modal__user-name"><b>${content[key].name}</b></div>
                <ul class="modal__user-phone">
                    <li class="li__main"><b>Телефон:</b></li>
                    <li class="li__secondary">${content[key].phone}</li>
                </ul>
                <ul class="modal__user-email">
                    <li class="li__main"><b>Почта:</b></li> 
                    <li class="li__secondary">${content[key].email}</li>
                </ul>
                <ul class="modal__user-date">
                    <li class="li__main"><b>Дата приема:</b></li>
                    <li class="li__secondary">${content[key].hire_date}</li>
                </ul>
                <ul class="modal__user-position-name">
                    <li class="li__main"><b>Должность:</b></li>
                    <li class="li__secondary">${content[key].position_name}</li>
                </ul>
                <ul class="modal__user-department">
                    <li class="li__main"><b>Подразделение:</b></li>
                    <li class="li__secondary">${content[key].department}</li>
                </ul>
                <div class="card__info mg-10">
                    <p class="info__title"><b>Дополнительная информация:</b></p>
                    <p class="info__text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam aperiam assumenda delectus 
                        distinctio harum neque numquam porro repudiandae sed? Eos numquam porro provident recusandae!
                    </p>
                </div>
            </div>      
        `
    }
    // При нажатии на крестик - закрываем модальное окно
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
});

// Функционал закрытия модального окна при нажатии на кнопу ESC (в keyCode она имеет номер 27)
window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
        closeModal();
    }
});

// Функционал поиска пользователей
window.onload = () => {
    let input = document.querySelector('#search-field');
    input.oninput = function() {
        let value = this.value.trim(); // Отлавливаем введеные буквы в инпут
        let list = document.querySelectorAll('.ul li');

        if(value) {
            list.forEach(elem => {
               if (elem.innerText.search(value) == -1) {
                   elem.classList.add('hide');
               }
            });
        } else {
            list.forEach(elem => {
                elem.classList.remove('hide')
            });
        }
    };
};
