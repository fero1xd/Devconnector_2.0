import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';
import baseUrl from '../utils/baseUrl';
import { redirectUser } from '../utils/authUser';
import Layout from './../components/Layout/Layout';
import 'react-toastify/dist/ReactToastify.css';

const MyApp = ({ Component, pageProps }) => {
    return (
        <Layout {...pageProps}>
            <Component  {...pageProps} />
        </Layout>
    )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    const { token } = parseCookies(ctx);
    let pageProps = {};

    const protectedRoutes =
        ctx.pathname === '/dashboard' ||
        ctx.pathname === '/create-profile' ||
        ctx.pathname === '/edit-profile' ||
        ctx.pathname === '/add-experience' ||
        ctx.pathname === '/add-education' ||
        ctx.pathname === '/posts' ||
        ctx.pathname === '/posts/[postId]'


    const freeForAllRoutes = ctx.pathname === '/profiles' || ctx.pathname === '/profiles/[userId]'

    const routesForGuests = ctx.pathname === '/login' || ctx.pathname === '/register' || ctx.pathname === '/'

    if (!token) {
        if (protectedRoutes) {
            return redirectUser(ctx, '/login');
        }

        if (!freeForAllRoutes && !routesForGuests) {
            return redirectUser(ctx, '/login');
        }

    } else {
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        try {
            const {
                data: { user },
            } = await axios.get(`${baseUrl}/api/users/`, {
                headers: { Authorization: token },
            });

            if (user) !protectedRoutes && !freeForAllRoutes && redirectUser(ctx, '/dashboard');

            pageProps.user = user;
        } catch (error) {
            destroyCookie('token');
            redirectUser(ctx, '/login');
        }
    }
    return { pageProps };
};

export default MyApp;
