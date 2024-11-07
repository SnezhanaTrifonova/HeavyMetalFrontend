const url = 'http://localhost:7777/api/sportsman'; // Замените на реальный URL сервера
const athletesList = document.getElementById('athletesList');
fetch(url)
    .then(response => response.json())
    .then(data => {

        // Обрабатываем полученные данные и выводим список спортсменов
        data.forEach(sportsman => {
            const li = document.createElement('li');

            li.innerHTML = `
                <a href="http://localhost:63342/HeavyMetalFrontend/SportsmanId.html?id=${sportsman.id}">
                    <span class="sportsman_id">${sportsman.id} </span>
                    <span class="name">Имя: ${sportsman.name} </span>
                    <span class="surname">Фамилия: ${sportsman.surname} </span>
                   <span class="barcode">Код: ${sportsman.barcode} </span>
               </a>
            `;

            athletesList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Произошла ошибка при получении данных:', error);
    });

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    const athletes = athletesList.getElementsByTagName('li');

    Array.from(athletes).forEach(athlete => {
        // const id = athlete.querySelector('.sportsman_id').textContent.toLowerCase();
        const name = athlete.querySelector('.name').textContent.toLowerCase();
        const surname = athlete.querySelector('.surname').textContent.toLowerCase();
        const barcode = athlete.querySelector('.barcode').textContent.toLowerCase();

        if (name.includes(searchValue) || surname.includes(searchValue) || barcode.includes(searchValue)) {
            athlete.style.display = 'block';
        } else {
            athlete.style.display = 'none';
        }
    });
});

// document.addEventListener('DOMContentLoaded', function() {
//     document.querySelector('.excel').addEventListener('click', function() {
//         fetch('http://localhost:7777/api/sportsman/excel')
//             .then(response => response.blob())
//             .then(blob => {
//                 const url = window.URL.createObjectURL(new Blob([blob]));
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = 'sportsman.xlsx';
//                 document.body.appendChild(a);
//                 a.click();
//                 window.URL.revokeObjectURL(url);
//             });
//     });
// });

