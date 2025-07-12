import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from '@/route/router.jsx';
import AuthProvider from '@/context/authContext.jsx';
import { Provider } from 'react-redux';
import { store } from '@/redux/store/store.js';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </Provider>
);
