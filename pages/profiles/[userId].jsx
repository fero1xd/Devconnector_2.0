import ProfileTop from '../../components/Profile/ProfileTop';
import ProfileAbout from '../../components/Profile/ProfileAbout';
import ProfileExperience from '../../components/Profile/ProfileExperience';
import ProfileEducation from '../../components/Profile/ProfileEducation';
import ProfileGithub from '../../components/Profile/ProfileGithub';
import Link from 'next/link';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

const Profile = ({ user, profileData }) => {

    return (
        <>
            <section className='container'>

                <Link href='/profiles' className='btn btn-light'>
                    Back To Profiles
                </Link>
                {user && profileData &&
                    user._id === profileData.user._id && (
                        <Link href='/edit-profile' className='btn btn-dark'>
                            Edit Profile
                        </Link>
                    )}

                {profileData ? <>

                    <div className='profile-grid my-1'>
                        <ProfileTop profile={profileData} />
                        <ProfileAbout profile={profileData} />
                        <div className='profile-exp bg-white p-2'>
                            <h2 className='text-primary'>Experience</h2>
                            {profileData.experience.length > 0 ? (
                                <>
                                    {profileData.experience.map((experience) => (
                                        <ProfileExperience
                                            key={experience._id}
                                            experience={experience}
                                        />
                                    ))}
                                </>
                            ) : (
                                <h4>No experience credentials</h4>
                            )}
                        </div>

                        <div className='profile-edu bg-white p-2'>
                            <h2 className='text-primary'>Education</h2>
                            {profileData.education.length > 0 ? (
                                <>
                                    {profileData.education.map((education) => (
                                        <ProfileEducation
                                            key={education._id}
                                            education={education}
                                        />
                                    ))}
                                </>
                            ) : (
                                <h4>No education credentials</h4>
                            )}
                        </div>
                        {profileData.githubusername && (
                            <ProfileGithub username={profileData.githubusername} />
                        )}
                    </div>


                </> : <>

                    <h4>No Profile for this User yet</h4>

                </>}

            </section>
        </>

    );
};

export const getServerSideProps = async ctx => {
    try {

        const { userId } = ctx.query;


        const { data } = await axios.get(`${baseUrl}/api/profile/user/${userId}`);

        return { props: { profileData: data } }
    } catch (error) {
        return { props: { errorLoading: true } }
    }
}
export default Profile;
