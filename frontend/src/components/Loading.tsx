// src/components/Loading.tsx
import { CircularProgress, Stack } from '@mui/material'

const Loading = () => {
  return (
    <Stack alignItems="center" mt={4}>
      <CircularProgress />
    </Stack>
  )
}

export default Loading;
