import { TagPicker as SuiteTagPicker } from "rsuite";
import { useLocalStorage } from "usehooks-ts";

const TagPicker = ({ ...rest }: { rest: any }) => {
  const [data, setValue] = useLocalStorage<Array<Object>>("task-tags", []);

  return (
    <SuiteTagPicker
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
