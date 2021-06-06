class UserService {
    var username; // в классах не декларируется переменные
    var password; // в классах не декларируется переменные

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    get username() {
        return UserService.username;  // отработает неправильно, потому что оно ссылается на статическое свойство класса, чтобы заработала нужно поменять UserService на this
    }

    get password() {
        throw "You are not allowed to get password" // при попытке обратиться к гетеру  password будет выбрасываться ошибка
    }

    static authenticate_user() {
        let xhr = new XMLHttpRequest(); // Создание экземпляра класса XMLHttpRequest
        xhr.open('GET', 'https://examples.com/api/user/authenticate?username=' + UserService.username +
                '&password=' + UserService.password, true);
        xhr.responseType = 'json' // установка заголовка Сontent-Type после создания запроса она не сработает. Некорректное значение  должно application json

        const result = false;

        xhr.onload = function () {   // код не отработает , так как запрос происходит раньше регистрации слушателя события onload
            if (xhr.status !== '200') {
                result = xhr.response; // при попытке перезаписать константу произойдет ошибка
            } else {
                result = true; //при попытке перезаписать константу произойдет ошибка
            }
        };

        return result // код будет падать с ошибкой
    }

    $('form #login').click(function() { // имитация клика по элементу внутри тега form  с id login , обработчик никогда не будет вызван
        var username = $('#username');
        var password = $('#password');

        var res = UserService(username, password).authenticate_user(); // происходит вызов конструктора класса UserService и дальнейший вызов статического метода authenticate_user

        if (res == true) {
            document.location.href = '/home'; // если авторизация прошла успешно то совершится редирект на home
        } else {
            alert(res.error) //иначе системное всплывающее окно выдаст информацию об ошибке
        }
    }) //39-50 код должен быть обернут в функцию , данный код не относится на прямую к функциональности сервиса , а использует ее
}
//
// улучшить код можно убрать 2-3 строчку , xhr устаревший метод - лучше использовать fetch ,
// 39-50 - не относится к логике класса, должен выделен в отдельный метод класс-файл

