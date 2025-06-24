import { auth } from '../firebase/config';

const Message = ({ data }) => {
  // eğer oturumu açık olan kişinin idwsi mesajı atan
  // kişinin idsini eşitse ekrana bunu basacak
  if (auth.currentUser.uid === data.author.uid) {
    return <p className="msg-user">{data.text}</p>;
  }

  
  // değilse bunu bas
  return (
    <div className="msg-other">
      <p className="user-info">
        <img src={data.author.photo} />
        <span>{data.author.name}</span>
      </p>

      <p className="msg-text">{data.text}</p>
    </div>
  );
};

export default Message;