import React, { useState, useEffect } from 'react';

const ListFriend = () => {
   const [user, setUser] = useState(null);
   const [posts, setPosts] = useState([]);
   const [friends, setFriends] = useState([]);
   const [allUsers, setAllUsers] = useState([]);
   const [unmatchedFriends, setUnmatchedFriends] = useState([]);
   const [unmatchedUsers, setUnmatchedUsers] = useState([]);
   
   useEffect(() => {
      // Retrieve the logged-in user from localStorage
      const storedUser = localStorage.getItem("user");
  
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

   useEffect(() => {
      fetch('http://localhost:3000/user')
         .then((response) => response.json())
         .then((data) => {
            const filteredPosts = data.filter(post => post.id !== user?.id);
            setPosts(filteredPosts);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, [user]);

   const getFriend = () => {
      if (user) {
         fetch(`http://localhost:3000/user/${user.id}/friends`)
            .then((response) => response.json())
            .then((data) => {
               setFriends(data);
            })
            .catch((err) => {
               console.log(err.message);
            });
      }
   };

   useEffect(() => {
      getFriend();
   }, [user]);

   useEffect(() => {
      fetch("http://localhost:3000/user")
         .then((response) => response.json())
         .then((data) => {
            setAllUsers(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

   useEffect(() => {
      if (allUsers.length > 0 && friends.length > 0) {
         const unmatched = friends.filter(friend => !allUsers.some(user => user.id === friend.friendId));
         setUnmatchedFriends(unmatched);
         
         const unmatchedUsers = allUsers.filter(user => !friends.some(friend => friend.friendId === user.id));
         setUnmatchedUsers(unmatchedUsers);
      }
   }, [allUsers, friends]);

   const addFriend = (friendId) => {
      fetch(`http://localhost:3000/friends`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            userId: user.id,
            friendId: friendId,
         }),
      })
         .then((response) => response.json())
         .then((data) => {
            // After successfully adding the friend, remove them from the list
            setPosts(posts.filter(post => post.id !== friendId));
         })
         .catch((err) => {
            console.log(err.message);
         });
   };

   return (
      <div className="ListFriend">
         <div className="friends-container">
            {unmatchedUsers.map((user) => {
               return (
                  <div className="friend-card" key={user.id}>
                     <img style={{ width: "50px", height: "50px", borderRadius: "50px", marginLeft: "80px" }} src={user.imagePost} alt="" />
                     <p className="friend-body">{user.username}</p>
                     <div className="button">
                        <div className="friend-Add-btn" onClick={() => addFriend(user.id)}>Add friend</div>
                     </div>
                  </div>
                  
               );
            })}
         </div>
      </div>
   );
}

export default ListFriend;


// import React, {useEffect, useState} from 'react'

// const ListFriend = () => {
//    const [user, setUser] = useState(null);
//    const [posts, setPosts] = useState([]);

//    useEffect(() => {
//             // Retrieve the logged-in user from localStorage
//             const storedUser = localStorage.getItem("user");
        
//             if (storedUser) {
//               setUser(JSON.parse(storedUser));
//             }
//           }, []);

//           console.log(user)

//    useEffect(() => {
//       fetch('http://localhost:3000/user')
//          .then((response) => response.json())
//          .then((data) => {
//             console.log(data);
//             setPosts(data);
//          })
//          .catch((err) => {
//             console.log(err.message);
//          });
//    }, []);
//   return (
//     <div>
//        <div className="ListFriend">
//       {posts.map((post) => {
//          return (
//             <div className="friend-card" key={post.id}>
//                <h2 className="post-title">{post.username}</h2>
//                <div className="button">
//                <div className="delete-btn">Delete</div>
//                </div>
//             </div>
//          );
//       })}
//    </div>
//     </div>
//   )
// }

// export default ListFriend
