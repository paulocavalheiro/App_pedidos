import { useState } from 'react';
import { SnackType } from '../mui_component/SnackBarAlert';

export const useSnackBar = (): [SnackType, (newState: SnackType) => void] => {
  const [snackMessage, setSnackMessage] = useState<SnackType>({
    show: false,
    msg: null,
    type: null,
  });

  return [snackMessage, setSnackMessage];
};