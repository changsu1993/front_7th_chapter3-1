import { useState, useEffect, useCallback } from 'react';
import { userService, type User } from '../services/userService';
import { postService, type Post } from '../services/postService';

type EntityType = 'user' | 'post';
type Entity = User | Post;

interface UseEntityManagementReturn {
  data: Entity[];
  loading: boolean;
  error: string | null;
  loadData: () => Promise<void>;
  create: (formData: Record<string, unknown>) => Promise<boolean>;
  update: (id: number, formData: Record<string, unknown>) => Promise<boolean>;
  remove: (id: number) => Promise<boolean>;
  publish: (id: number) => Promise<boolean>;
  archive: (id: number) => Promise<boolean>;
  restore: (id: number) => Promise<boolean>;
}

export function useEntityManagement(entityType: EntityType): UseEntityManagementReturn {
  const [data, setData] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = entityType === 'user'
        ? await userService.getAll()
        : await postService.getAll();
      setData(result);
    } catch (err) {
      setError('데이터를 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  }, [entityType]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const create = useCallback(async (formData: Record<string, unknown>): Promise<boolean> => {
    try {
      if (entityType === 'user') {
        await userService.create({
          username: formData.username as string,
          email: formData.email as string,
          role: (formData.role as User['role']) || 'user',
          status: (formData.status as User['status']) || 'active',
        });
      } else {
        await postService.create({
          title: formData.title as string,
          content: (formData.content as string) || '',
          author: formData.author as string,
          category: formData.category as string,
          status: (formData.status as Post['status']) || 'draft',
        });
      }
      await loadData();
      return true;
    } catch (err) {
      throw err;
    }
  }, [entityType, loadData]);

  const update = useCallback(async (id: number, formData: Record<string, unknown>): Promise<boolean> => {
    try {
      if (entityType === 'user') {
        await userService.update(id, formData as Partial<User>);
      } else {
        await postService.update(id, formData as Partial<Post>);
      }
      await loadData();
      return true;
    } catch (err) {
      throw err;
    }
  }, [entityType, loadData]);

  const remove = useCallback(async (id: number): Promise<boolean> => {
    try {
      if (entityType === 'user') {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }
      await loadData();
      return true;
    } catch (err) {
      throw err;
    }
  }, [entityType, loadData]);

  const publish = useCallback(async (id: number): Promise<boolean> => {
    if (entityType !== 'post') return false;
    try {
      await postService.publish(id);
      await loadData();
      return true;
    } catch (err) {
      throw err;
    }
  }, [entityType, loadData]);

  const archive = useCallback(async (id: number): Promise<boolean> => {
    if (entityType !== 'post') return false;
    try {
      await postService.archive(id);
      await loadData();
      return true;
    } catch (err) {
      throw err;
    }
  }, [entityType, loadData]);

  const restore = useCallback(async (id: number): Promise<boolean> => {
    if (entityType !== 'post') return false;
    try {
      await postService.restore(id);
      await loadData();
      return true;
    } catch (err) {
      throw err;
    }
  }, [entityType, loadData]);

  return {
    data,
    loading,
    error,
    loadData,
    create,
    update,
    remove,
    publish,
    archive,
    restore,
  };
}
