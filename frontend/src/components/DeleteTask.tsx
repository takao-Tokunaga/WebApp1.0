'use client'

import { IconButton, Tooltip } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_TASK } from "../mutations/taskMutations";
import { useMutation } from "@apollo/client";
import { GET_TASKS } from "../queries/taskQueries";
import { useRouter } from 'next/navigation';

const DeleteTask = ({ id, userId }: { id: number, userId: number}) => {
  const [deleteTask] = useMutation<{deleteTask: number}>(DELETE_TASK);
  const router = useRouter();
  const handleDeleteTask = async () => {
    try {
      await deleteTask({
        variables: { id },
        refetchQueries: [{query: GET_TASKS, variables: {userId}}],
      });
      alert('タスクが削除されました');
    } catch(err: any) {
      if (err.message === 'Unauthorized') {
        localStorage.removeItem('token');
        alert('トークンの有効期限が切れました。サインイン画面に遷移します。');
        router.push('/signin');
    }
    alert('タスクの削除に失敗しました');

 }
 }
    

    return (
        <div>
          <Tooltip title='削除'>
            <IconButton onClick={handleDeleteTask}>
             <DeleteIcon color='action' />
            </IconButton>
          </Tooltip>
        </div>
    )
}

export default DeleteTask