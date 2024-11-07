import api from './api'

const perfumeService = {}

perfumeService.getAll = () => api.get('/')

export default perfumeService
