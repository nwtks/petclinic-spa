/* eslint-disable react/jsx-key */
import h from '@nwtks/vnoc';

const Messages = (props) => {
  const { messages } = props;
  const showMessages = messages && messages.length;
  return (
    <section>
      {showMessages
        ? messages.map((m) => (
            <div class='alert alert-warning' role='alert'>
              {m}
            </div>
          ))
        : null}
    </section>
  );
};

export default Messages;
