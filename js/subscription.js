const url = 'http://localhost:7777/api/subscription';
const athletesList = document.getElementById('subscriptionList');
fetch(url)
    .then(response => response.json())
    .then(data => {

        // Обрабатываем полученные данные и выводим список спортсменов
        data.forEach(subscription => {
            const li = document.createElement('li');

            let actionTime;
            if(subscription.actionTime === null) {
                actionTime = 'Неограничено'
            } else {
                actionTime = subscription.actionTime
            }

            li.innerHTML = `
                <a href="http://localhost:63342/HeavyMetalFrontend/subscriptionId.html?id=${subscription.id}&name=${subscription.name}&countVisits=${subscription.countVisits}&price=${subscription.price}&actionTime=${subscription.actionTime}">
                    <span class="subscription_id">${subscription.id} </span>
                    <span class="name">Название: ${subscription.name} </span>
                    <span class="count_visits">Колличество посещений: ${subscription.countVisits} </span>
                   <span class="price">Цена: ${subscription.price} </span>
                   <span class="action_time">Время действия: ${actionTime} </span>
               </a>
            `;

            athletesList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Произошла ошибка при получении данных:', error);
    });