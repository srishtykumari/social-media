import React, { useState, useEffect } from 'react'

const Friends = () => {
  const [user, setUser] = useState(null);
    const [friends, setFriends] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [matchedFriends, setMatchedFriends] = useState([]);


  // Retrieve the logged-in user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

    // Fetch the user's friends based on the user id
  useEffect(() => {
    getFriend();
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

  // Fetch all users from your API
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

  // Compare allUsers and friends to find matches
  useEffect(() => {
    if (allUsers.length > 0 && friends.length > 0) {
      const matched = allUsers.filter((user) =>
        friends.some((friend) => friend.friendId === user.id)
      );
      setMatchedFriends(matched);
    }
  }, [allUsers, friends]);


  // Function to handle friend removal
  const removeFriend = (friendId) => { 
   console.log('friendId:', friendId);
    fetch(`http://localhost:3000/user/${user.id}/friends/remove/${friendId}`, {
     method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the list of friends after removal
        const updatedFriends = friends.filter(
          (friend) => friend.friendId !== friendId
        );
        setFriends(updatedFriends);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

 useEffect(() => {
   getFriend();
   const storedFriends = localStorage.getItem("friends");
   if (storedFriends) {
     setFriends(JSON.parse(storedFriends));
   }
 }, [user]);
 



  return (
    <div>
      <div className="Friends">
      <div className="my-friends">
        {matchedFriends.map((friend) => {
          return (
            <div className="my-friends-card" key={friend.id}>
              <div className="friend-context">
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50px",
                    marginLeft: "80px",
                    marginTop: "35px",
                  }}
                  src={friend.imagePost}
                  alt=""
                />
                <p className="friends-name">{friend.username}</p>
              </div>
              <div className="button">
              <div
                  className="my-friend-btn"
                  onClick={() => removeFriend(friend.id)} 
                >
                  Remove
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  )
}

export default Friends
