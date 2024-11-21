import { router } from '@inertiajs/react';

export interface TodoCreateParams {
  title: string;
  is_completed?: boolean;
}

export async function create(params: TodoCreateParams): Promise<void> {
  return new Promise((resolve, reject) => {
    router.post('/todos/create', { ...params }, {
      onError: () => reject(),
      onFinish: () => resolve(),
    });
  });
}
