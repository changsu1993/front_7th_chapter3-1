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
import { userService } from '../services/userService';
import { postService } from '../services/postService';
import type { User } from '../services/userService';
import type { Post } from '../services/postService';

type EntityType = 'user' | 'post';
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');
  const [data, setData] = useState<Entity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
    setFormData({});
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType]);

  const loadData = async () => {
    try {
      let result: Entity[];

      if (entityType === 'user') {
        result = await userService.getAll();
      } else {
        result = await postService.getAll();
      }

      setData(result);
    } catch (error: any) {
      setErrorMessage('데이터를 불러오는데 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleCreate = async () => {
    try {
      if (entityType === 'user') {
        await userService.create({
          username: formData.username,
          email: formData.email,
          role: formData.role || 'user',
          status: formData.status || 'active',
        });
      } else {
        await postService.create({
          title: formData.title,
          content: formData.content || '',
          author: formData.author,
          category: formData.category,
          status: formData.status || 'draft',
        });
      }

      await loadData();
      setIsCreateModalOpen(false);
      setFormData({});
      setAlertMessage(`${entityType === 'user' ? '사용자' : '게시글'}가 생성되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '생성에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);

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

    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      if (entityType === 'user') {
        await userService.update(selectedItem.id, formData);
      } else {
        await postService.update(selectedItem.id, formData);
      }

      await loadData();
      setIsEditModalOpen(false);
      setFormData({});
      setSelectedItem(null);
      setAlertMessage(`${entityType === 'user' ? '사용자' : '게시글'}가 수정되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '수정에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      if (entityType === 'user') {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }

      await loadData();
      setAlertMessage('삭제되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '삭제에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleStatusAction = async (id: number, action: 'publish' | 'archive' | 'restore') => {
    if (entityType !== 'post') return;

    try {
      if (action === 'publish') {
        await postService.publish(id);
      } else if (action === 'archive') {
        await postService.archive(id);
      } else if (action === 'restore') {
        await postService.restore(id);
      }

      await loadData();
      const message =
        action === 'publish' ? '게시' :
        action === 'archive' ? '보관' :
        '복원';
      setAlertMessage(`${message}되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '작업에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const getStats = () => {
    if (entityType === 'user') {
      const users = data as User[];
      return {
        total: users.length,
        stat1: { label: '활성', value: users.filter(u => u.status === 'active').length },
        stat2: { label: '비활성', value: users.filter(u => u.status === 'inactive').length },
        stat3: { label: '정지', value: users.filter(u => u.status === 'suspended').length },
        stat4: { label: '관리자', value: users.filter(u => u.role === 'admin').length },
      };
    } else {
      const posts = data as Post[];
      return {
        total: posts.length,
        stat1: { label: '게시됨', value: posts.filter(p => p.status === 'published').length },
        stat2: { label: '임시저장', value: posts.filter(p => p.status === 'draft').length },
        stat3: { label: '보관됨', value: posts.filter(p => p.status === 'archived').length },
        stat4: { label: '총 조회수', value: posts.reduce((sum, p) => sum + p.views, 0) },
      };
    }
  };

  const getStatusBadgeVariant = (status: string): "success" | "warning" | "destructive" | "secondary" => {
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
  };

  const getRoleBadgeVariant = (role: string): "default" | "info" | "secondary" => {
    switch (role) {
      case 'admin':
        return 'info';
      case 'moderator':
        return 'default';
      default:
        return 'secondary';
    }
  };

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
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {user.role === 'admin' ? '관리자' : user.role === 'moderator' ? '운영자' : '사용자'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(user.status)}>
                  {user.status === 'active' ? '활성' : user.status === 'inactive' ? '비활성' : '정지'}
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
                <Badge variant={getStatusBadgeVariant(post.status)}>
                  {post.status === 'published' ? '게시됨' : post.status === 'draft' ? '임시저장' : '보관됨'}
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
        value={formData.username || ''}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        label="사용자명"
        placeholder="사용자명을 입력하세요"
        required
      />
      <FormInput
        name="email"
        value={formData.email || ''}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        label="이메일"
        placeholder="이메일을 입력하세요"
        type="email"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <FormSelect
          name="role"
          value={formData.role || 'user'}
          onValueChange={(value) => setFormData({ ...formData, role: value })}
          label="역할"
        >
          <SelectItem value="user">사용자</SelectItem>
          <SelectItem value="moderator">운영자</SelectItem>
          <SelectItem value="admin">관리자</SelectItem>
        </FormSelect>
        <FormSelect
          name="status"
          value={formData.status || 'active'}
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
        value={formData.title || ''}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        label="제목"
        placeholder="게시글 제목을 입력하세요"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          name="author"
          value={formData.author || ''}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          label="작성자"
          placeholder="작성자명"
          required
        />
        <FormSelect
          name="category"
          value={formData.category || ''}
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
        value={formData.content || ''}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        label="내용"
        placeholder="게시글 내용을 입력하세요"
        rows={6}
      />
    </div>
  );

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[1200px] mx-auto p-5">
        <div className="mb-5">
          <h1 className="text-2xl font-bold mb-1 text-gray-800">
            관리 시스템
          </h1>
          <p className="text-gray-600 text-sm">
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex gap-2 border-b border-gray-200 pb-3">
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
              <Button onClick={() => setIsCreateModalOpen(true)}>
                새로 만들기
              </Button>
            </div>

            {showSuccessAlert && (
              <Alert variant="success" onClose={() => setShowSuccessAlert(false)}>
                <AlertTitle>성공</AlertTitle>
                <AlertDescription>{alertMessage}</AlertDescription>
              </Alert>
            )}

            {showErrorAlert && (
              <Alert variant="destructive" onClose={() => setShowErrorAlert(false)}>
                <AlertTitle>오류</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-5 gap-3">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="text-xs text-gray-600 mb-1">전체</div>
                  <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="text-xs text-gray-600 mb-1">{stats.stat1.label}</div>
                  <div className="text-2xl font-bold text-green-600">{stats.stat1.value}</div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="text-xs text-gray-600 mb-1">{stats.stat2.label}</div>
                  <div className="text-2xl font-bold text-orange-600">{stats.stat2.value}</div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <div className="text-xs text-gray-600 mb-1">{stats.stat3.label}</div>
                  <div className="text-2xl font-bold text-red-600">{stats.stat3.value}</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4">
                  <div className="text-xs text-gray-600 mb-1">{stats.stat4.label}</div>
                  <div className="text-2xl font-bold text-gray-700">{stats.stat4.value}</div>
                </CardContent>
              </Card>
            </div>

            <div className="border rounded-lg bg-white overflow-hidden">
              {entityType === 'user' ? renderUserTable() : renderPostTable()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
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
                setIsCreateModalOpen(false);
                setFormData({});
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
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
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
                setIsEditModalOpen(false);
                setFormData({});
                setSelectedItem(null);
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
