import { Input, InputGroup } from "rsuite";
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import VisibleIcon from "@rsuite/icons/Visible";
import { useState } from "react";

const PasswordInput = ({ ...rest }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleChange = () => {
    setVisible(!visible);
  };

  return (
    <InputGroup inside>
      <Input {...rest} type={visible ? "text" : "password"} />
      <InputGroup.Button onClick={handleChange}>
        {visible ? <VisibleIcon /> : <EyeCloseIcon />}
      </InputGroup.Button>
    </InputGroup>
  );
};

export default PasswordInput;
