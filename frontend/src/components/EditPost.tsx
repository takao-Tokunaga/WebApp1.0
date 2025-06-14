'use client';

import { useState } from 'react';
import { Post } from '@/types/post';
import { UPDATE_POST } from '@/mutations/postMutations';
import { GET_POST } from '@/queries/postQueries';
import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { PostStatus } from '@/types/postStatus';

export default function EditPost({ post, userId }: { post: Post, userId: number}) {
  const router = useRouter();
  const [open, setOpen] = useState(false); //モーダルの開閉
  const [type, setType] = useState(post.type); //編集フォームの内容を保持。
  const [description, setDescription] = useState(post.description);
  const [isInvalidType, setIsInvalidType] = useState(false); //もし、Typeに何も入力されていなかったらエラー
  const [updatePost] = useMutation<{updatePost: Post}>(UPDATE_POST); 

  const resetState = () => {
    setType(post.type);
    setDescription(post.description);
    setIsInvalidType(false);
  }

  const handleEditPost = async () => {
    let canEdit = true;
    
        if (type.length === 0) {
            canEdit = false;
            setIsInvalidType(true);
        } else {
            setIsInvalidType(false);
        }
    
        if (canEdit) {
            const updatePostInput = { id: post.id, type, description };
            try {
              await updatePost({
                variables: { updatePostInput },
                refetchQueries: [{query: GET_POST, variables: { userId }}],
              })
              resetState();
              setOpen(false);
            } catch (err: any) {
                if (err.message === 'Unauthorized') {
                    localStorage.removeItem('token');
                    alert('トークンの有効期限が切れました。サインイン画面に遷移します。')
                    router.push('/signin');
                    return;
                }
    
                alert('タスクの編集に失敗しました');
            }
        }
  }
  const handleClickOpen = () => {
    resetState();
    setOpen(true);
  };

  const handleClose = () => {
    resetState();
    setOpen(false);
  };

  return (
   <div>
      <Tooltip title= '編集'>
        <IconButton onClick={handleClickOpen}>
            <EditIcon color='action' />
        </IconButton>
      </Tooltip>
      <Dialog fullWidth={true} maxWidth='sm' open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
         <FormControl fullWidth={true} margin = 'normal'>
            <InputLabel id='task-status-label'>Status</InputLabel>
            <Select
               labelId='type'
               id = 'type-status'
               label='Type'
               value={type}
               error={isInvalidType}
               onChange={(e) => setType(e.target.value as PostStatus)}
            >
              <MenuItem value={'勉強'}>Study</MenuItem>
              <MenuItem value={'バイト'}>part-timejob</MenuItem>
              <MenuItem value={'就活'}>Work</MenuItem>
              <MenuItem value={'部活'}>Club</MenuItem>
              <MenuItem value={'その他'}>Others</MenuItem>
            </Select>
         </FormControl>
         <TextField
            autoFocus
            margin="normal"
            id="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditPost}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
