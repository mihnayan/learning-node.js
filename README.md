#Записки в процессе изучения node.js

##Объект exports и использование функций других модулей

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

Как видно, подключаемый модуль ассоциируется с переменной и теперь, используя эту переменную, можно вызывать функции, определенные в подключенном модуле. При этом используется не имя функции в модуле (в данном случае это модуль `server.js`), а имя, используемое при определении в объекте `exports`. Например, если бы в модуле `server.js` было бы записано:

	exports.run = start;

то модуль `index.js` следовало бы изменить следующим образом:

	//index.js
	var server = require("./server");
	
	server.run(router);

То есть, при этом в строке `server.run(router)` вызывается функция `start()` модуля `server.js`.

Точно также можно создать объект, если функция в подключенном модуле является конструктором объекта (то есть, все как обычно):

	var module = require("./module");
	var obj = new module.SomeObject(); 

###Варианты экспортирования функций
Инструкция для экспорта функции может быть указана не после всего кода, как приведено в примере выше: `exports.run = start`, но и непосредственно при объявлении функции:

	//server.js
	exports.run = function (route) {
		// some code...
	}

Еще одна возможность при экспортировании функций - это экспорт функции в корень модуля. То есть, в том же `server.js` можно описать экспорт следующим образом:

	//server.js
	module.exports = function (route) {
		// some code...
	}

Экспортированную таким образом функцию можно вызвать в другом модуле просто обратившись к имени переменной, с которой ассоциирован подключаемый модуль `server.js`:

	//index.js
	var server = require("./server");

	server(router);

###Ссылка
Подробнее про все нюансы работы с модулями - в документации, размещенной по адресу [http://nodejs.org/api/modules.html](http://nodejs.org/api/modules.html).

##Асинхронная обработка запросов
(Пункт составлен на основе статьи [Understanding the node.js event loop](http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/))
 
Весь код в Node.js исполняется в одном потоке, что исключает возможную перегрузку сервера, которая может создаваться тысячами потоками/процессами. Тем не менее, операции ввода/вывода (I/O) выполняются в node.js параллельно. Это позволяет реализовать асинхронную обработку запросов, основанную на событийной (event-based) модели, с применением функций обратного вызова (callback). В частности, именно такой метод рекомендуется применять при блокирующих операциях (долгие вычисления, запросы к базе данный и т.п.).

##Установка пакетов
Для установки новых пакетов в node.js используется менеджер пакетов `npm` (node.js package manager). В общем виде, для установки используется команда:

	$ npm install [module_name] 

В случае, если для работы пакет необходимы будут другие пакеты, то зависимости отобразятся при установке. Так, например, при установке шаблонизатора [Jade](http://jade-lang.com/) понадобилис дополнительные пакеты, которые отображались в следующем виде:

	jade@1.1.5 node_modules\jade
	|--commander@2.1.0
	|--character-parser@1.1.0
	|--mkdirp@0.3.5
	|--monocle@1.1.51 (readdirp@0.2.5)
	|--constantinople@1.0.2 (uglify-js@2.4.11)
	|--transformers@2.1.0 (promise@2.0.0, css@1.0.8, ulify-js@2.2.5)
	|--with@2.0.0 (uglify-js@2.4.0)

В этом списке после имени необходимого пакета в скобках указаны пакеты, от которых в свою очередь зависит указанный в списке.

Обзор модулей доступен на сайте [https://npmjs.org/](https://npmjs.org/).

##Относительно кодировки
Однажды понадобилось установить кодировку символов отличную от умалчиваемой (в методе `response.write()`).

[Вот ссылка на список кодировок](https://github.com/joyent/node/blob/5a5a98d0d8281f6901b7e9dac285d59ab3e39b95/lib/buffer.js#L126), которая найдена в [ответе на Stackoverflow.com](http://stackoverflow.com/questions/14551608/cant-find-encodings-for-node-js).
