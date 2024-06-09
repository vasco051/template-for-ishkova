import axios from 'axios';

import {GetTemplatesResponse} from 'types/api/TTemplateResponse.ts';

class TemplateService {
  async fetchTemplates(templateId: number, query?: string) {
    let url = `http://localhost:3001/templates?templateId=${templateId}`

    if (query) url += `&${query}`

    return await axios.get<GetTemplatesResponse>(url)
  }
}

export default new TemplateService();