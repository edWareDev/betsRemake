// Mostrar acciones al hacer click en el perfil
const profileButton = document.querySelector('.userOptions__visible__userData__options')
const profileOptions = document.querySelector('.userOptions__invisible')
profileButton.addEventListener('click', () => {
    profileOptions.classList.toggle('inv')
})
function hideDivOnClickOutside(event) {
    const userOptions = document.querySelector('.userOptions__visible__userData');
    const targetElement = event.target;

    // Verificar si el clic ocurrió fuera del div
    if (!userOptions.contains(targetElement)) {
        profileOptions.classList.add('inv')
    }
}

// Evento que escucha los clics en el documento
document.addEventListener('click', hideDivOnClickOutside);

// Ocultar el chat al hacer clic en el título
const chatButton = document.querySelector('.chat__topBar')
let chatStatus = 'active'
chatButton.addEventListener('click', () => {
    document.querySelector('.chat__history').classList.toggle('inv')
    document.querySelector('.chat__newMessage').classList.toggle('inv')
    if (chatStatus === 'active') {
        document.querySelector('.chatContainer').style.height = '2rem'
        document.querySelector('.chat__topBar--options').innerHTML = '<i class="fa-solid fa-caret-up"></i>'
        chatStatus = 'inactive'
    } else {
        document.querySelector('.chatContainer').style.height = '100vh'
        document.querySelector('.chat__topBar--options').innerHTML = '<i class="fa-solid fa-caret-down"></i>'
        chatStatus = 'active'
    }
})

// Funcion para desplazar el scroll al final del chat
const scroll = document.querySelector('.chat__history')
scroll.scrollTop = scroll.scrollHeight;