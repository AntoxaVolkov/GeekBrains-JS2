const express = require('express');
const bp = require('body-parser');
const path = require("path");
const cors = require('cors');

const app = express();

let last = 'Тестовое';
let users = [
	{
		name: 'Ivan',
		email: 'ivan@mail.ru',
		age: 22
	},
	{
		name: 'Alex',
		email: 'alex@mail.ru',
		age: 24
	}
];

const links = [
	{
		href: '/',
		name: 'Главная'
	},
	{
		name: 'Каталог',
		children: [
			{
				name: 'Книги',
				children: [
					{
						href: '/catalog/books/it',
						name: 'IT'
					},
					{
						href: '/catalog/books/business',
						name: 'Бизнес'
					},
					{
						href: '/catalog/books/psi',
						name: 'Психология'
					}
				]
			},
			{
				href: '/articles/journal',
				name: 'Журналы',
				children: [
					{
						href:'/catalog/journal/men',
						name:'Мужские журналы'
					},
					{
						href: '/catalog/journal/it',
						name: 'IT'
					},
					{
						href: '/catalog/journal/business',
						name: 'Бизнес'
					},
					{
						href: '/catalog/journal/science',
						name: 'Наука'
					}
				]
			},
			{
				href: '/articles/stationery',
				name: 'Канцтовары'
			}
		]
	},
	{
		href: '/promo',
		name: 'Промоакции'
	},
	{
		href: '/lk',
		name: 'Личный кабинет'
	},
	{
		href: '/contact',
		name: 'Контакты'
	}
];

app.use(cors());
app.use(express.static('public'));
app.use(bp.json());
app.use(bp.text());

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.get('/assets/:file', (req,res) => {
	res.sendFile(path.join(__dirname + '/public/' + req.params.file));
});

app.get('/getMessage', (req, res) => {
	res.send(`Последнее сообщение: ${last}`);
});

app.post('/sendMessage', (req, res) => {
	last = req.body;
	res.status(200).end();
});

app.get('/user/:id', (req, res) => {
	const user = users[req.params.id - 1];
	if (user) {
		res.send(JSON.stringify(user));
	} else {
		res.status(404);
		res.send({
			error: 'Пользователь не найден'
		});
	}
});

app.get('/user', (req, res) => {
	if (users.length > 0) {
		res.send(JSON.stringify(users));
	} else {
		res.status(404);
		res.send({
			error: 'Пользователи не найдены'
		});
	}
});

app.post('/user/', (req, res) => {
	const length = users.push(JSON.parse(req.body));
	res.status(200);
	res.send(String(length));
});

app.get('/nav', (req, res) => {
	if (users.length > 0) {
		res.send(JSON.stringify(links));
	} else {
		res.status(404);
		res.send({
			error: 'Навигация не найдена'
		});
	}
});

app.listen(3001, () => {
	console.log('Server start: localhost:3001')
});