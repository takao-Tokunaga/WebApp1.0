'use client'

import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POST } from '../queries/postQueries';
import { CREATE_POST, UPDATE_POST } from '../mutations/postMutations';
import { Post } from '@/types/post';


export default function PostRecord({ userId }: { userId: number }) {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const { data } = useQuery<{ getPost: Post }>(GET_POST, {
    variables: { userId },
  });
  

  useEffect(() => {
    if (data?.getPost) {
      setType(data.getPost.type ?? '');
      setDescription(data.getPost.description ?? '');
    }
  }, [data]);

  const [createPost] = useMutation(CREATE_POST);
  const [updatePost] = useMutation(UPDATE_POST);

  const handleSave = async () => {
  const post = data?.getPost;

  const createPostInput = { type, description, userId };

  try {
    if (post?.id) {
      // 既存プロフィールがある → 更新処理
      const updatePostInput = {
        id: post.id,
        type,
        description
      };

      await updatePost({
        variables: { updatePostInput },
        refetchQueries: [{ query: GET_POST, variables: { userId } }],
      });
    } else {
      // プロフィールがまだない → 作成処理
      await createPost({
        variables: { createPostInput },
        refetchQueries: [{ query: GET_POST, variables: { userId } }],
      });
    }

  } catch (error: any) {
    alert('保存に失敗しました');
    console.error(error);
  }
};


  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white p-10 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">投稿</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="項目"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-2"
          placeholder="何した？"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
        onClick={handleSave}
        className="mt-2 text-blue-500 underline"
      >
          投稿
        </button>
      </div>
    </div>
  );
}
