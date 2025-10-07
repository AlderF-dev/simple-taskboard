import { TagPicker as SuiteTagPicker } from "rsuite";
import { useGetTags } from "../../Hooks/Tags/useGetTags";
import { useQueryClient } from "@tanstack/react-query";

type TagPickerProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
};

const TagPicker = ({
  value = [],
  onChange = () => {},
  ...rest
}: TagPickerProps) => {
  const { data: tags, isLoading } = useGetTags();
  const queryClient = useQueryClient();

  // Called when user creates a new tag in the UI
  const handleCreate = (label: string) => {
    const cleanLabel = label.trim();
    if (!cleanLabel) return;

    onChange([...value, cleanLabel]);
  };

  return (
    !isLoading && (
      <SuiteTagPicker
        data={tags}
        value={value}
        onChange={onChange}
        onCreate={(value, item) => handleCreate(item.label)}
        loading={isLoading}
        style={{ width: 300 }}
        menuStyle={{ width: 300 }}
        {...rest}
      />
    )
  );
};

export default TagPicker;
