document.addEventListener('DOMContentLoaded', init);

function init() {
    "use strict";
    
    var items, menu, header;
    var links = [{
            href: '/',
            name: 'Главная'
        },
        {
            name: 'Статьи',
            children: [
                {
                    href: '/articles/web',
                    name: 'Web'
                },
                {
                    href: '/articles/bigdata',
                    name: 'Big data'
                },
                {
                    href: '/articles/ai',
                    name: 'Искуственный интелект'
                }
            ]
        },
        {
            href: '/about',
            name: 'О нас'
        },
        {
            href: '/contact',
            name: 'Контакты'
        }
    ];
    
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
        if(this.htmlCode){
            // Можно и просто remove на самом элементе, если не нужен IE11-
            this.htmlCode.parentElement.removeChild( this.htmlCode );
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
    
        if(this.id){
            menu.setAttribute('id', this.id);
        }
    
        for(var i in this.items){
            if (this.items[i] instanceof MenuItem){
                menu.appendChild( this.items[i].render() );
            } else if (this.items[i] instanceof SubMenu){
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
    
        for(var i in links){
            if(!links[i].children){
                items.push( new MenuItem(links[i].href, links[i].name) );
            }else{
                subItems = createItemsMenu(links[i].children);
                items.push( new SubMenu('', '', links[i].name, subItems) );
            }
        }
    
        return items;
    }
    
    
    // Переменные объявлены в начале
    items = createItemsMenu(links);
    menu = new Menu('mainMenu', 'header__menu', items);
    header = document.querySelector('.header');
    
    header.appendChild( menu.render() );
}


