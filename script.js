const contentDiv = document.getElementById('content');
const nextButton = document.getElementById('next-button');
const heartsContainer = document.getElementById('hearts-container');

let currentLevel = 0;

// Функция для создания и анимации сердечка
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️'; // Используем символ сердечка

    // Случайная позиция внизу контейнера
    const startX = Math.random() * heartsContainer.offsetWidth;
    heart.style.left = `${startX}px`;
    heart.style.bottom = '-20px'; // Начинаем ниже видимой области

    // Случайный размер
    const size = Math.random() * 15 + 15; // От 15 до 30px
    heart.style.fontSize = `${size}px`;

    // Случайная длительность анимации
    const duration = Math.random() * 3 + 4; // От 4 до 7 секунд
    heart.style.animationDuration = `${duration}s`;

    heartsContainer.appendChild(heart);

    // Удаляем сердечко после завершения анимации
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// Запускаем создание сердечек каждые 300ms (можно настроить)
let heartInterval = null;

function startHeartRain() {
     heartInterval = setInterval(createHeart, 300); // Создаем сердечко каждые 300мс
     // Опционально: остановить дождь сердечек через некоторое время
     setTimeout(() => {
         clearInterval(heartInterval);
     }, 10000); // Прекратить создание сердечек через 10 секунд (можно убрать или изменить)
}

// Функция обновления контента
function updateContent() {
    contentDiv.innerHTML = ''; // Очищаем предыдущий контент

    if (currentLevel === 0) {
         // Изначальное состояние, кнопка "Начать"
         // Контент пустой или приветственный текст до первого нажатия
          contentDiv.innerHTML = `
            <h1>Привет, моя дорогая Айжана! ✨</h1>
            <p>Я приготовил для тебя маленькое сюрприз-приглашение.</p>
            <p>Нажми на кнопку, чтобы узнать подробности!</p>
         `;
         nextButton.textContent = 'Готова? Жми сюда!';
         nextButton.style.display = 'block'; // Убедимся, что кнопка видна

    } else if (currentLevel === 1) {
        // Первый уровень: Приветствие
        contentDiv.innerHTML = `
            <h1>Привет, моя прекрасная Айжана! ❤️</h1>
            <p>Это приглашение на особенное свидание, приготовленное только для тебя.</p>
            <p>Надеюсь, оно тебе понравится!</p>
            <p>Чтобы узнать больше, нажми "Дальше".</p>
        `;
        nextButton.textContent = 'Дальше! Жду!';
        nextButton.style.display = 'block';
        startHeartRain(); // Запускаем сердечки

    } else if (currentLevel === 2) {
        // Второй уровень: Время и место
        contentDiv.innerHTML = `
            <h1>Наше свидание ✨</h1>
            <p>Вот самое главное:</p>
            <p><strong>Время встречи:</strong> 20:15</p>
            <p><strong>Место встречи:</strong> Пристань, Речной вокзал</p>
            <p>Жду тебя с нетерпением! 🥰</p>
        `;
        nextButton.textContent = 'Поняла! До встречи!'; // Изменяем текст кнопки
        // nextButton.style.display = 'none'; // Можешь скрыть кнопку после последнего шага, или оставить с новым текстом
        // clearInterval(heartInterval); // Опционально: остановить создание сердечек после последнего шага
    } else {
        // Если уровни закончились
        contentDiv.innerHTML = `
            <h1>Увидимся скоро! 🥰</h1>
            <p>Надеюсь, тебе понравилось это маленькое приглашение.</p>
            <p>До встречи на свидании!</p>
        `;
        nextButton.style.display = 'none'; // Скрываем кнопку
         clearInterval(heartInterval); // Убедимся, что сердечки остановлены
    }
}

// Обработчик нажатия на кнопку
nextButton.addEventListener('click', () => {
    currentLevel++; // Переходим на следующий уровень
    updateContent(); // Обновляем содержимое
});

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
     // Инициализация Telegram WebApp API (делает приложение полноэкранным и т.д.)
    if (window.Telegram && window.Telegram.WebApp) {
        Telegram.WebApp.ready(); // Уведомляем Telegram, что приложение готово
        Telegram.WebApp.expand(); // Разворачиваем приложение на весь экран
         // Telegram.WebApp.setBackgroundColor('#ffccdd'); // Опционально: задать фон из API
    } else {
        console.log('Telegram WebApp API не найден. Возможно, открыто не в Telegram.');
        // Можно добавить заглушку или предупреждение для открытия вне Telegram
    }

    updateContent(); // Загружаем начальный контент (Уровень 0 или 1)
});