import { Container, Tooltip, Whisper } from "rsuite";

type CustomTooltipType = {
  message: string;
  children: any;
};

const CustomTooltip = ({ message, children, ...rest }: CustomTooltipType) => {
  return (
    <Container>
      <Whisper speaker={<Tooltip>{message}</Tooltip>} {...rest}>
        {children}
      </Whisper>
    </Container>
  );
};

export default CustomTooltip;
