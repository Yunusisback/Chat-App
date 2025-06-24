import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useEffect, useState } from 'react';
import Message from "../components/message";
 // EKSİK OLAN IMPORTU EKLEYİN

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);
  const messagesCol = collection(db, 'messages');

  // ODADAKİ MESAJLARI ALMAK İÇİN SORGUMUZ
  const queryOptions = query(
    messagesCol,
    where('room', '==', room),
    orderBy('createdAt', 'asc')
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;

    await addDoc(messagesCol, {
      text,
      room,
      author: {
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    e.target.reset();
  };

  useEffect(() => {
    const unsub = onSnapshot(queryOptions, (snapshot) => {
      const tempMsg = [];
      snapshot.docs.forEach((doc) => tempMsg.push({ id: doc.id, ...doc.data() }));
      setMessages(tempMsg);
    });

    return () => unsub();
  }, [room]); // room değiştiğinde yeniden abone olmak için

  return (
    <div className="chat-page">
      <header>
        <p>{auth?.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <main>
        {messages.map((data) => (
          <Message data={data} key={data.id} />
        ))}
      </main>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="mesajınızı yazınız..."
        />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;