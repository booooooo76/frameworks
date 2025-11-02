// Оновлений інтерфейс, що відповідає API
export interface Participant {
  id: number;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  avatar: string;
}

// Тип для створення нового юзера (згідно з POST /users)
export type CreateParticipantDto = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

// Тип для оновлення юзера (згідно з PUT /users/{id})
// Використовуємо Partial, оскільки можна оновлювати лише частину полів
export type UpdateParticipantDto = Partial<{
  name: string;
  email: string;
  role: 'customer' | 'admin';
  avatar: string;
  // Пароль зазвичай оновлюється окремим ендпоінтом, тому тут його немає
}>;