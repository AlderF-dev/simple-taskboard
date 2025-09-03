import { TagPicker as SuiteTagPicker } from "rsuite";
import { useLocalStorage } from "usehooks-ts";

const TagPicker = ({ open, handleClose, ...rest }) => {
  const [data, setValue, removeValue] = useLocalStorage("task-tags", []);

  return (
    <SuiteTagPicker
      creatable
      data={data}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
      onCreate={(value, item) => {
        setValue([...data, item]);
      }}
      {...rest}
    />
  );
};

export default TagPicker;
