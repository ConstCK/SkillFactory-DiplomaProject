Скопируйте проект к себе на ПК при помощи: git clone https://github.com/ConstantinKapanevs/SkillFactory-DiplomaProject.git
Откройте серверную часть проекта при помощи IDE (желательно использовать PyCharm): open -> backend/ директорию проекта
В открывшемся диалоговом окне выбираем директорию для виртуальной среды, интерпретатор, и файл с зависимостями (Предложенные по умолчанию).
Активируем виртуальное окружение (venv\scripts\activate), если оно не активировалось автоматически.
Или вручную выбираем интерпретатор (file-> settings -> Project: BackEnd -> Python Interpreter), создаем виртуальное окружение (python -m venv venv) и активируем его (venv\scripts\activate).
Если все зависимости проекта не установились автоматически, используем pip install -r requirements.txt в терминале.
В каталоге backend/project/project создаем файл .env и прописываем в нем SECRET_KEY = Сгенерированный ключ
Ключ для Django можно сгенерировать по пути https://djecrety.ir/
Запускаем сервер из каталога project (python manage.py runserver)
Доступ к DRF API Root http://127.0.0.1:8000/api/

Открываем frontend директорию в IDE (рекомендуется при помощи VSCode).
В терминале устанавливаем зависимости (npm i)
Запускаем наш проект (npm start)

Примечания для проверяющего ментора:
Логин и Пароль к панели администрирования: admin
Пароль для всех зарегистрированных пользователей: user1234
Для тестирования прав доступа созданы:
Клиенты: AO_Zander, IP_Trudnikov, OOO_FPK21, OOO_Komplekt_Postavka, OOO_MNS77, OOO_RMK, OOO_Ranskiy_LPH
Сервисные компании: OOO_FNS, OOO_Promyshlennaya_Technika, OOO_Silent
Менеджеры: SuperManager
