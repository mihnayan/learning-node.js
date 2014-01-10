#Записки в процессе изучения node.js

##Объект exports

Объект `exports` используется для экспортирования функций модуля. Например, в модуле `server.js` объявляем функцию `start` и экспортируем ее под этим же именем:

	//server.js
	function start(route) {
		// some code...
	}
	
	exports.start = start;

Тогда в модуле, например, `index.js` можно подключив модуль `server.js` использовать функцию `start`:

	//index.js
	var server = require("./server");
	
	server.start(router);

При этом здесь используется не имя функции в модуле `server.js`, а имя, используемое при определении в объекте `exports`. Например, если бы в модуле `server.js` было бы записано:

	exports.run = start;

то в модуль `index.js` следовало бы изменить следующим образом:

	//index.js
	var server = require("./server");
	
	server.run(router);

То есть, при этом в строке `server.run(router)` вызывается функция `start()` модуля `server.js`.