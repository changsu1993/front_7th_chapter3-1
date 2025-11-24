import { useState, useCallback } from 'react';

export function useModalState<T = unknown>() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const openCreate = useCallback(() => {
    setIsCreateOpen(true);
  }, []);

  const openEdit = useCallback((item: T) => {
    setSelectedItem(item);
    setIsEditOpen(true);
  }, []);

  const closeCreate = useCallback(() => {
    setIsCreateOpen(false);
  }, []);

  const closeEdit = useCallback(() => {
    setIsEditOpen(false);
    setSelectedItem(null);
  }, []);

  const closeAll = useCallback(() => {
    setIsCreateOpen(false);
    setIsEditOpen(false);
    setSelectedItem(null);
  }, []);

  return {
    isCreateOpen,
    isEditOpen,
    selectedItem,
    openCreate,
    openEdit,
    closeCreate,
    closeEdit,
    closeAll,
    setIsCreateOpen,
    setIsEditOpen,
  };
}
