// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import CommentsList from './CommentsList';
// import AddCommentForm from './AddCommentForm';
// // import Viewonegoods from './Viewonegoods';
// import '../../css/styleComment.css';

// function Comments({ goodsId }) {
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     if (goodsId !== undefined) {
//       // Отримати список коментарів з сервера при завантаженні сторінки
//       axios.get(`/comments/goods/${goodsId}`)
//         .then(response => {
//           setComments(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching comments:', error);
//         });
//     }
//   }, [goodsId]);

//   const addComment = (newComment) => {
//     // Додати новий коментар до списку та відправити на сервер
//     axios.post('http://localhost:8080/comments', newComment)
//       .then(response => {
//         // Отримати оновлений список коментарів з сервера після успішного додавання
//         axios.get(`/comments/goods/${goodsId}`)
//           .then(response => {
//             setComments(response.data);
//           })
//           .catch(error => {
//             console.error('Error fetching comments:', error);
//           });
//       })
//       .catch(error => {
//         console.error('Error adding comment:', error);
//       });
//   };

//   return (
//     <div>
//       {/* <h1>Comments for Goods #{goodsId}</h1> */}
    
//       {/* <CommentsList goodsId={goodsId} comments={comments} />  */}
//       <AddCommentForm onAddComment={addComment} goodsId={goodsId} />
//     </div>
//   );
// }

// export default Comments;



/////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import CommentsList from './CommentsList';
import AddCommentForm from './AddCommentForm';
// import Viewonegoods from './Viewonegoods';
import '../../css/styleComment.css';

function Comments({ goodsId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (goodsId !== undefined) {
      // Отримати список коментарів з сервера при завантаженні сторінки
      axios.get(`/comments/goods/${goodsId}`)
        .then(response => {
          setComments(response.data);
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
    }
  }, [goodsId]);

  const addComment = (newComment) => {
    // Додати новий коментар до списку та відправити на сервер
    axios.post('http://localhost:8080/comments', newComment)
      .then(response => {
        // Отримати оновлений список коментарів з сервера після успішного додавання
        axios.get(`/comments/goods/${goodsId}`)
          .then(response => {
            setComments(response.data);
          })
          .catch(error => {
            console.error('Error fetching comments:', error);
          });
      })
      .catch(error => {
        console.error('Error adding comment:', error);
      });
  };

  return (
    <div>
      {/* <h1>Comments for Goods #{goodsId}</h1> */}
    
      {/* <CommentsList goodsId={goodsId} comments={comments} />  */}
      <AddCommentForm onAddComment={addComment} goodsId={goodsId} />
    </div>
  );
}

export default Comments;