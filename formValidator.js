const config = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    errorSelector: 'form-input_type_error',
    errorSpanSelector: 'form__error-text_active'
}

class FormValidator {
    constructor(config) {
        this._config = config;
        this._inputList = Array.from(document.querySelectorAll(this._config.inputSelector));
        this._buttonElement = document.querySelector(this._config.submitButtonSelector);
    }

    _showError (inputElement, errorMessage) {
        const errorElement = document.querySelector(`.${inputElement.name}-input-text`);
        inputElement.classList.add(this._config.errorSelector);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorSpanSelector)
    }
    _hideError (inputElement) {
        const errorElement = document.querySelector(`.${inputElement.name}-input-text`);
        inputElement.classList.remove(this._config.errorSelector);
        errorElement.textContent = '';
        errorElement.classList.remove(this._config.errorSpanSelector)
    }

    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        }
    }
    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', '');
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled', '');
        }
    }

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }

    resetValidation = () => {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideError(inputElement)
        });
    }
    _setEventListeners = () => {
        this._toggleButtonState();
        this.resetValidation();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        })
    }
    enableValidation = () => {
        this._setEventListeners();
    }
}

export { config, FormValidator }