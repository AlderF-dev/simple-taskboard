import { Container, Tooltip, Whisper } from "rsuite";

const CustomTooltip = ({ message, children, ...rest }) => {
  return (
    <Container>
      <Whisper speaker={<Tooltip>{message}</Tooltip>} {...rest}>
        {children}
      </Whisper>
    </Container>
  );
};

export default CustomTooltip;
