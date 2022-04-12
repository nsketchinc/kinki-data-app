export const ModalType = {
  Base: 'Base',
  Edit: 'Edit',
  CreateCategory: 'CreateCategory',
  CreateVideo: 'CreateVideo',
  CreateWebsite: 'CreateWebsite',
  EditCategory: 'EditCategory',
  EditVideo: 'EditVideo',
  EditWebsite: 'EditWebsite',
  Delete: 'Delete',
  CLOSE: '',
} as const

export type ModalType = typeof ModalType[keyof typeof ModalType]
