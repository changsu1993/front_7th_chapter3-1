import { useCallback } from 'react';

type StatusBadgeVariant = 'success' | 'warning' | 'destructive' | 'secondary';
type RoleBadgeVariant = 'default' | 'info' | 'secondary';

export function useBadgeVariant() {
  const getStatusVariant = useCallback((status: string): StatusBadgeVariant => {
    switch (status) {
      case 'active':
      case 'published':
        return 'success';
      case 'inactive':
      case 'draft':
        return 'warning';
      case 'suspended':
      case 'archived':
        return 'destructive';
      default:
        return 'secondary';
    }
  }, []);

  const getRoleVariant = useCallback((role: string): RoleBadgeVariant => {
    switch (role) {
      case 'admin':
        return 'info';
      case 'moderator':
        return 'default';
      default:
        return 'secondary';
    }
  }, []);

  const getStatusLabel = useCallback((status: string, entityType: 'user' | 'post'): string => {
    if (entityType === 'user') {
      switch (status) {
        case 'active': return '활성';
        case 'inactive': return '비활성';
        case 'suspended': return '정지';
        default: return status;
      }
    } else {
      switch (status) {
        case 'published': return '게시됨';
        case 'draft': return '임시저장';
        case 'archived': return '보관됨';
        default: return status;
      }
    }
  }, []);

  const getRoleLabel = useCallback((role: string): string => {
    switch (role) {
      case 'admin': return '관리자';
      case 'moderator': return '운영자';
      case 'user': return '사용자';
      default: return role;
    }
  }, []);

  return {
    getStatusVariant,
    getRoleVariant,
    getStatusLabel,
    getRoleLabel,
  };
}
