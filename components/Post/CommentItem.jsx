import Link from 'next/link'
import formatDate from '../../utils/formatDate';
import { deleteComment } from '../../utils/postActions';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  loggedUser,
  setComments
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <img className='round-img' src={avatar} alt='' />
        <h4>
          <Link href={`/profiles/${user}`}>
            {name}
          </Link>
        </h4>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>Posted on {formatDate(date)}</p>
        {user === loggedUser._id && (
          <button
            onClick={() => deleteComment(postId, _id, setComments)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
