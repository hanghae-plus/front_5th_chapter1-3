import { memo } from "../../hocs";
import { useFormReducer, useFormSubmit } from "../../hooks/form";
import { renderLog } from "../../utils";
import { Input } from "../common";
import { PreferenceCheckbox } from "./PreferenceCheckbox";
import { INPUT_FIELDS, PREFERENCES } from "./consts";
import { Button } from "../common";

export const ComplexForm: React.FC = memo(() => {
  renderLog("ComplexForm rendered");

  const { formData, handleInputChange, handlePreferenceChange } =
    useFormReducer();
  const { handleSubmit } = useFormSubmit();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">복잡한 폼</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {INPUT_FIELDS.map((field) => (
          <Input
            key={field.name}
            {...field}
            value={String(formData[field.name as keyof typeof formData])}
            onChange={handleInputChange}
          />
        ))}

        <div className="space-x-4">
          {PREFERENCES.map((pref) => (
            <PreferenceCheckbox
              key={pref}
              preference={pref}
              checked={formData.preferences.includes(pref)}
              onChange={() => handlePreferenceChange(pref)}
            />
          ))}
        </div>
        <Button type="submit">제출</Button>
      </form>
    </div>
  );
});
