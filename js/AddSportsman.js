document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const name = urlParams.get('name');
    const surname = urlParams.get('surname');
    const barcode = urlParams.get('barcode');

    document.getElementById('id').value = id;
    document.getElementById('name').value = name;
    document.getElementById('surname').value = surname;
    document.getElementById('barcode').value = barcode;
});

document.getElementById('sportsmanForm').addEventListener('submit', async function (event) {
    event.preventDefault();


    const formData = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        barcode: document.getElementById('barcode').value
    };


    const response = await fetch('http://localhost:7777/api/sportsman', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        console.log('Данные успешно отправлены на сервер');
        window.location.href = 'index.html';
    } else {
        console.error('Ошибка при отправке данных на сервер');
    }
});