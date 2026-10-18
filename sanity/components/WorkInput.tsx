'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Stack, Text } from '@sanity/ui'
import { TrashIcon } from '@sanity/icons'
import { type ObjectInputProps, useDocumentOperation, useDocumentOperationEvent, useDocumentPairPermissions } from 'sanity'
import { ConfirmDeleteDialog, useDocumentPane } from 'sanity/structure'

export function WorkInput(props: ObjectInputProps) {
  const { documentId, documentType, displayed, connectionState, setIsDeleting, selectedReleaseId, revisionId } = useDocumentPane()
  const { delete: deleteOperation } = useDocumentOperation(documentId, documentType, selectedReleaseId)
  const operationEvent = useDocumentOperationEvent(documentId, documentType)
  const [permissions, permissionsLoading] = useDocumentPairPermissions({ id: documentId, type: documentType, permission: 'delete' })
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const disabled = props.readOnly || deleting || permissionsLoading || !permissions?.granted || !!deleteOperation.disabled || connectionState !== 'connected' || !!selectedReleaseId || !!revisionId

  useEffect(() => {
    if (operationEvent?.op !== 'delete') return
    if (operationEvent.type === 'error') {
      setError(`刪除失敗：${operationEvent.error.message}`)
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
    deleteOperation.execute()
  }

  return (
    <Stack space={4}>
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
          {!permissionsLoading && !permissions?.granted && <Text size={1}>目前登入的帳號沒有刪除權限。</Text>}
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
