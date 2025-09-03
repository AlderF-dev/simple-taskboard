import { useToaster } from "rsuite";
import Toast from "../Components/Toast";
import { PlacementType } from "rsuite/esm/toaster/ToastContainer";

export function useDispatchToast() {
  const toaster = useToaster();

  function dispatchToast(
    type: string,
    message: string,
    placement: PlacementType = "topEnd",
    duration: number = 5000
  ) {
    toaster.push(<Toast type={type} message={message} />, {
      placement,
      duration,
    });
  }

  return dispatchToast;
}
