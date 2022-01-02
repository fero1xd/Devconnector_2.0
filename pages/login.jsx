import { useEffect, useState } from 'react'
import Link from 'next/link'
import { loginUser } from '../utils/authUser'
import cookie from 'js-cookie';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const { email, password } = formData

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        const isUser = Object.values({ email, password }).every((item) =>
            Boolean(item)
        );
        isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
    }, [formData]);

    useEffect(() => {
        document.title = 'Welcome Back';
        const userEmail = cookie.get('email');
        if (userEmail) setFormData((prev) => ({ ...prev, email: userEmail }));
    }, []);


    const onSubmit = async (e) => {
        e.preventDefault();

        await loginUser(email, password);
    }

    return (
        <>
            <section className='container'>


                <h1 className='large text-primary'>Sign In</h1>
                <p className='lead'>
                    <i className='fas fa-user'></i> Sign into Your Account
                </p>
                <form className='form' onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='email'
                            placeholder='Email Address'
                            name='email'
                            required
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <input type='submit' className='btn btn-primary' value='Login' disabled={submitDisabled} />
                </form>
                <p className='my-1'>
                    Don't have an account? <Link href='register'>Sign Up</Link>
                </p>
            </section>
        </>
    )
}

export default Login
