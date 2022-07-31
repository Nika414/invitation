import { config, FormValidator } from './formValidator.js'

const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const submitButton = popup.querySelector('.form__button');
const form = popup.querySelector('.form')
const complitionSpan = popup.querySelector('.form__complition');
const formContainer = popup.querySelector('.form__container')

const openPopup = () => {
    popup.classList.remove('popup__hidden');
    form.reset();
    formValidator.enableValidation();
    formContainer.classList.remove('form__container_hidden');
    complitionSpan.classList.remove('form__complition_active');
}


const imInButtons = document.querySelectorAll('.im-in-button');
imInButtons.forEach((imInButton) => {
    imInButton.addEventListener('click', openPopup);
});

const closePopup = () => {
    popup.classList.add('popup__hidden');
}

closeButton.addEventListener('click', closePopup);

form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    formContainer.classList.add('form__container_hidden');
    complitionSpan.classList.add('form__complition_active');
})


//form validation

const formValidator = new FormValidator(config);
