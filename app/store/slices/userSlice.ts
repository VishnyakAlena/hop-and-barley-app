import { IOrder, IUserMock } from '@/app/types';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    users: IUserMock[];
    currentUser: IUserMock | null;
    isAuth: boolean;
}

// 🌟 Читаем базу данных из LocalStorage ПРЯМО при старте приложения
const getInitialUsers = (): IUserMock[] => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('mock_users_db');
        return saved ? JSON.parse(saved) : [];
    }
    return [];
};

const initialState: UserState = {
    users: getInitialUsers(), // 🌟 Исправлено: теперь подтягивается автоматически!
    currentUser: null,
    isAuth: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initUsersDB: (state, action: PayloadAction<IUserMock[]>) => {
            if (state.users.length === 0) {
                state.users = action.payload;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('mock_users_db', JSON.stringify(state.users));
                }
            }
        },

        registerNewUser: (state, action: PayloadAction<IUserMock>) => {
            const exists = state.users.some(u => u.email.toLowerCase() === action.payload.email.toLowerCase());
            if (!exists) {
                state.users.push({
                    ...action.payload,
                    orders: action.payload.orders || [] 
                });
                
                // Синхронизируем localStorage сразу
                if (typeof window !== 'undefined') {
                    localStorage.setItem('mock_users_db', JSON.stringify(state.users));
                }
            }
        },

        setUserProfile: (state, action: PayloadAction<{ id?: number; name: string | string[]; email: string; image: string; password?: string; role?: string }>) => {
            const email = action.payload.email.toLowerCase().trim();
            let existingUser = state.users.find(u => u.email.toLowerCase() === email);

            // Форматируем имя в строку, если пришел массив от split('@')
            const formattedName = Array.isArray(action.payload.name) ? action.payload.name[0] : action.payload.name;

            if (!existingUser) {
                // Авто-регистрация (например, для OAuth Google/GitHub)
                existingUser = {
                    id: action.payload.id || (state.users.length > 0 ? Math.max(...state.users.map(u => u.id)) + 1 : 1),
                    name: formattedName || "User",
                    email: email,
                    image: action.payload.image || "/images/icons/User_alt.svg",
                    phone: '', city: '', address: '', orders: [],
                };
                
                (existingUser as any).password = action.payload.password || '123456';
                state.users.push(existingUser);
                localStorage.setItem('mock_users_db', JSON.stringify(state.users));
            } else {
                existingUser.image = action.payload.image || existingUser.image || "/images/icons/User_alt.svg";
                if (action.payload.password) {
                    (existingUser as any).password = action.payload.password;
                }
            }

            // Восстановление кастомных полей профиля
            const savedData = localStorage.getItem(`user_fields_${email}`);
            if (savedData) {
                const parsed = JSON.parse(savedData);
                existingUser.name = parsed.name || existingUser.name;
                existingUser.phone = parsed.phone || '';
                existingUser.city = parsed.city || '';
                existingUser.address = parsed.address || '';
            }

            state.currentUser = existingUser;
            state.isAuth = true;
        },

        updateUserPassword: (state, action: PayloadAction<{ email: string; newPassword: string }>) => {
            const user = state.users.find(u => u.email.toLowerCase() === action.payload.email.toLowerCase());
            if (user) {
                user.password = action.payload.newPassword;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('mock_users_db', JSON.stringify(state.users));
                }
            }
        },

        updateUserFields: (state, action: PayloadAction<{ name: string; phone: string; city: string; address: string }>) => {
            if (state.currentUser) {
                state.currentUser.name = action.payload.name;
                state.currentUser.phone = action.payload.phone;
                state.currentUser.city = action.payload.city;
                state.currentUser.address = action.payload.address;

                const dbUserIndex = state.users.findIndex(u => u.email === state.currentUser?.email);
                if (dbUserIndex !== -1) {
                    state.users[dbUserIndex] = state.currentUser;
                }

                if (typeof window !== 'undefined') {
                    localStorage.setItem(`user_fields_${state.currentUser.email}`, JSON.stringify(action.payload));
                    localStorage.setItem('mock_users_db', JSON.stringify(state.users));
                }
            }
        },

        addOrderToHistory: (state, action: PayloadAction<IOrder>) => {
            if (state.currentUser) {
                if (!state.currentUser.orders) {
                    state.currentUser.orders = [];
                }
                state.currentUser.orders.push(action.payload);
                const dbUserIndex = state.users.findIndex(u => u.email === state.currentUser?.email);
                if (dbUserIndex !== -1) {
                    state.users[dbUserIndex].orders = state.currentUser.orders;
                }
                if (typeof window !== 'undefined') {
                    localStorage.setItem('mock_users_db', JSON.stringify(state.users));
                }
            }
        },

        updateOrderStatus: (
            state, 
            action: PayloadAction<{ orderNumber: number; newStatus: IOrder['status'] }> // 🌟 УБРАЛИ email из параметров!
        ) => {
            const { orderNumber, newStatus } = action.payload;

            // 1. Иммутабельно перебираем ВСЕХ юзеров и обновляем нужный заказ по его уникальному номеру
            state.users = state.users.map(user => {
                const hasOrder = user.orders?.some(o => o.number === orderNumber);
                if (hasOrder) {
                    return {
                        ...user,
                        orders: user.orders.map(order => 
                            order.number === orderNumber ? { ...order, status: newStatus } : order
                        )
                    };
                }
                return user;
            });

            // 2. Также обновляем у текущего активного пользователя на экране, если это его заказ
            if (state.currentUser && state.currentUser.orders) {
                const hasOrder = state.currentUser.orders.some(o => o.number === orderNumber);
                if (hasOrder) {
                    state.currentUser.orders = state.currentUser.orders.map(order => 
                        order.number === orderNumber ? { ...order, status: newStatus } : order
                    );
                }
            }

            // 3. Железно сохраняем чистые обновленные данные в память браузера
            if (typeof window !== 'undefined') {
                localStorage.setItem('mock_users_db', JSON.stringify(state.users));
            }
        },

        clearUserProfile: (state) => {
            state.currentUser = null;
            state.isAuth = false;
        }
    }
});

export const { initUsersDB, registerNewUser, updateUserPassword, setUserProfile, updateUserFields, addOrderToHistory, updateOrderStatus, clearUserProfile } = userSlice.actions;
const selectUsersList = (state: { user: UserState }) => state.user.users;

export const allOrdersInfo = createSelector(
    [selectUsersList],
    (users) => {
        // Мы НЕ пишем console.log здесь, чтобы не спамить в консоль браузера
        if (!users || !Array.isArray(users)) return [];

        const allOrders: IOrder[] = [];
        
        // Проходим по каждому пользователю в локальной БД
        users.forEach(user => {
            if (user.orders && user.orders.length > 0) {
                // Копируем заказы иммутабельно, чтобы не мутировать исходный стейт
                allOrders.push(...user.orders);
            }
        });

        // 🌟 ВАЖНО: Метод .sort() мутирует исходный массив! 
        // В Redux Toolkit мутации внутри селекторов могут приводить к багам ссылочной идентичности.
        // Поэтому мы делаем копию через деструктуризацию [...allOrders] перед сортировкой:
        return [...allOrders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
);

export default userSlice.reducer;