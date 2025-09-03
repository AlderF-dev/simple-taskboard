import { Message } from "rsuite";

const Toast = ({ type, message, ...rest }) => {
  return (
    <Message showIcon type={type} closable {...rest}>
      {message}
    </Message>
  );
};

export default Toast;
