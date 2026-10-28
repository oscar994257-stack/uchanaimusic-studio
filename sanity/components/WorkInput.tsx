'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Stack, Text } from '@sanity/ui'
import { TrashIcon } from '@sanity/icons'
import { type ObjectInputProps, useDocumentOperation, useDocumentOperationEvent, useDocumentPairPermissions } from 'sanity'
import { ConfirmDeleteDialog, useDocumentPane } from 'sanity/structure'

export function WorkInput(props: ObjectInputProps) {
  const { documentId, documentType, displayed, connectionState, setIsDeleting, selectedReleaseId } = useDocumentPane()
  const { delete: deleteOperation } = useDocumentOperation(documentId, documentType, selectedReleaseId)
  const operationEvent = useDocumentOperationEvent(documentId, documentType)
  const [permissions, permissionsLoading] = useDocumentPairPermissions({ id: documentId, type: documentType, version: selectedReleaseId, permission: 'delete' })
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  // A published document's form can be read-only while deletion is permitted.
  // Match Studio's Delete action: authorize the operation independently of editing.
  const blockedReason = permissionsLoading ? '正在確認刪除權限…'
    : !permissions?.granted ? '目前登入的帳號沒有刪除權限，請使用此專案的管理者帳號。'
    : connectionState !== 'connected' ? '後台尚未連線，請稍候或重新整理。'
    : deleteOperation.disabled === 'NOTHING_TO_DELETE' ? '這筆作品尚未儲存，或已經刪除。'
    : deleteOperation.disabled ? '目前無法執行刪除，請重新整理後再試。'
    : ''
  const disabled = deleting || !!blockedReason

  useEffect(() => {
    setConfirmOpen(false)
    setDeleting(false)
    setError('')
  }, [documentId, selectedReleaseId])

  useEffect(() => {
    if (operationEvent?.op !== 'delete') return
    if (operationEvent.type === 'error') {
      setError(`刪除失敗：${operationEvent.error.message}`)
      setDeleting(false)
      setIsDeleting(false)
    } else if (operationEvent.type === 'success') {
      setDeleting(false)
      setIsDeleting(false)
    }
  }, [operationEvent, setIsDeleting])

  const confirmDelete = () => {
    if (disabled) return
    setConfirmOpen(false)
    setError('')
    setDeleting(true)
    setIsDeleting(true)
    try {
      deleteOperation.execute()
    } catch (cause) {
      setError(`刪除失敗：${cause instanceof Error ? cause.message : '請重新整理後再試。'}`)
      setDeleting(false)
      setIsDeleting(false)
    }
  }

  return (
    <Stack space={4}>
      <Card padding={3} radius={2} border tone="primary">
        <Text size={1}>修改後請按 Publish；官網會在約 15 秒內檢查更新，切回官網時也會立即同步。首頁依新增時間顯示最新五筆作品。Unpublish 或刪除後，該作品會從官網移除。</Text>
      </Card>
      <Card padding={3} radius={2} border tone="critical">
        <Stack space={3}>
          <Button
            text={deleting ? '正在刪除…' : '刪除作品'}
            icon={TrashIcon}
            tone="critical"
            mode="ghost"
            disabled={disabled}
            onClick={() => setConfirmOpen(true)}
          />
          <Text size={1}>刪除前會再次確認；刪除後這項作品也會從官網移除。</Text>
          {blockedReason && <Text size={1} role="status">{blockedReason}</Text>}
          {error && <Text size={1} role="alert">{error}</Text>}
        </Stack>
      </Card>
      {props.renderDefault(props)}
      {confirmOpen && (
        <ConfirmDeleteDialog
          id={displayed?._id || documentId}
          type={documentType}
          action="delete"
          onCancel={() => setConfirmOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </Stack>
  )
}
