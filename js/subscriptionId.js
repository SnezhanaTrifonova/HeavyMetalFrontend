let id;
let name;
let countVisits;
let price;
let actionTime;

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');
    name = decodeURIComponent(urlParams.get('name'));
    countVisits = urlParams.get('countVisits');
    price = urlParams.get('price');
    actionTime = urlParams.get('actionTime');

    document.getElementById('id').value = id;
    document.getElementById('name').value = name;
    document.getElementById('count_visits').value = countVisits;
    document.getElementById('price').value = price;
    document.getElementById('action_time').value = actionTime;
});

document.getElementById('subscriptionForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        countVisits: document.getElementById('count_visits').value,
        price: document.getElementById('price').value,
        actionTime: document.getElementById('action_time').value
    };


    const response = await fetch('http://localhost:7777/api/subscription', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        console.log('Данные успешно отправлены на сервер');
        window.location.href = 'subscription.html';
    } else {
        console.error('Ошибка при отправке данных на сервер');
    }
});


document.querySelector('.button_delete').addEventListener('click', function () {
    fetch(`http://localhost:7777/api/subscription/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                window.location.href = 'subscription.html';
                console.log('DELETE request sent successfully');
            } else {
                console.error('Error sending DELETE request');
            }
        })
        .catch(error => {
            console.error('Error sending DELETE request:', error);
        });
});

