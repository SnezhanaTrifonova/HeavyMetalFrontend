const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

const urlParams = new URLSearchParams(window.location.search);
const sportsmanId = urlParams.get('id');
const con = document.getElementById('sportsman_by_id');
let countVisits = 0;

fetch(`http://localhost:7777/api/visits/count?sportsmanId=${sportsmanId}`)
    .then(response => response.json())
    .then(count => {
        // Обработка полученных данных, например, вывод на страницу
        countVisits = count
    })
    .catch(error => console.error('Произошла ошибка:', error));

fetch(`http://localhost:7777/api/sportsman/${sportsmanId}`)
    .then(response => response.json())
    .then(sportsman => {
        // Обработка полученных данных, например, вывод на страницу
        const p = document.createElement('p');

        p.innerHTML = `               
                <span class="sportsman_id">${sportsman.id} </span>
                <span class="name">Имя: ${sportsman.name} </span>
                <span class="surname">Фамилия: ${sportsman.surname} </span>
               <span class="barcode">Код: ${sportsman.barcode} </span>               
               <span class="count_visits">Посещений: ${countVisits} </span>          
            `;

        con.appendChild(p);
    })
    .catch(error => console.error('Произошла ошибка:', error));

const purchasedSubscriptionsList = document.getElementById('purchased_subscriptions_list');

fetch(`http://localhost:7777/api/subscription/purchased/bySportsman/${sportsmanId}?active=true`)
    .then(response => response.json())
    .then(visits => {
        visits.forEach(purchasedSubscription => {
            const li = document.createElement('li');
            const startedDate = new Date(purchasedSubscription.startedDate);
            const stoppedDate = purchasedSubscription.stoppedDate ? new Date(purchasedSubscription.stoppedDate) : null;

            li.innerHTML =
                `
                <span class="id">${purchasedSubscription.id} </span>
                <span class="purchased_subscription">${purchasedSubscription.subscriptionName} </span>
                <span class="purchased_subscription">
               Дата покупки:
                    ${startedDate.getDate()} 
                    ${months[startedDate.getMonth()]} 
                    ${startedDate.getFullYear()} 
                    ${startedDate.getHours()}:${startedDate.getMinutes()}
                </span>               
                <span class="purchased_subscription">
                Дата окончания:
                    ${stoppedDate ? `
                        
                        ${stoppedDate.getDate()} 
                        ${months[stoppedDate.getMonth()]} 
                        ${stoppedDate.getFullYear()} 
                        ${stoppedDate.getHours()}:${stoppedDate.getMinutes()}
                    ` : 'Без окончания'}
                </span>
                <button class="visit_button" data-sportsman-id="${purchasedSubscription.sportsmanId}" data-purchased-subscription-id="${purchasedSubscription.id}">
                    Посещение
                </button>
                `;
            purchasedSubscriptionsList.appendChild(li);
        });
        document.querySelectorAll('.visit_button').forEach(button => {
            button.addEventListener('click', function() {
                const sportsmanId = this.getAttribute('data-sportsman-id');
                const purchasedSubscriptionId = this.getAttribute('data-purchased-subscription-id');

                fetch('http://localhost:7777/api/visits', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sportsmanId: sportsmanId,
                        purchasedSubscriptionId: purchasedSubscriptionId
                    })
                })
                    .then(response => {
                        if (response.ok) {
                            // alert('Посещение оформлено');
                            console.log('Visit request sent successfully');
                            window.location.href = `sportsmanId.html?id=${sportsmanId}`
                        } else {
                            console.error('Error sending visit request');
                        }
                    })
                    .catch(error => {
                        console.error('Error sending visit request:', error);
                    });
            });
        });
    })
    .catch(error => console.error('Произошла ошибка:', error));




const visitsList = document.getElementById('visit_list');

fetch(`http://localhost:7777/api/visits?sportsmanId=${sportsmanId}`)
    .then(response => response.json())
    .then(visits => {
        visits.forEach(visit => {
            const li = document.createElement('li');
            const createdDate = new Date(visit.createdDate);
            li.innerHTML =
                `
                    ${createdDate.getDate()} 
                    ${months[createdDate.getMonth()]} 
                    ${createdDate.getFullYear()} 
                    ${createdDate.getHours()}:${createdDate.getMinutes()}
                `;
            visitsList.appendChild(li);
        });
    })
    .catch(error => console.error('Произошла ошибка:', error));


document.querySelector('.button_edit_sportsman').addEventListener('click', function () {
    const sportsmanId = document.querySelector('.sportsman_id').innerText.trim();
    const sportsmanName = document.querySelector('.name').innerText.split(': ')[1].trim();
    const sportsmanSurname = document.querySelector('.surname').innerText.split(': ')[1].trim();
    const sportsmanBarcode = document.querySelector('.barcode').innerText.split(': ')[1].trim();

    window.location.href = `addSportsman.html?id=${sportsmanId}&name=${sportsmanName}&surname=${sportsmanSurname}&barcode=${sportsmanBarcode}`;
});

document.querySelector('.button_delete').addEventListener('click', function () {
    fetch(`http://localhost:7777/api/sportsman/${sportsmanId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                window.location.href = 'index.html';
                console.log('DELETE request sent successfully');
            } else {
                console.error('Error sending DELETE request');
            }
        })
        .catch(error => {
            console.error('Error sending DELETE request:', error);
        });
});