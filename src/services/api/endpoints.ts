import { SERVER_URL } from '~/configs';
export const API_CRUD = 'crud'
export const API_CRUD_FIND_WHERE = 'crud/find-where'


export const getUrlForModel = (model: string, id: any = null) => {
    if (id) {
        return `crud/${id}?model=${model}`;
    }
    return `crud?model=${model}`;
}

export const API_FILE_UPLOAD = `${SERVER_URL}/api/v1/attachments/upload-image`
export const ACCEPT_TEACHER = "admin/teacher/request/accept"
export const REGISTER_TEACHER = "admin/teacher/register"
export const LEVEL_UPDATE = "admin/level"
export const UPDATE_PASSWORD = "admin/update/password"
export const RESET_TEACHER_PASSWORD = "admin/teacher/password/reset"