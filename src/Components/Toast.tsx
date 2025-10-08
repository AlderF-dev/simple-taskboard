import { Message } from "rsuite";

type ToastType = {
  message: string;
  type: "info" | "success" | "warning" | "error";
};

const Toast = ({ type, message, ...rest }: ToastType) => {
  return (
    <Message showIcon type={type} bordered closable {...rest}>
      {message}
    </Message>
  );
};

export default Toast;
