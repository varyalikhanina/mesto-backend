export default class FormValidator {
    constructor(anyForm, api) {
      this.anyForm = anyForm;
      this.api = api;
    }
    checkInputValidity(input, error) {
      this.input = input;
      this.error = error;
      this.checkIfValueIsMissing();
      this.checkInputType();
      this.checkInputLength();
      this.validateInput();
      return this.isInputValid;
    }   
    checkIfValueIsMissing() {
      const noContent = "Это обязательное поле";
      if (this.input.validity.valueMissing) {
        this.error.textContent = noContent;
        this.error.classList.add('error-message_invalid-input');
        this.error.classList.remove('error-message_valid-input');
        this.input.classList.add('popup__input_invalid');
        this.input.classList.remove('popup__input_valid');
        this.isInputValid = false;
      } 
    }
    checkInputType () {
      const linkContent = "Здесь должна быть ссылка";
      if (this.input.validity.typeMismatch) {
        this.error.textContent = linkContent;
        this.error.classList.add('error-message_invalid-input');
        this.error.classList.remove('error-message_valid-input');
        this.input.classList.add('popup__input_invalid');
        this.input.classList.remove('popup__input_valid');
        this.isInputValid = false;
      }
    } 
    checkInputLength() {
      const wrongInput = "Должно быть от 2 до 30 символов";
      if (this.input.validity.tooLong || this.input.validity.tooShort) {
        this.error.textContent = wrongInput;
        this.error.classList.add('error-message_invalid-input');
        this.error.classList.remove('error-message_valid-input');
        this.input.classList.add('popup__input_invalid');
        this.input.classList.remove('popup__input_valid');
        this.isInputValid = false;
      }
    }
    validateInput() {
        if (this.input.checkValidity()) {
          this.error.classList.remove('error-message_invalid-input');
          this.error.classList.add('error-message_valid-input');
          this.input.classList.add('popup__input_valid');
          this.input.classList.remove('popup__input_invalid');
          this.isInputValid = true;
        }
    } 
    setSubmitButtonState(button, status) {
      this.button = button;
      this.status = status;
      if (this.status) {
        this.button.classList.add('popup__button_valid');
        this.button.classList.remove('popup__button_invalid');
        this.button.disabled = false;
      } else {
        this.button.classList.remove('popup__button_valid');
        this.button.classList.add('popup__button_invalid');
        this.button.disabled = true;
      }
    }
    setEventListeners() {
      this.anyForm.addEventListener('input', () => {  
        let isFormValid = true;
        const elements = Array.from(this.anyForm.elements); 
        const elementsFiltered = elements.filter(elem => elem.type != 'submit'); 
        elementsFiltered.forEach(elem => {
            const errors = elem.nextElementSibling;
            const isValidInput = this.checkInputValidity(elem, errors);
            if (!isValidInput) {
              isFormValid = false;
            }
            const button = this.anyForm.querySelector('.button');
            this.setSubmitButtonState(button, isFormValid);
        });
      });  
      this.anyForm.querySelector('.button').addEventListener('click', () => {
        let isFormValid = true;
        const elements = Array.from(this.anyForm.elements); 
        const elementsFiltered = elements.filter(elem => elem.type != 'submit'); 
        elementsFiltered.forEach(elem => {
          const errors = elem.nextElementSibling;
          const isValidInput = this.checkInputValidity(elem, errors);
          if (!isValidInput) {
            isFormValid = false;
          }
          const button = this.anyForm.querySelector('.button');
          this.setSubmitButtonState(button, isFormValid);
        })
      });
  }
}