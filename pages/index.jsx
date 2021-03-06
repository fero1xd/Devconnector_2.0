import Link from 'next/link';


const Landing = () => {


    return (
        <section className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 className='x-large'>Developer Connector</h1>
                    <p className='lead'>
                        Create a developer profile/portfolio, share posts and get help from
                        other developers
                    </p>
                    <div className='buttons'>
                        <Link href='/register' className='btn btn-primary'>
                            Sign Up
                        </Link>
                        <Link href='/login' className='btn btn-light'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing
