export const AUTH = {
  register: () => '/users/',
  login: () => '/jwt/create/',
  refreshToken: () => '/jwt/refresh/',
}

export const USERS = {
  current: () => '/users/me/',
}

export const HELP_REQUESTS = {
  list: () => '/help-requests/',
  detail: (id: number | string) => `/help-requests/${id}/`,

  create: () => '/help-requests/', // POST
  put: (id: number | string) => `/help-requests/${id}/`, // PUT
  patch: (id: number | string) => `/help-requests/${id}/`, // PATCH
  delete: (id: number | string) => `/help-requests/${id}/`, // DELETE
}

export const HELP_REPLIES = {
  list: () => '/help-replies/',
  detail: (id: number | string) => `/help-replies/${id}/`,

  create: () => '/help-replies/', // POST
  put: (id: number | string) => `/help-replies/${id}/`, // PUT
  patch: (id: number | string) => `/help-replies/${id}/`, // PATCH
  delete: (id: number | string) => `/help-replies/${id}/`, // DELETE
}

export const CHAT = {
  send: () => 'chat/',
};
