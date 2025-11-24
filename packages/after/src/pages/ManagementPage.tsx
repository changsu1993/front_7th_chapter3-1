import React, { useState, useEffect } from 'react';
import {
  Button,
  Badge,
  Card, CardHeader, CardContent,
  Alert, AlertTitle, AlertDescription,
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  FormInput,
  FormSelect,
  FormTextarea,
  SelectItem,
} from "@/components/ui";
import {
  useAlert,
  useModalState,
  useFormState,
  useEntityManagement,
  useEntityStats,
  useBadgeVariant,
} from "@/hooks";
import type { User } from '../services/userService';
import type { Post } from '../services/postService';

type EntityType = 'user' | 'post';
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');

  // Custom Hooks
  const { alert, showSuccess, showError, hideAlert } = useAlert();
  const {
    isCreateOpen,
    isEditOpen,
    selectedItem,
    openCreate,
    openEdit,
    closeCreate,
    closeEdit,
    setIsCreateOpen,
    setIsEditOpen,
  } = useModalState<Entity>();
  const { formData, setFormData, reset: resetForm } = useFormState<Record<string, unknown>>();
  const { data, create, update, remove, publish, archive, restore } = useEntityManagement(entityType);
  const stats = useEntityStats(data, entityType);
  const { getStatusVariant, getRoleVariant, getStatusLabel, getRoleLabel } = useBadgeVariant();

  // Reset state when entity type changes
  useEffect(() => {
    resetForm({});
    closeCreate();
    closeEdit();
  }, [entityType, resetForm, closeCreate, closeEdit]);

  // Handlers
  const handleCreate = async () => {
    try {
      await create(formData);
      closeCreate();
      resetForm({});
      showSuccess(`${entityType === 'user' ? '사용자' : '게시글'}가 생성되었습니다`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : '생성에 실패했습니다';
      showError(message);
    }
  };

  const handleEdit = (item: Entity) => {
    if (entityType === 'user') {
      const user = item as User;
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      const post = item as Post;
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category,
        status: post.status,
      });
    }
    openEdit(item);
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      await update(selectedItem.id, formData);
      closeEdit();
      resetForm({});
      showSuccess(`${entityType === 'user' ? '사용자' : '게시글'}가 수정되었습니다`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : '수정에 실패했습니다';
      showError(message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await remove(id);
      showSuccess('삭제되었습니다');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : '삭제에 실패했습니다';
      showError(message);
    }
  };

  const handleStatusAction = async (id: number, action: 'publish' | 'archive' | 'restore') => {
    try {
      if (action === 'publish') {
        await publish(id);
      } else if (action === 'archive') {
        await archive(id);
      } else {
        await restore(id);
      }

      const message = action === 'publish' ? '게시' : action === 'archive' ? '보관' : '복원';
      showSuccess(`${message}되었습니다`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : '작업에 실패했습니다';
      showError(message);
    }
  };

  // Render functions
  const renderUserTable = () => {
    const users = data as User[];
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">ID</TableHead>
            <TableHead className="w-[150px]">사용자명</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead className="w-[120px]">역할</TableHead>
            <TableHead className="w-[120px]">상태</TableHead>
            <TableHead className="w-[120px]">생성일</TableHead>
            <TableHead className="w-[140px]">마지막 로그인</TableHead>
            <TableHead className="w-[200px]">관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={getRoleVariant(user.role)}>
                  {getRoleLabel(user.role)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(user.status)}>
                  {getStatusLabel(user.status, 'user')}
                </Badge>
              </TableCell>
              <TableCell>{user.createdAt}</TableCell>
              <TableCell>{user.lastLogin || '-'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                    수정
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
                    삭제
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderPostTable = () => {
    const posts = data as Post[];
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">ID</TableHead>
            <TableHead>제목</TableHead>
            <TableHead className="w-[120px]">작성자</TableHead>
            <TableHead className="w-[140px]">카테고리</TableHead>
            <TableHead className="w-[120px]">상태</TableHead>
            <TableHead className="w-[100px]">조회수</TableHead>
            <TableHead className="w-[120px]">작성일</TableHead>
            <TableHead className="w-[250px]">관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>
                <Badge variant="outline">{post.category}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(post.status)}>
                  {getStatusLabel(post.status, 'post')}
                </Badge>
              </TableCell>
              <TableCell>{post.views}</TableCell>
              <TableCell>{post.createdAt}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {post.status === 'draft' && (
                    <Button variant="success" size="sm" onClick={() => handleStatusAction(post.id, 'publish')}>
                      게시
                    </Button>
                  )}
                  {post.status === 'published' && (
                    <Button variant="warning" size="sm" onClick={() => handleStatusAction(post.id, 'archive')}>
                      보관
                    </Button>
                  )}
                  {post.status === 'archived' && (
                    <Button variant="secondary" size="sm" onClick={() => handleStatusAction(post.id, 'restore')}>
                      복원
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                    수정
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                    삭제
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderUserForm = () => (
    <div className="space-y-4">
      <FormInput
        name="username"
        value={(formData.username as string) || ''}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        label="사용자명"
        placeholder="사용자명을 입력하세요"
        required
      />
      <FormInput
        name="email"
        value={(formData.email as string) || ''}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        label="이메일"
        placeholder="이메일을 입력하세요"
        type="email"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <FormSelect
          name="role"
          value={(formData.role as string) || 'user'}
          onValueChange={(value) => setFormData({ ...formData, role: value })}
          label="역할"
        >
          <SelectItem value="user">사용자</SelectItem>
          <SelectItem value="moderator">운영자</SelectItem>
          <SelectItem value="admin">관리자</SelectItem>
        </FormSelect>
        <FormSelect
          name="status"
          value={(formData.status as string) || 'active'}
          onValueChange={(value) => setFormData({ ...formData, status: value })}
          label="상태"
        >
          <SelectItem value="active">활성</SelectItem>
          <SelectItem value="inactive">비활성</SelectItem>
          <SelectItem value="suspended">정지</SelectItem>
        </FormSelect>
      </div>
    </div>
  );

  const renderPostForm = () => (
    <div className="space-y-4">
      <FormInput
        name="title"
        value={(formData.title as string) || ''}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        label="제목"
        placeholder="게시글 제목을 입력하세요"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          name="author"
          value={(formData.author as string) || ''}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          label="작성자"
          placeholder="작성자명"
          required
        />
        <FormSelect
          name="category"
          value={(formData.category as string) || ''}
          onValueChange={(value) => setFormData({ ...formData, category: value })}
          label="카테고리"
          placeholder="카테고리 선택"
        >
          <SelectItem value="development">Development</SelectItem>
          <SelectItem value="design">Design</SelectItem>
          <SelectItem value="accessibility">Accessibility</SelectItem>
        </FormSelect>
      </div>
      <FormTextarea
        name="content"
        value={(formData.content as string) || ''}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        label="내용"
        placeholder="게시글 내용을 입력하세요"
        rows={6}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="max-w-[1200px] mx-auto p-5">
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-1 text-foreground">
            관리 시스템
          </h1>
          <p className="text-muted-foreground text-sm">
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex gap-2 border-b border-border pb-3">
              <Button
                variant={entityType === 'post' ? 'default' : 'outline'}
                onClick={() => setEntityType('post')}
              >
                게시글
              </Button>
              <Button
                variant={entityType === 'user' ? 'default' : 'outline'}
                onClick={() => setEntityType('user')}
              >
                사용자
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={openCreate}>
                새로 만들기
              </Button>
            </div>

            {alert.show && alert.type === 'success' && (
              <Alert variant="success" onClose={hideAlert}>
                <AlertTitle>성공</AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            )}

            {alert.show && alert.type === 'error' && (
              <Alert variant="destructive" onClose={hideAlert}>
                <AlertTitle>오류</AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-5 gap-3">
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">전체</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">{stats.stat1.label}</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.stat1.value}</div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">{stats.stat2.label}</div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.stat2.value}</div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">{stats.stat3.label}</div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.stat3.value}</div>
                </CardContent>
              </Card>

              <Card className="bg-muted/50 border-border">
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">{stats.stat4.label}</div>
                  <div className="text-2xl font-bold text-foreground">{stats.stat4.value}</div>
                </CardContent>
              </Card>
            </div>

            <div className="border border-border rounded-lg bg-background overflow-hidden">
              {entityType === 'user' ? renderUserTable() : renderPostTable()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              새 {entityType === 'user' ? '사용자' : '게시글'} 만들기
            </DialogTitle>
          </DialogHeader>
          {entityType === 'user' ? renderUserForm() : renderPostForm()}
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => {
                closeCreate();
                resetForm({});
              }}
            >
              취소
            </Button>
            <Button onClick={handleCreate}>
              생성
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {entityType === 'user' ? '사용자' : '게시글'} 수정
            </DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <Alert variant="info" className="mb-4">
              <AlertDescription>
                ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
                {entityType === 'post' && ` | 조회수: ${(selectedItem as Post).views}`}
              </AlertDescription>
            </Alert>
          )}
          {entityType === 'user' ? renderUserForm() : renderPostForm()}
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => {
                closeEdit();
                resetForm({});
              }}
            >
              취소
            </Button>
            <Button onClick={handleUpdate}>
              수정 완료
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
