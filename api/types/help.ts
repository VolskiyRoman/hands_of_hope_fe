export type HelpReply = {
  id: number
  request: number
  responder: number
  responder_email: string
  message: string
  created: string
}

export type HelpRequest = {
  id: number
  user: number
  user_email: string
  type: string
  description: string
  location: string
  contact_phone: string
  status: string
  created: string
  updated: string
  replies: HelpReply[]
}

export type CreateHelpRequest = {
  type: string
  description: string
  location: string
  contact_phone: string
}

export type UpdateHelpRequest = Partial<CreateHelpRequest>

export type CreateHelpReply = {
  request: number
  message: string
}

export type UpdateHelpReply = Partial<CreateHelpReply>
