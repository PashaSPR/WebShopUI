// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { format } from 'date-fns';

// function CommentsList({ goodsId }) {
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     axios.get(`http://localhost:8080/comments/goods/${goodsId}`)
//       .then(response => {
//         setComments(response.data);
//         // console.log('good.name' , comments[0].good.name)
//       })
//       .catch(error => {
//         console.error('Error fetching comments:', error);
//       });
//   }, [goodsId]);

//   return (
//     <div>
//       <h2>Comments for Goods: {comments.length > 0 ? comments[0].good.name : 'No comments'}</h2>
//       <ul className="comment-list">
//         {comments.map(comment => (
//           <li key={comment.id} className="comment-item">
//             <p className="comment-date">
//               Date: {format(new Date(comment.date_comment), 'dd-MM-yyyy')}
//             </p>
//             {comment.usersListsId && (
//               <p className="comment-author">
//                 Author: {comment.usersListsId.nickname}
//               </p>
//             )}
//             <p className="comment-text">{comment.comment}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CommentsList;


/////////////////////////////////////////////////////////////////////////


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Rating } from '@mui/material';

function CommentsList({ goodsId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/comments/goods/${goodsId}`)
      .then(response => {
        setComments(response.data);
        // console.log('good.name' , comments[0].good.name)
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [goodsId]);

  return (
    <div>
      <h2>Коментарі для товару: {comments.length > 0 ? comments[0].good.name : 'No comments'}</h2>

      <ul className="comment-list">
        {comments.map(comment => (
          <li key={comment.id} className="comment-item">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {comment.usersListsId && (
                <p className="comment-author">
                  Автор: {comment.usersListsId.nickname}
                </p>
              )}
              <p className="comment-date" style={{ textAlign: 'right' }}>
                Дата: {format(new Date(comment.date_comment), 'dd-MM-yyyy')}
              </p>
            </div>

            <p>
              <Rating readOnly
                value={comment.evaluation}
              />
            </p>

            <p className="comment-text">{comment.comment}</p>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default CommentsList;