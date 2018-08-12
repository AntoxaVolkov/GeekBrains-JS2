document.addEventListener('DOMContentLoaded', init);

function init() {
    "use strict";
    
    var items, menu;
    var header = document.querySelector('.header');
    var photos = document.querySelector('.photos');

    // Пространство имен для раюботы с пользователями 
    var usersCont = { 
        el: document.querySelector('.users'),
        elList: document.querySelector('.users__list'),
        elNotifications: document.querySelector('.users__notifications'),
        elID: document.querySelector('#userId'),
        elForm: document.querySelector('.users__add'),
        users: [],
        render: function(){
            this.clearNotification();
            this.elList.innerHTML = '';
            if(this.users.length > 0){

                // es2015 так как всеравно использую fetch
                for(let user of this.users){
                    let li = document.createElement('li');
                    let p = document.createElement('p');
                    let ul = document.createElement('ul');
                    let liAge = document.createElement('li');
                    let liEmail = document.createElement('li');

                    liAge.innerText = user.age;
                    liEmail.innerText = user.email;
                    p.innerText = user.name;
                    ul.appendChild(liAge);
                    ul.appendChild(liEmail);
                    li.appendChild(p);
                    li.appendChild(ul);

                    this.elList.appendChild(li);
                    
                }
                
            }else{
                console.log('Список пользователей пуст');
            }
        },

        addNotification: function(msg, type){
            this.clearNotification();
            var span = document.createElement('span');
            if (type === "error") span.className = "notifications__error";
            else span.className = "notifications__info";

            span.innerText = msg;

            this.elNotifications.appendChild(span);
        },

        clearNotification: function(msg, type){
            this.elNotifications.innerHTML = "";
        }

    };

    // API для работы с сервером
    var api = {
        baseURL: 'http://localhost:3001/',
        getUsers: function () {
            let error = false;
            return fetch( this.baseURL + 'user' ).then((res) => {
                if(res.status === 404){
                    error = true;
                }
                
                return res.json(); 
                
            })
            .then((data) => {
                if(error){
                    throw data;
                }

                return data;
            });
        },

        getUser: function (id) {
            let error = false;
            return fetch(this.baseURL + 'user/' + id).then((res) => {
                if (res.status === 404) {
                    error = true;
                }

                return res.json(); 
            })
            .then((data) => {
                if (error) {
                    throw data;
                }

                return data;
            });
        },

        setUser: function (formData) {
            let error = false;
            formData = JSON.stringify(formData);
            return fetch(this.baseURL + 'user/', { method: 'POST', body: formData }).then((res) => {
                if (res.status === 404) {
                    error = true;
                }

                return res.json(); 
            })
            .then((data) => {
                if (error) {
                    throw data;
                }

                return data;
            });
        },

        getNav: function () {
            let error = false;
            return fetch(this.baseURL + 'nav').then((res) => {
                if (res.status === 404) {
                    error = true;
                }

                return res.json(); 
            })
            .then((data) => {
                if (error) {
                    throw data;
                }

                return data;
            });
        },
        getPicture: function(){
            //** */
            return fetch('https://pixabay.com/api/?key=1631539-db8210cabd2636c6df59812df&q=girl&image_type=photo')
                .then(res => res.json());
        }
    
    }
    
    // Получаем и рендери навигацию
    api.getNav()
        .then(function(links){
            items = createItemsMenu(links);
            menu = new Menu('mainMenu', 'header__menu', items);
            header.appendChild(menu.render());
        })
        .catch(function(err){
            console.log('Что то пошло не так');
            console.log(err);
        });


    // Обработчик для кнопок получения пользователей
    usersCont.el.addEventListener('click', function(ev){
        if(ev.target.id === 'getUsers'){
            getUsers();
        } else if (ev.target.id === 'getUser'){
            let id  = usersCont.elID.value;
            getUsersById(id);
        }
    });

    // Обработчик для формы получения пользователей
    usersCont.elForm.addEventListener('submit', function(ev){
        ev.preventDefault();

        usersCont.addNotification('Идет отправка...');

        let name = usersCont.elForm.name.value;
        let age = usersCont.elForm.age.value;
        let email = usersCont.elForm.email.value;

        let data = {
            name,
            age,
            email
        }

        api.setUser(data)
            .then((res) =>{
                usersCont.elForm.reset();
                usersCont.addNotification('Пользователь добавлен');
                getUsers();
            })
            .catch((err) => {
                usersCont.users = [];
                usersCont.render();
                usersCont.addNotification('Ошибка при добавлении пользователя', 'error');
            });
    });

    // функция получения и рендеринга всех пользователей
    function getUsers(){
        api.getUsers()
            .then(function (users) {
                usersCont.users = users;
                usersCont.render();
            })
            .catch(function (err) {
                usersCont.users = [];
                usersCont.render();
                usersCont.addNotification(err.error, 'error');
            });
    }

    // функция получения и рендеринга пользователя по ID
    function getUsersById(id) {
        id = +id;
        if (typeof id !== 'number' || isNaN(id) || id <= 0) {
            usersCont.users = [];
            usersCont.render();
            usersCont.addNotification('ID может быть только числом', 'error');
            return;
        }
        api.getUser(id)
            .then(function (user) {
                usersCont.users = [user];
                usersCont.render();
            })
            .catch(function (err) {
                usersCont.users = [];
                usersCont.render();
                usersCont.addNotification(err.error, 'error');
            });
    }


    // Получаем фото и рендарим фотогалерею
    api.getPicture()
        .then((pics) => {
            for(let pic of pics.hits){
                renderPhotos(pic)
            }
        });


    //Функция для рендеринга фотогалереи
    function renderPhotos(pic){
        let a = document.createElement('a');
        let img = document.createElement('img');

        img.setAttribute('src', pic.previewURL);
        img.setAttribute('alt', pic.tags);

        a.setAttribute('href', pic.largeImageURL);
        a.setAttribute('target', '_blank');

        a.appendChild(img);

        photos.appendChild(a);
    }

/******************************* => Классы навигации <= *************************/

    /** Class Container */

    function Container() {
        this.id = "";
        this.className = "";
        this.htmlCode = ""
    }

    Container.prototype.render = function () {
        return this.htmlCode;
    }

    Container.prototype.remove = function () {
        if (this.htmlCode) {
            // Можно и просто remove на самом элементе, если не нужен IE11-
            this.htmlCode.parentElement.removeChild(this.htmlCode);
        }
    }


    /** Class Menu */

    function Menu(id, className, items) {
        Container.call(this);
        this.id = id;
        this.className = "menu ";
        this.className += className;
        this.items = items;
    }

    Menu.prototype = Object.create(Container.prototype);
    Menu.prototype.constructor = Menu;
    Menu.prototype.render = function () {
        var item, span;
        var menu = document.createElement('ul');

        menu.className = this.className;

        if (this.id) {
            menu.setAttribute('id', this.id);
        }

        for (var i in this.items) {
            if (this.items[i] instanceof MenuItem) {
                menu.appendChild(this.items[i].render());
            } else if (this.items[i] instanceof SubMenu) {
                item = document.createElement('li');
                span = document.createElement('span');
                span.innerText = this.items[i].name;
                item.classList.add('menu__sub-menu');
                item.appendChild(span);
                item.appendChild(this.items[i].render());

                // Чтобы подменю можно было удалить вмести с обёрткой 
                this.items[i].htmlCode = item;
                menu.appendChild(item);
            }

        }

        this.htmlCode = menu;

        return this.htmlCode;
    }


    /** Class SubMenu */

    function SubMenu(id, className, name, items) {
        // Имя класса передаю для предотвращения ошибки, затем переписываю его заново
        Menu.call(this, id, className, items);
        this.className = "sub-menu ";
        this.name = name;
        this.className += className;
    }

    SubMenu.prototype = Object.create(Menu.prototype);
    SubMenu.prototype.constructor = SubMenu;


    /** Class MenuItem*/

    function MenuItem(href, name) {
        Container.call(this);
        this.className = 'menu__item';
        this.href = href;
        this.name = name;
    }

    MenuItem.prototype = Object.create(Container.prototype);
    MenuItem.prototype.constructor = MenuItem;
    MenuItem.prototype.render = function () {
        var item = document.createElement('li');
        var link = document.createElement('a');

        link.setAttribute('href', this.href);
        link.innerText = this.name;
        item.classList.add(this.className);
        item.appendChild(link);

        this.htmlCode = item;

        return this.htmlCode;
    }


    /** Function createItemsMenu*/

    function createItemsMenu(links) {
        var subItems, items = [];

        for (var i in links) {
            if (!links[i].children) {
                items.push(new MenuItem(links[i].href, links[i].name));
            } else {
                subItems = createItemsMenu(links[i].children);
                items.push(new SubMenu('', '', links[i].name, subItems));
            }
        }

        return items;
    }
}


