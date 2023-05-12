const modalForm = () =>{
    const modalTittle = document.createElement('h2');
    const modalClose = document.createElement('button');
    const form = document.createElement('form');
    const inputName = document.createElement('input');
    const inputTel = document.createElement('input');
    const divInfo = document.createElement('div');
    const inputMessage = document.createElement('input');
    const formBtn = document.createElement('button');
    const formBtnText = document.createElement('p');
    const divBtn = document.createElement('div');
    const divTop = document.createElement('div');
    const divModalContent = document.createElement('div');

    divModalContent.classList.add('modal__content','modal-activ');
    modalClose.classList.add('modal__close');
    modalTittle.classList.add('modal__title');
    form.classList.add('modal__form');
    divTop.classList.add('modal__top');
    divInfo.classList.add('modal__info');
    inputName.classList.add('modal__input');
    inputTel.classList.add('modal__input');
    inputMessage.classList.add('modal__input', 'modal__message');
    divBtn.classList.add('modal__box-btn');
    formBtn.classList.add('modal__btn','btn');
    formBtnText.classList.add('modal__text');

    inputName.type = 'text';
    inputTel.type = 'text';
    inputMessage.type = 'text';

    inputName.placeholder = 'Имя';
    inputTel.placeholder = 'Телефон или электронный адрес';
    inputMessage.placeholder = 'Сообщение';

    formBtn.textContent = 'Отправить';
    modalTittle.textContent = 'Если возникли вопросы или предложения';
    formBtnText.textContent = 'При нажатии на кнопку вы соглашаетесь с правилами конфиденциальности';

    divTop.append(
        inputName,
        inputTel,
    )
    divInfo.append(
        divTop,
        inputMessage
    )
    divBtn.append(
        formBtn,
        formBtnText 
    );
    form.append(
        divInfo,  
        divBtn
    );
    divModalContent.append(
        modalClose,
        modalTittle,
        form
        );


    return {
        divModalContent,
        modalClose,
    }
};

document.querySelector('.header__btn').addEventListener('click', () => {
    const divModal = document.createElement('div');
    const  modal = modalForm()
    divModal.classList.add('modal','modal-activ');
    divModal.append(modal.divModalContent);
    document.body.append(divModal);

    modal.modalClose.addEventListener('click', () => {
        divModal.remove();
    });

    document.addEventListener('click', (e) => {
        if (e.target == divModal) {
            divModal.remove();
        }
    });
});