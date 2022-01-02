import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import ProfileItem from '../../components/Profiles/ProfileItem';

const Profiles = ({ profilesData, errorLoading }) => {
    return (
        <>
            <section className='container'>
                <h1 className='large text-primary'>Developers</h1>
                <p className='lead'>
                    <i className='fab fa-connectdevelop' /> Browse and connect with
                    developers
                </p>
                <div className='profiles'>
                    {profilesData.length > 0 ? (
                        profilesData.map((profile) => (
                            <ProfileItem key={profile._id} profile={profile} />
                        ))
                    ) : (
                        <h4>No profiles found...</h4>
                    )}
                </div>
            </section>
        </>
    );
}

export const getServerSideProps = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/api/profile/`)
        return { props: { profilesData: data } };
    } catch (error) {
        console.log(error);
        return { props: { errorLoading: true } }
    }
}

export default Profiles
