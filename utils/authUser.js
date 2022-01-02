import axios from 'axios';
import baseUrl from './baseUrl';
import catchErrors from './catchErrors';
import Router from 'next/router';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';


export const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;


export const registerUser = async (formData) => {
    try {
        const { data: { token } } = await axios.post(`${baseUrl}/api/users`, formData);

        if (token) {
            setToken(token);
        }
    } catch (error) {
        const errormsg = catchErrors(error);
        toast.error(errormsg);
    }
}

export const loginUser = async (email, password) => {
    try {
        const { data: { token } } = await axios.post(`${baseUrl}/api/auth`, {
            email,
            password
        });

        if (token) {
            setToken(token);
        }

    } catch (error) {
        const errormsg = catchErrors(error);
        toast.error(errormsg);
    }
}


export const deleteUser = async () => {
    try {
        await axios.delete(`${baseUrl}/api/profile`, {
            headers: { Authorization: cookie.get('token') }
        });

        deleteUserFunc();
    } catch (error) {
        const errormsg = catchErrors(error);
        toast.error(errormsg);
    }
}

const setToken = (token) => {
    cookie.set('token', token, { expires: 730 });
    Router.push('/dashboard');
};

const deleteUserFunc = () => {
    cookie.remove('token');
    cookie.remove('email');
    Router.push('/login');
    Router.reload();
}

export const redirectUser = (ctx, location) => {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location });
        return ctx.res.end();
    } else {
        Router.push(location);
    }
};

export const logoutUser = (email, isOnFreeRoute) => {
    cookie.set('email', email);
    cookie.remove('token');
    if (!isOnFreeRoute) {
        Router.push('/login');
    }
    Router.reload();
}

