# Project "Drones online store" | Проєкт "Онлайн магазин дронів"

## Навігація
- [Склад команди | Team members | Developers](#склад-команди--team-members--developers)
- [Стиль написання коду | Style of code writing](#стиль-написання-коду--style-of-code-writing)
- [Архітектура проєкту | Project architecture](#архітектура-проєкту--project-architecture)
- [Pages Description / Опис сторінок](#pages-description--опис-сторінок)


## Склад команди | Team members | Developers

- [Ващенко Артем](https://github.com/VashchenkoArtem)  |  [Vashchenko Artem - Teamlead](https://github.com/VashchenkoArtem)
- [Коцаба Анастасія](https://github.com/AnastasiiaKotsaba)  |  [Kotsaba Anastasiia](https://github.com/AnastasiiaKotsaba)
- [Харлан Кирило](https://github.com/KirillKharlan)  |  [Kharlan Kyrylo](https://github.com/KirillKharlan)

## Стиль написання коду | Style of code writing

- Підкреслюємо, що проект використовує сувору типізацію. | We use strict typing across the entire project.
- Стандарт для сучасного React — використання функціональних компонентів та хуків. | We use functional components with hooks (no class components).



## Архітектура проєкту | Project architecture
  - *src* - Створення та налаштування додатків | Creating application and settings 
    <details>
      <summary><strong>Pages</strong></summary>
      <ul>
        <details>
        <summary><strong> About - Сторінка з інформацією про нас | About Us page </strong></summary>
        <ul>
            <li>about.module.css</li>
            <li>about.tsx</li>
            <li>index.tsx</li>
        </ul>
        </details>
        <details>
        <summary><strong> Home-Page - Головна сторінка проєкту | Project Home page </strong></summary>
        <ul>
            <li>home-page.module.css</li>
            <li>home-page.tsx</li>
            <li>index.tsx</li>
        </ul>
        </details>
      </ul>
    </details>
    <details>
      <summary><strong>App</strong></summary>
      <ul>
        <details>
            <summary><strong>Layout</strong></summary>
            <ul>
                <li>layout.module.css</li>
                <li>layout.tsx</li>
                <li>index.tsx</li>
            </ul>
        </details>
        <li>app-route.tsx</li>
        <li>App.tsx</li>
      </ul>
    </details>
  - *.gitignore*- Файли, які не додаються в commit | Files that are not attached to commit
  - *package-lock.json* і *package.json* - Налаштування проєкту | Project settings
    

## Pages Description / Опис сторінок

Цей проєкт складається з двох основних сторінок: | This project consists of two main pages:


### 1. Main Page / Головна сторінка
  - Точка входу в додаток. Містить загальний огляд проєкту, ключові функції та навігаційні посилання. | The entry point of the application. It contains a general overview of the project, key features, and navigation links.

### 2. About Us / Про нас
  - Окрема сторінка з інформацією про нас, нашу мету та нашу команду. Вона описує наші основні цілі та команду. | A dedicated page with information about us, our mission, and our team. It highlights our core values and the people behind the project.

### 3. Catalog / Каталог
  - Список усіх доступних товарів із можливістю фільтрації та сортування для зручного пошуку. | A list of all available products with filtering and sorting capabilities for easy searching.

### 4. Product Page / Сторінка товару
  - Детальна інформація про конкретний товар, включаючи опис, характеристики, ціну та фотографії. | Detailed information about a specific product, including description, specifications, price, and photos.

### 5. Cart / Кошик
  - Список обраних товарів, де користувач може змінити їх кількість або видалити позиції перед оформленням. | A list of selected products where the user can change quantities or remove items before checkout.

### 6. Order (Checkout) / Замовлення
  - Сторінка оформлення покупки, де користувач вказує дані для доставки та обирає спосіб оплати. | The checkout page where the user provides shipping details and selects a payment method.

### 7. Contacts / Контакти
  - Інформація для зв'язку з нами: адреса, номер телефону, електронна пошта та форма зворотного зв'язку. | Contact information: address, phone number, email, and a feedback form.

### 8. Profile (Account) / Кабінет (Акаунт)
  - Персональний розділ користувача з історією замовлень, налаштуваннями профілю та збереженими даними. | A personal section for the user with order history, profile settings, and saved data.

### 9. Login / Авторизація
  - Форма для входу в існуючий акаунт за допомогою пошти, номера телефону або соціальних мереж. | A login form to access an existing account using email, phone number, or social media.

### 10. Registration / Реєстрація
  - Сторінка для створення нового облікового запису, де користувач вводить свої персональні дані для доступу до сервісу. | A page for creating a new account where the user enters their personal data to access the service.
