import Link from 'next/link';

const DashboardActions = () => {
  return (
    <div class='dash-buttons'>
      <i class='fas fa-user-circle text-primary'></i>
      <Link href='edit-profile' class='btn btn-light'>
        Edit Profile
      </Link>
      <i class='fab fa-black-tie text-primary'></i>
      <Link href='add-experience' class='btn btn-light'>
        Add Experience
      </Link>
      <i class='fas fa-graduation-cap text-primary'></i>
      <Link href='add-education' class='btn btn-light'>
        Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
