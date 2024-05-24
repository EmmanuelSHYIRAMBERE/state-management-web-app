import { useState } from "react";
import "./EatAndSplit.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function EatAndSplit() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showedFriendToUpdate, setShowedFriendToUpdate] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((status) => !status);
    setSelectedFriend(null);
  }
  function handleShowUpdateFriend(friend) {
    setShowedFriendToUpdate((selected) =>
      selected?.id === friend?.id ? null : friend
    );
    setShowAddFriend(false);
    setSelectedFriend(false);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((selected) =>
      selected?.id === friend?.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(values) {
    setFriends(
      friends.map((friend) =>
        friend?.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + values }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  function handleRemoveFriend(user) {
    setFriends(friends.filter((friend) => friend?.id !== user?.id));
    setSelectedFriend(null);
  }

  return (
    <div className="eatandsplit">
      <div className="sidebar">
        {}
        <FriendsList
          friends={friends}
          showedFriendToUpdate={showedFriendToUpdate}
          onRemove={handleRemoveFriend}
          onSelect={handleSelection}
          onUpdate={handleShowUpdateFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          key={selectedFriend.id}
          onSplitBill={handleSplitBill}
          selectedFriend={selectedFriend}
        />
      )}
    </div>
  );
}

function FriendsList({
  friends,
  onRemove,
  onSelect,
  onUpdate,
  selectedFriend,
  showedFriendToUpdate,
}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onRemove={onRemove}
          onSelect={onSelect}
          onUpdate={onUpdate}
          selectedFriend={selectedFriend}
          showedFriendToUpdate={showedFriendToUpdate}
        />
      ))}
    </ul>
  );
}
function Friend({
  friend,
  onRemove,
  onSelect,
  onUpdate,
  selectedFriend,
  showedFriendToUpdate,
}) {
  const isSelected = selectedFriend?.id === friend?.id;
  const isPickedToUpdate = showedFriendToUpdate?.id === friend?.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 ? (
        <p className="red">
          You owe {friend.name} {friend.balance * -1}Rwf
        </p>
      ) : friend.balance > 0 ? (
        <p className="green">
          {friend.name} owes you {friend.balance}Rwf
        </p>
      ) : (
        <p className="">You and {friend.name} are even</p>
      )}
      <Button onClick={() => onSelect(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>

      <div className="update">
        {isPickedToUpdate ? (
          <FormUpdateFriend
            showedFriendToUpdate={showedFriendToUpdate}
            onCancel={onUpdate}
          />
        ) : (
          <>
            <Button onClick={() => onUpdate(friend)}>Update</Button>
            <Button onClick={() => onRemove(friend)}>Remove</Button>
          </>
        )}
      </div>
    </li>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name || !image) return;
    const id = crypto.randomUUID();

    const newFriend = {
      balance: 0,
      id,
      image: `${image}?=${id}`,
      name,
    };

    handleAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label>📸 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(event) => setImage(event.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}
function FormUpdateFriend({ showedFriendToUpdate, onCancel }) {
  const [name, setName] = useState(showedFriendToUpdate.name);
  const [image, setImage] = useState(showedFriendToUpdate.image);

  function handleSubmit(event) {
    event.preventDefault();

    if (!name || !image) return;
    // const id = crypto.randomUUID();

    // const newFriend = {
    //   balance: 0,
    //   id,
    //   image: `${image}?=${id}`,
    //   name,
    // };

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-update-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label>📸 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(event) => setImage(event.target.value)}
      />
      <div className="onUpdate">
        <Button>Update</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(event) {
    event.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(event) => setBill(Number(event.target.value))}
      />

      <label>🕴️ Your expenses</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(event) =>
          setPaidByUser(
            Number(event.target.value) > bill
              ? paidByUser
              : Number(event.target.value)
          )
        }
      />

      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s expenses</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who's paying</label>

      <select
        value={whoIsPaying}
        onChange={(event) => setWhoIsPaying(event.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
