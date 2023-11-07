const handleSaveCategoryName = async (categoryId, editedCategoryName) => {
    // Отримуємо нову назву Категорії товару зі стану `editedCategoryName`

    try {
      // Виконаємо запит до сервера для оновлення назви Категорії товару
      const response = await fetch(`http://localhost:8080/categoriesGoods/editCategory`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: categoryId,
          name: editedCategoryName, // Використовуємо зміну `newCategoryName`
        }),
      });

      if (response.ok) {
        console.log('Назву товару успішно змінено');
        // setAppointCategoryNameModalOpen(false);
      } else {
        // Обробка помилки від сервера
        console.error('Помилка при оновленні назви товару:', response.statusText);
      }
    } catch (error) {
      // Обробка помилок під час взаємодії з сервером
      console.error('Помилка при взаємодії з сервером:', error);
    }
  };
