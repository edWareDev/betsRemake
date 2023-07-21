const formLogin = document.querySelector('#formLogin');
formLogin.addEventListener('submit', async (e) => {
    e.preventDefault()
    const datosFormulario = new FormData(formLogin)
    const datosUsuario = {
        username: datosFormulario.get('username'),
        password: datosFormulario.get('password'),
    }
    try {
        const respuesta = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosUsuario),
        })
        if (respuesta.status === 200) {
            const data = await respuesta.json()
            if (data.result !== 'Error') {
                console.log('Sesión Iniciada Correctamente')
                location.href = '/predicciones'
            } else {
                document.querySelector('.loginLog').innerText = 'Las credenciales ingresadas son incorrectas'
                document.querySelector('.loginLog').style.color = 'red'
            }
        } else {
            document.querySelector('.loginLog').innerText = 'Las credenciales ingresadas son incorrectas'
            document.querySelector('.loginLog').style.color = 'red'
        }

    } catch (error) {
        console.error(error);
    }
})