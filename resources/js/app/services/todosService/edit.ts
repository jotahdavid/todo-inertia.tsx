import { router } from '@inertiajs/react';

export interface TodoEditParams {
  id: number;
  title?: string;
  is_completed?: boolean;
}

export async function edit({ id, ...params }: TodoEditParams): Promise<void> {
  return new Promise((resolve, reject) => {
    router.post(`/todos/${id}/update`, { ...params }, {
      onError: () => reject(),
      onFinish: () => resolve(),
    });
  });
}
