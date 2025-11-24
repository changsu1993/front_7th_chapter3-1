import { useCallback } from 'react';

type StatusBadgeVariant = 'success' | 'warning' | 'destructive' | 'secondary';
type RoleBadgeVariant = 'destructive' | 'warning' | 'default' | 'secondary';
type CategoryBadgeVariant = 'default' | 'info' | 'destructive' | 'secondary';

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
        return 'destructive';
      case 'archived':
        return 'secondary'; // before와 일치: 회색
      default:
        return 'secondary';
    }
  }, []);

  const getRoleVariant = useCallback((role: string): RoleBadgeVariant => {
    switch (role) {
      case 'admin':
        return 'destructive'; // before와 일치: 빨간색
      case 'moderator':
        return 'warning'; // before와 일치: 주황색
      case 'user':
        return 'default'; // before와 일치: 파란색
      default:
        return 'secondary';
    }
  }, []);

  const getCategoryVariant = useCallback((category: string): CategoryBadgeVariant => {
    switch (category) {
      case 'development':
        return 'default'; // before와 일치: 파란색 (primary)
      case 'design':
        return 'info'; // before와 일치: 시안색
      case 'accessibility':
        return 'destructive'; // before와 일치: 빨간색
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
    getCategoryVariant,
    getStatusLabel,
    getRoleLabel,
  };
}
