<template>
    <div class="about__container container">
      <div class="about__text">
        <p>
          Веб-додаток "Contact.me" — це інтуїтивно зрозумілий інструмент для організації вашої адресної книги. Завдяки йому, керування контактами стає не лише простішим, але й ефективнішим. Ознайомтесь з ключовими можливостями, які ми пропонуємо:
        </p>
        <ul class="about__list">
          <li><span class="material-icons">visibility</span> <strong>Перегляд контактів:</strong> Отримайте доступ до всіх збережених даних — імен, телефонів та інших деталей ваших контактів.</li>
          <li><span class="material-icons">person_add</span> <strong>Додавання контактів:</strong> Легко додайте нові контакти, заповнивши їхні основні відомості, такі як ім'я та телефон.</li>
          <li><span class="material-icons">delete</span> <strong>Видалення контактів:</strong> Ви маєте можливість видалити будь-який контакт, якщо він більше не актуальний або потрібен.</li>
          <li><span class="material-icons">edit</span> <strong>Редагування контактів:</strong> Оновіть інформацію про контакти в будь-який час — змініть номер телефону, додайте примітку або вкажіть нову адресу.</li>
          <li><span class="material-icons">sort</span> <strong>Сортування контактів:</strong> Організуйте свої контакти за пріоритетністю, іменем або іншим критерієм для зручнішого доступу.</li>
        </ul>
        <p>
          "Contact.me" робить управління вашими контактами не лише зручним, а й приємним процесом. Ми прагнемо зробити ваше спілкування легким та ефективним.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AboutPage"
  };
  </script>
  
  <style scoped>
  .about__container {
    padding: 40px 15px;
  }
  
  .about__text {
    margin-bottom: 20px;
  }
  
  .about__list {
    list-style: none;
    padding-left: 0;
  }
  
  .about__list li {
    margin-bottom: 10px;
  }
  
  .material-icons {
    vertical-align: middle;
    margin-right: 5px;
  }
  </style>
  