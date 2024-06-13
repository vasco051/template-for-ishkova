import axios from 'axios';

import {GetClocksResponse, GetTemplateResponse} from 'types/api/TClockResponse.ts';

class ClockService {
  async fetchClocks(query?: string) {
    let url = `http://localhost:3001/clocks`

    if (query) url += `?${query}`

    return await axios.get<GetClocksResponse>(url)
  }

  async fetchClock(id: number) {
    return await axios.get<GetTemplateResponse>(`http://localhost:3001/clocks?id=${id}`)
  }
}

export default new ClockService();