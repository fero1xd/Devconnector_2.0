import Link from 'next/link';
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import DashboardActions from '../components/Dashboard/DashboardActions';
import Experience from '../components/Dashboard/Experience';
import Education from '../components/Dashboard/Education';
import { deleteUser } from '../utils/authUser';


const Dashboard = ({ profileData, user }) => {

    return (
        <section className="container">
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome {user && user.name}
            </p>
            {profileData !== null ? (
                <>
                    <DashboardActions />
                    <Experience experience={profileData.experience} />
                    <Education education={profileData.education} />
                    <div className="my-2">
                        <button className="btn btn-danger" onClick={() => deleteUser()}>
                            <i className="fas fa-user-minus" /> Delete My Account
                        </button>
                    </div>

                </>
            ) : (
                <>
                    <div className="my-2">
                        <button className="btn btn-danger" onClick={() => deleteUser()}>
                            <i className="fas fa-user-minus" /> Delete My Account
                        </button>
                    </div>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link href="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </>
            )}
        </section>
    );

};

Dashboard.getInitialProps = async ctx => {
    try {
        const { token } = parseCookies(ctx);

        const { data } = await axios.get(`${baseUrl}/api/profile/me`, {
            headers: { Authorization: token }
        });

        return { profileData: data }

    } catch (error) {
        return { errorLoading: true }
    }
}

export default Dashboard;
