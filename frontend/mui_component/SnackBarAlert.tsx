import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import type { AlertColor } from '@mui/material/Alert'
import { Dispatch, SetStateAction } from 'react'

/** definir estado no pai
 * const [snackMessage, setSnackMessage] = useState<SnackType>({
      show: false,
      msg: null,
      type: 'info',
   })
 */

export type SnackType = {
   show: boolean
   msg?: string | null
   type?: AlertColor | null
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
   props,
   ref
) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function SnackBarAlert(props: {
   setSnackMessage: Dispatch<SetStateAction<any>>
   params: SnackType
}) {
   
   const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
   ) => {
      if (reason === 'clickaway') {
         return
      }
      props.setSnackMessage({
         show: false,
         type: props?.params?.type,
         msg: null,
      })
   }

   return (
      <Stack spacing={2} sx={{ width: '100%' }}>
         <Snackbar
            open={props.params.show}
            autoHideDuration={6000}
            onClose={handleClose}
         >
            <Alert
               onClose={handleClose}
               severity={
                  props?.params?.type != null ? props?.params?.type : 'info'
               }
               sx={{ width: '100%' }}
            >
               {props.params.msg}
            </Alert>
         </Snackbar>
      </Stack>
   )
}

SnackBarAlert.defaultProps = {
   params: { show: false, msg: null, type: 'info' },
}
